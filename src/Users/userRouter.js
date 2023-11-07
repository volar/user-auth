const express = require('express')
const router = express.Router()
const { route } = require('../authentication')
const userController = require('./userController')

//This get method will get the user with token
router.get('/',(req,res)=>{
    try {
        const userData = req.claims
        console.log(userData)
        if(!userData){
            return res.status(400).send({error:'User emails not found'})
        }

        userController.findUser(userData.email,(err,result)=>{
            if(err){
                return res.status(400).send({error:'User not found'}, err)
            }
            else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        return res.status(500).send({error:'Unexpected error while getting user'}, error)
    }
})

module.exports = router