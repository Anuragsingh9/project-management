db.createCollection('user_tasks', {
    validator: {
        $jsonSchema: {
            required: ['user_id', 'task_id'],
            properties: {
                user_id: {
                    bsonType: 'string',
                    description: 'user_id is required'
                },
                task_id: {
                    bsonType: 'string',
                    description: 'task_id is required'
                }

            }
        }
    }
});