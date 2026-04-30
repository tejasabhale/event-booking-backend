const asyncHandler = (fs) => {
    return (req, res, next) => {
        Promise.resolve(fs(req, res, next))
        .catch(next)
    }
}

export { asyncHandler }