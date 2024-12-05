const { ObjectId } = require("mongodb");
const { sendHttpResponse } = require("../../helpers/helpers");

async function createProject(req, res) {
    try {
        const { orgId } = req.params;
        const project = await req.db.collection('projects').insertOne({ org_id: orgId, name: req.body.name, created_at: new Date(), updated_at: new Date() });
        if (project) {
            sendHttpResponse(res, 201, 'ok', project, 'Project created successfully');
        }
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function getProject(req, res) {
    try {
        const { projectId } = req.params;
        const project = await req.db.collection('projects').findOne({ _id: ObjectId.createFromHexString(projectId) });
        sendHttpResponse(res, 200, 'ok', project, 'Project created successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function getProjectList(req, res) {
    try {
        const { orgId } = req.params;
        const organizationProjects = await req.db.collection('projects').find({ org_id: orgId }).toArray();
        sendHttpResponse(res, 200, 'ok', organizationProjects, 'Organization project list fetched successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

async function updateProject(req, res) {
    try {
        const { projectId } = req.params;
        const project = await req.db.collection('projects').updateOne({ _id: ObjectId.createFromHexString(projectId) }, { $set: { name: req.body.name, update_at: new Date() } });
        sendHttpResponse(res, 200, 'ok', project, 'Organization project updated successfully');
    } catch (error) {
        sendHttpResponse(res, 500, 'error', [], error.message);
    }
}

module.exports = { createProject, getProject, getProjectList, updateProject };