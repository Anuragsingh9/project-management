function sendHttpResponse(response, statusCode, status, data = [], message) {
    return response.status(statusCode).json({ status: status, data: data, message: message });
}

function getTableName(tableName) {
    return tableName;
};

module.exports = { getTableName, sendHttpResponse };