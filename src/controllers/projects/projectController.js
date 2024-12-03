const { ObjectId } = require("mongodb");

async function createProject(req, res) {
    try {
        const { orgId } = req.params;
        const project = await req.db.collection('projects').insertOne({ org_id: orgId, name: req.body.name, created_at: new Date(), updated_at: new Date() });
        if (project) {
            res.status(201).json({ status: 'ok', data: project, message: 'Project created successfully' });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
}

async function getProject(req, res) {
    try {
        const { projectId } = req.params;
        const project = await req.db.collection('projects').findOne({ _id: new ObjectId(projectId) });
        res.status(200).json({ status: 'ok', data: project, message: 'Project created successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
}

async function getProjectList(req, res) {
    try {
        const { orgId } = req.params;
        const organizationProjects = await req.db.collection('projects').find({ org_id: orgId }).toArray();
        res.status(200).json({ status: 'ok', data: organizationProjects, message: 'Organization project list fetched successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
}

async function updateProject(req, res) {
    try {
        const { projectId } = req.params;
        const project = await req.db.collection('projects').updateOne({ _id: new ObjectId(projectId) }, { $set: { name: req.body.name, update_at: new Date() } });
        res.status(200).json({ status: 'ok', data: project, message: 'Organization project updated successfully' });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
}

module.exports = { createProject, getProject, getProjectList, updateProject };