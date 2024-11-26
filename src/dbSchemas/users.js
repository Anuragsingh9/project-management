db.createCollection('users', {
    validator: {
        $jsonSchema: {
            required: ['first_name', 'last_name', 'email', 'password', 'country_code', 'phone_number'],
            properties: {
                first_name: {
                    bsonType: 'string',
                    description: 'first_name must be a string'
                },
                last_name: {
                    bsonType: 'string',
                    description: 'last_name must be a string'
                },
                email: {
                    bsonType: 'string',
                    description: 'email should be a string'
                },
                password: {
                    bsonType: 'string',
                    description: 'password should be string'
                },
                country_code: {
                    bsonType: "string",
                    description: "country_code must be a string starting with '+' followed by 1-4 digits",
                    pattern: "^\\+[0-9]{1,4}$"
                },
                phone_number: {
                    bsonType: "string",
                    description: "phone_number must be a string of 7 to 15 digits, optionally separated by spaces, dashes, or dots",
                    pattern: "^[0-9]{7,15}$"
                }
            }
        }
    }
});