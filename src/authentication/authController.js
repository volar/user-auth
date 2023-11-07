const userService = require('../Users/userService')
const authService = require('./authService')

function registerUser(userData,done){
    userService.findUser(userData.email,(err,userFound)=>{
        if(err){
            done(err)
        }
        else {
            if(userFound){
                done(new Error('User already exists'))
            } else {
                userService.registerUser(userData,done)
            }  
        }
    })
}

function loginUser({ email, password }, done) {
    userService.findUser(email, (err, userFound) => {
        if (err) {
            done('User not found')
        }
        else {
            const userVerified = authService.verifyUser({ email, password }, userFound)
            if (userVerified) {
                console.log(userFound)  
                const token = authService.createJWT(userFound)
                console.log(token)
                done(undefined, token)
            }
            else {
                done({error:"user not verified"})
            }
        }
    })
}

module.exports = {
    registerUser,loginUser
}