import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendOtpEmail } from "../utils/email.js";
import { Otp } from "../models/otp.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const generateAccesAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, password, email, mobileNo } = req.body;
  if (
    [username, fullName, email, password].some(
      (field) => field?.trim() === "",
    ) ||
    !mobileNo
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username,
    fullName,
    email,
    mobileNo,
    password,
    role: "user",
    isVerified: false,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while reistering user");
  }

  const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString();
  };
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  console.log(`Otp for ${email}: ${otp}`);
  await Otp.create({
    email,
    otp: hashedOtp,
    action: "accountVerification",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });

  await sendOtpEmail(email, otp, "accountVerification");

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        email,
      },
      "User registered. Verify OTP sent to email.",
    ),
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or Email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  if (!user.isVerified) {
    const otp = crypto.randomInt(100000, 1000000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({
      email: user.email,
      action: "accountVerification",
    });

    await Otp.create({
      email: user.email,
      otp: hashedOtp,
      action: "accountVerification",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(user.email, otp, "accountVerification");

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          email: user.email,
          verified: false,
        },
        "Unverified user! OTP sent."
      )
    );
  }

  const { accessToken, refreshToken } =
    await generateAccesAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
        verified: true,
      },
      "User logged in successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true },
  );

  return res.status(200).json(new ApiResponse(200, {}, "User logged out."));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  const otpRecord = await Otp.findOne({
    email,
    action: "accountVerification",
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new ApiError(400, "No OTP found for this email");
  }

  if (new Date() > otpRecord.expiresAt) {
    throw new ApiError(400, "OTP has expired, please regiter again.");
  }

  const isOtpValid = await bcrypt.compare(otp.toString(), otpRecord.otp);
  if (!isOtpValid) {
    throw new ApiError(400, "Invalid OTP");
  }

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: { isVerified: true },
    },
    {
      returnDocument: "after",
    },
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await Otp.deleteMany({
    email,
    action: "accountVerification",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User verified successully!"));
});

export { registerUser, loginUser, logoutUser, verifyOtp };
