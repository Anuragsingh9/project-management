const { ObjectId } = require('mongodb');
async function createTask(req, res) {
    try {
        const { projectId } = req.params;
        console.log('task', projectId);

        const task = await req.db.collection('tasks').insertOne({
            title: req.body.title,
            description: req.body.description,
            project_id: new ObjectId(projectId),
            status: req.body.status,
            created_at: new Date(),
            updated_at: new Date()
        });
        if (req.body.user_id) { // Attaching user to task
            const user_tasks = await req.db.collection('user_tasks').insertOne({
                user_id: new ObjectId(req.body.user_id),
                task_id: task.insertedId,
                project_id: new ObjectId(projectId),
            });
        };
        res.status(201).json({ status: 'ok', data: task, message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

/**
 * @deprecated
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getUserTaskById(req, res) {

    try {
        const { userId } = req.params; // Get user_id from request params
        const { project_id } = req.query;
        console.log('project_id', project_id, userId);
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'User ID is required' });
        }
        // Check if userId is a valid ObjectId
        const userIdQuery = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

        const matchCondition = {
            "user_task_details.user_id": userIdQuery // Match user_id
        };

        // Add projectId condition if it's provided and valid
        if (project_id && project_id.trim() !== "") {
            matchCondition["user_task_details.project_id"] = new ObjectId(project_id);
        }

        console.log(userIdQuery);
        // Fetch tasks based on user ID
        const tasks = await req.db.collection('tasks')
            .aggregate([
                {
                    $lookup: {
                        from: 'user_tasks', // The collection to join
                        localField: '_id',  // Field in task
                        foreignField: 'task_id', // Field in user_tasks
                        as: 'user_task_details' // Output field
                    }
                },
                { $unwind: "$user_task_details" }, // Flatten the user_task_details array
                { $match: matchCondition }, // Match the user ID
            ])
            .toArray();

        res.status(200).json({
            status: 'ok',
            data: tasks,
            records_count: tasks.length,
            message: 'Tasks fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }

    // try {
    //     const data = req.db.collection('tasks').aggregate([{ $lookup: { from: 'user_tasks', localField: "_id", foreignField: "user_id", as: "users_tasks" } }]).toArray();
    //     res.status(200).json({ status: 'ok', data: data, message: 'Data fecthed successfuly' });
    // } catch (error) {
    // res.status(500).json({ status: 'error', message: error.message });
    // }
}

// async function getProjectTasks(req, res) {

//     try {
//         const { projectId } = req.params; // Get user_id from request params
//         const { user_id } = req.query;
//         if (!projectId) {
//             return res.status(400).json({ status: 'error', message: 'Project ID is required' });
//         }
//         // Check if userId is a valid ObjectId
//         const projectIdQuery = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;

//         const matchCondition = {
//             "user_task_details.project_id": projectIdQuery
//         };

//         // Add projectId condition if it's provided and valid
//         if (user_id && user_id.trim() !== "") {
//             matchCondition["user_task_details.user_id"] = new ObjectId(user_id);
//         }

//         console.log(projectIdQuery);
//         // Fetch tasks based on user ID
//         const tasks = await req.db.collection('tasks')
//             .aggregate([
//                 {
//                     $lookup: {
//                         from: 'user_tasks', // The collection to join
//                         localField: '_id',  // Field in task
//                         foreignField: 'task_id', // Field in user_tasks
//                         as: 'user_task_details' // Output field
//                     }
//                 },
//                 { $unwind: "$user_task_details" }, // Flatten the user_task_details array
//                 { $match: matchCondition }, // Match the user ID
//             ])
//             .toArray();

//         res.status(200).json({
//             status: 'ok',
//             data: tasks,
//             records_count: tasks.length,
//             message: 'Tasks fetched successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }

//     // try {
//     //     const data = req.db.collection('tasks').aggregate([{ $lookup: { from: 'user_tasks', localField: "_id", foreignField: "user_id", as: "users_tasks" } }]).toArray();
//     //     res.status(200).json({ status: 'ok', data: data, message: 'Data fecthed successfuly' });
//     // } catch (error) {
//     // res.status(500).json({ status: 'error', message: error.message });
//     // }
// }

async function getProjectTasks(req, res) {

    try {
        const { projectId } = req.params; 
        const { user_id } = req.query;   

        if (!projectId) {
            return res.status(400).json({ status: 'error', message: 'Project ID is required' });
        }
        
        const projectIdQuery = ObjectId.isValid(projectId) ? new ObjectId(projectId) : projectId;

        const matchCondition = {
            "user_task_details.project_id": projectIdQuery
        };

        if (user_id) {
            const userIdsArray = Array.isArray(user_id) ? user_id : [user_id]; 
            const userIdQuery = userIdsArray.map(id => ObjectId.isValid(id) ? new ObjectId(id) : id); 
            matchCondition["user_task_details.user_id"] = { $in: userIdQuery }; 
        }

        const tasks = await req.db.collection('tasks')
            .aggregate([
                {
                    $lookup: {
                        from: 'user_tasks', 
                        localField: '_id',  
                        foreignField: 'task_id', 
                        as: 'user_task_details' 
                    }
                },
                { $unwind: "$user_task_details" }, 
                { $match: matchCondition }, 
            ])
            .toArray();

        res.status(200).json({
            status: 'ok',
            data: tasks,
            records_count: tasks.length,
            message: 'Tasks fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}


module.exports = { createTask, getUserTaskById, getProjectTasks };