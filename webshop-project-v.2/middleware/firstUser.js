const User = require('../../models/User')

// Intended to create a starter Admin account for the first startup of the app.
const newUser = {
            userType: 'admin',
            firstname: 'AdminFirstname',
            surname: 'AdminSurname',
            email: 'email@email.com',
            password: 'TheFirstPassword123456!'
            }