const { ObjectId } = require("mongodb");

async function isAdminUser(req, res, next) {
    try {
        const userId = req.authUserId;
        const isAdminUser = await req.db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!(isAdminUser && isAdminUser.role_id == 1)) {
            res.status(403).json({ message: 'Permission denied' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = isAdminUser;