const users = require('./users.json');
const fs = require('fs');

function findUser(email,done){
    const user = users.filter(user=>user.email===email)[0]
    if(!user){
        done("user not found")
    }
    done(undefined,user)
}

function registerUser(userData,done){
    users.push(userData)
    fs.writeFileSync('./src/Users/users.json',JSON.stringify(users))
    done(null,userData)
}

module.exports = {
    findUser,registerUser
}