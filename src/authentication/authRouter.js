const express = require('express')
const router = express.Router()
const authController = require('./authController')

//This method post will regiater the use
router.post('/register',(req,res)=>{
    try {
    //retrive name, email and password from request bod
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).send('Required fields are missing')
        }

        const userDetails = {
            name,
            email,
            password
        }

        //calling authController registeruser method return the error msg or the result
        authController.registerUser(userDetails,(err,result)=>{
            if(err){
                return res.status(400).send({error:'User already exists'}, err)
            }
            else {
                res.status(201).send(result)
            }
        })
    } catch (error) {
        return res.status(500).send({error:'Unexpected error while registering user'}, error)   
    }
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).send({error:'Required fields are missing'})
        }

        authController.loginUser({email,password},(err,result)=>{
            if(err){
                return res.status(401).send({error:'Invalid credential', err})
            }
            else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        return res.status(500).send({error:'Unexpected error while logging in user', error})
    }
})

module.exports = router