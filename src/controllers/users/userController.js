const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getTableName, sendHttpResponse } = require('../../helpers/helpers');

async function registerUser(req, res) {
    try {
        const collection = req.db.collection(getTableName('users'));
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await collection.insertOne(req.body);
        sendHttpResponse(res, 201, 'ok', user, 'User inserted successfully');
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
        sendHttpResponse(res, 500, 'error', [], error.message);
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
            sendHttpResponse(res, 200, 'ok', token, 'Login successfull');
        }
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function getUser(req, res) {
    try {
        const userId = req.authUserId;
        const user = await req.db.collection('users').findOne({ _id: ObjectId.createFromHexString(userId) });
        console.log('getUser ', userId, user);
        sendHttpResponse(res, 200, 'ok', user, 'User data fetched successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.authUserId;
        const userCollection = await req.db.collection('users').updateOne({ _id: ObjectId.createFromHexString(userId) }, { $set: { first_name: 'Anurag updated' } });
        sendHttpResponse(res, 201, 'ok', userCollection, 'User data updated successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

// async function deleteUser(req, res) {
//     try {

//     } catch (error) {
//         sendHttpResponse(res, 500, 'error', [], error.message);
//     }
// }


module.exports = { registerUser, login, getUser, updateUser };