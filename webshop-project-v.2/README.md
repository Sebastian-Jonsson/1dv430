# Burning Blueberry

[Burning Blueberry app](https://shrouded-caverns-01970.herokuapp.com/)

Sebastian Jonsson (sj223gb)

[Project Wiki](https://gitlab.lnu.se/1dv430/student/sj223gb/webshop-project-v.2/-/wikis/home)

## Getting Started in Developement Mode

- Download the Repository.
- Enter the Repository folder.
- Write "npm install" for your dev tools.
- Write "npm run client-install".
- Create the folder config in the source catalog and add the default.json file.

    `{`
    `"mongoURI": "YOUR_MONGODB_CONNECTION_STRING",`
    `"jwtSecret": "INPUT_YOUR_JSONWEBTOKEN_HERE",`
    `"jwtadminsecret": "INPUT_YOUR_ADMIN_SECRET_HERE"`
    `}`

- Write "npm run dev", which starts the server and client in your browser.


## Testing

Testing is documented on the projects wiki and holds a guide on how to proceed.

[Test Specification](https://gitlab.lnu.se/1dv430/student/sj223gb/webshop-project-v.2/-/wikis/Test%20Specification)

Development environment must be running before you can start the testing.

The application currently does not support a pre-made Admin user and you have to follow [Manual Test Case 1.1](https://gitlab.lnu.se/1dv430/student/sj223gb/webshop-project-v.2/-/wikis/Manual%20Test%20Cases):

- Swap "TestPerson@email.com" to "TestAdmin@gmail.com" for the Test Cases to be valid.
- Enter the Database collection "users" and change the "userType" of TestAdmin@gmail.com" to "admin".
- You can now proceed to the testing.

### Server Testing

- "Getting Started in Developement Mode" has to be in effect.
- Write "npm run test".
- Report is written in the terminal.


### Client Testing

- "Getting Started in Developement Mode" has to be in effect.
- Find the Manual Test Cases here: [Manual Test Cases](https://gitlab.lnu.se/1dv430/student/sj223gb/webshop-project-v.2/-/wikis/Manual%20Test%20Cases)