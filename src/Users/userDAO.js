const users = require('./users.json');
const fs = require('fs');

function findUser(email,done){
    const user = users.find(user=>user.email === email)
    done(null,user)
}

function registerUser(userData,done){
    users.push(userData)
    fs.writeFileSync('./src/Users/users.json',JSON.stringify(users))
    done(null,userData)
}

module.exports = {
    findUser,registerUser
}