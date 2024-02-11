const makeSuccessResponse = (data) => {
    return { content: data, error: [] }
}

const makeErrorResponse = (errors) => {
    return { content: [], errors }
}

module.exports = {
    makeSuccessResponse,
    makeErrorResponse
}