const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getTableName } = require('../../helpers/helpers');
async function registerUser(req, res) {
    try {
        const collection = req.db.collection(getTableName('users'));
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await collection.insertOne(req.body);
        res.status(201).json({ staus: 'ok', data: user, 'message': 'User inserted successfully' });
    } catch (error) {
        if (error.code === 121) {
            const validationDetails = error.errInfo?.details;

            if (validationDetails && validationDetails.schemaRulesNotSatisfied) {
                const failedValidationRules = validationDetails.schemaRulesNotSatisfied;
                failedValidationRules.forEach((rule) => {
                    console.log(`Field validation failed:`, rule);
                });
            }
        }
        res.status(400).json({ status: 'error', message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const collection = req.db.collection('users');
        const user = await collection.findOne({ email });
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (isPasswordMatching) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.status(200).json({ status: 'ok', token: token, message: 'Login successfull' });
        }
    } catch (error) {
        console.log('login error', error);
        res.status(400).json({ status: 'error', message: error.message });
    }
}

async function getUser(req, res) {
    try {
        const userId = req.authUserId;
        const collection = await req.db.collection('users').findOne({ _id: new ObjectId(userId) });
        console.log('getUser ', userId, collection);
        res.status(200).json({ status: 'ok', data: collection, message: 'User data fetched successfully' });
    } catch (error) {
        console.log('error get User', error.message);
        res.status(400).json({ status: 'error', error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.authUserId;
        const userCollection = await req.db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { first_name: 'Anurag updated' } });
        res.status(201).json({ status: 'ok', data: userCollection, message: 'User data updated successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
}

// async function deleteUser(req, res) {
//     try {

//     } catch (error) {
//         res.status(400).json({ status: 'error', error: error.message });
//     }
// }


module.exports = { registerUser, login, getUser, updateUser };