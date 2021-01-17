import express from 'express'
import user from '../../Middleware/Users-Middlware/index'
import User from '../../Modal/Users-Modal/index'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const Router = express.Router()

Router.post('/register',user.validate, async(req, res) => {
   try {
       console.log(User)
      let data = await User.create(req.body);
      res.status(201).json({
        message: "Success",
        status: true,
        response: data.token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Fail",
        status: false,
        response: error,  
      });
}});
Router.post('/login', async (req,res)=>{
    try{
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        await bcrypt.compareSync(req.body.password, user.password)
        let token = await generateToken(user._id)
        console.log(token,'token')
        let updateUserData = await User.findByIdAndUpdate({_id:user._id},{$set:{token}})
        console.log(updateUserData,'up')
        res.send({
            message: "Success",
            status: true,
            response: token,
        })
    }catch (err){
        res.json({
            message:"Fail",
            status:404,
            response:err
        })
    }


} )

Router.post('/logout', async (req,res)=>{
    try{
        let token = null
        await User.findOneAndUpdate({token:req.body.token},{$set:{token}})
        res.send({
            message: "Success",
            status: true,
        })
    }catch (err) {
        res.json({
            message:"Fail",
            status:404,
            response:err
        })
    }
})

Router.post('/forgetPassword', (req,res)=>{} )

Router.post('/VerifyPassword', (req,res)=>{} )

export default Router


function  generateToken(id:string){
    let payload = {
        userId:id
    }
    let token = jwt.sign(payload,'secret123$$')
    return token
}