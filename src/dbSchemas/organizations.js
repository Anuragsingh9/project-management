db.createCollection('organizations', {
    validator: {
        $jsonSchema: {
            required: ['org_name', 'email'],
            properties: {
                org_name: {
                    bsonType: 'string',
                    description: 'org_name must be a string'
                },
                email: {
                    bsonType: 'string',
                    description: 'email should be a string'
                }
            }
        }
    }
});