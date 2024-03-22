const makeSuccessResponse = (data) => {
    return { content: data }
}

const makeErrorResponse = (error) => {
    return { message: error[0] }
}

module.exports = {
    makeSuccessResponse,
    makeErrorResponse
}