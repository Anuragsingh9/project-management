const { ObjectId } = require('mongodb');
async function register(req, res) {
    try {
        const userId = req.authUserId;
        const user = await req.db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (user.role_id != 1) {
            return res.status(403).status({ status: 'error', message: 'Permission denied' });
        }
        const organization = await req.db.collection('organizations').insertOne(req.body);
        res.status(201).json({ status: 'ok', data: organization, message: 'Organization created successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', erorr: error.message });
    }
}

async function getOrganization(req, res) {
    try {
        const { orgId } = req.params;
        const organization = await req.db.collection('organizations').findOne({ _id: new ObjectId(orgId) });
        res.status(200).json({ status: 'ok', data: organization, message: 'Organization fetched successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', erorr: error.message });
    }
}

module.exports = { register, getOrganization }