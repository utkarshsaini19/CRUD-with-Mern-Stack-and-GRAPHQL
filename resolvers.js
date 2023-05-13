import { quotes, users } from './data.js';
import {randomBytes} from 'crypto'
import User from './models/User.js'
import Quote from './models/Quote.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const resolvers = {
    Query:{
        greet:()=>"Hello User",
        user:async (parent,{_id})=>await User.findOne({_id}),
        users:async()=>await User.find({}),
        quotes:async()=>await Quote.find({}).populate('by',"_id firstName"),
        quotebyUser:async(parent,{by})=>await Quote.find({by}),
        getmyProfile:async(parent,args,{userID}) => {
            if(!userID)
            {
                throw new Error("You must be logged in!")
            }
            return await User.findById(userID)
        }
    },
    User:{
        quotes:async (parent)=>  await Quote.find({by:parent._id})
    },
    Mutation:{
        signupUser:async(parent,{userNew})=>{
            let user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists!")
            }
            const secPassword=await bcrypt.hash(userNew.password,12)
            user = await User.create({
                ...userNew,
                password:secPassword
            })
            return user;
        },

        signinUser:async(parent,{userSignIn})=>{
            let user = await User.findOne({email:userSignIn.email})
            if(!user){
                throw new Error("User does not exist!")
            }
            else
            {
                const match = await bcrypt.compare(userSignIn.password, user.password);
                if(match)
                {
                    const token = jwt.sign({userID:user._id},process.env.JWT_SECRET)
                    return {token}

                }
                else{
                    throw new Error("Please enter correct Credentials!!")
                }
            }
            // return user
        },
        createQuote:async (parent,{name},{userID})=>{
            if(!userID)
            {
                throw new Error("You must be logged in!")
            }
            let quote = await Quote.create({
                name,
                by:userID
            })
            return "Quote saved Successfully!"
        }
    }

}

export default resolvers