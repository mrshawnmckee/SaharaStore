// error handling solution, in liu of try/catches

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next).catch(next));
}

export default asyncHandler;