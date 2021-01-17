import {Request,Response, NextFunction} from "express"
import Joi from "Joi"



// It is a data

const data ={
  validate:async(req:Request,res:Response,next:NextFunction) =>{
    const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        username:Joi.string().alphanum().min(3).max(50).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    
    try {
     await schema.validateAsync(req.body);
     console.log('Hello')
     next()
    }
    catch (err) {
      res.json(err.details[0].message.replace(/[^a-zA-Z]/g,' ').trimStart())
    }
 }
}

// const validate = async(req:Request,res:Response,next:NextFunction) =>{
//    const schema = Joi.object({
//        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//        username:Joi.string().alphanum().min(3).max(50).required(),
//        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
//    })
   
//    try {
//     await schema.validateAsync(req.body);
//     next()
//    }
//    catch (err) {
//      res.json(err.details[0].message.replace(/[^a-zA-Z]/g,' ').trimStart())
//    }
// }
// // const confirmNewPassword = async(req:Request,res:Response,next:NextFunction) =>{
// //   next()
// // }
// // const isUser = async(req:Request,res:Response,next:NextFunction) =>{
// //     next()
// // }
// // const isEmailExist = async(req:Request,res:Response,next:NextFunction) =>{
// //     next()
// // }

export default data