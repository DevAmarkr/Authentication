import mongoose, { Schema, Document,Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    token:string
}


const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username should not be empty"],
    min: 5,
    max: 10,
  },
  email: {
    type: String,
    required: [true, "email should not be empty"]
  },
  password:{
    type: String,
    min: 6,
    required:[true, "password should not be empty"]
  },
  token:{
    type:String
  }

},{
  writeConcern: {
    j: true,
    wtimeout: 1000
  }
});


UserSchema.pre<IUser>('save', async function(next){
  let user = this
  try {
    if(user.isNew){
      let salt = await  bcrypt.genSalt(10)
      let hash = await bcrypt.hash(user.password,salt)
      let payload = {
        userId:this._id
      }
      user.password = hash
      let token = jwt.sign(payload,'secret123$$')
      user.token = token
      next()
    }
  } catch (error) {
    next(error)
  }
})

export default mongoose.model<IUser>('users', UserSchema)
