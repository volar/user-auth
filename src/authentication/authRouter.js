const express = require('express')
const router = express.Router()
const authController = require('./authController')

//This method post will regiater the use
router.post('/register',(req,res)=>{
    try {
    //retrive name, email and password from request bod
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).send('Required fields missing')
        }

        const userDetails = {
            name,
            email,
            password
        }

        //calling authController registeruser method return the error msg or the result
        authController.registerUser(userDetails,(err,result)=>{
            if(err){
                return res.status(400).send({error:'User already exists'})
            }
            else {
                res.status(201).send(result)
            }
        })
    } catch (error) {
        return res.status(400).send({error:'Unexpected error while registering user'})   
    }
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{


    //retrive email and password from req.body
    
    //calling the authController login usermethod return the error or the result 
    authController.loginUser({email,password},(err,result)=>{
        
    })

})

module.exports = router