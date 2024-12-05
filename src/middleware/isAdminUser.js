const { ObjectId } = require("mongodb");
const { sendHttpResponse } = require("../helpers/helpers");

async function isAdminUser(req, res, next) {
    try {
        const userId = req.authUserId;
        const isAdminUser = await req.db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!(isAdminUser && isAdminUser.role_id == 1)) {
            sendHttpResponse(res, 403, 'error', [], 'Permission denied');
        }
        next();
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], 'Internal Server Error');
    }
}

module.exports = isAdminUser;