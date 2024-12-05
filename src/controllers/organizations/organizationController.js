const { ObjectId } = require('mongodb');
const { sendHttpResponse } = require('../../helpers/helpers');
async function register(req, res) {
    try {
        const userId = req.authUserId;
        const user = await req.db.collection('users').findOne({ _id: ObjectId.createFromHexString(userId) });
        if (user.role_id != 1) {
            sendHttpResponse(res, 403, 'error', [], 'Permission denied');
        }
        const organization = await req.db.collection('organizations').insertOne(req.body);
        sendHttpResponse(res, 201, 'ok', organization, 'Organization created successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function getOrganization(req, res) {
    try {
        const { orgId } = req.params;
        const organization = await req.db.collection('organizations').findOne({ _id: ObjectId.createFromHexString(orgId) });
        sendHttpResponse(res, 200, 'ok', organization, 'Organization fetched successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

module.exports = { register, getOrganization }