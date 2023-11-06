const users = require('./users.json');
const fs = require('fs');

//import users.json file and fs module

//This method will findUser
function findUser(email,done){
    const user = users.find(user=>user.email === email)
    done(null,user)
}

//This method will register user
function registerUser(userData,done){
   
    //call fileWrite method and write the user in json file
    users.push(userData)
    fs.writeFileSync('./src/Users/users.json',JSON.stringify(users))
    done(null,userData)
}

module.exports = {
    findUser,registerUser
}