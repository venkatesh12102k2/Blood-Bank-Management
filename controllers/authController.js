const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async (req,res)=>{
    try{
        const existingUser = await userModel.findOne({ email : req.body.email });
        // console.log(req.body.email+" "+existingUser);
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message: 'User Already Exists',
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const user = new userModel(req.body)

        await user.save()

        return res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user,
        })
    }catch(err)
    {
        console.log(`${err}`.red)
        res.status(500).send({
            success:false,
            message: 'Error in Register API',
            err,
        })
    }
}

const loginController = async (req,res)=>{
    try {
        const user = await userModel.findOne({email : req.body.email});
        if(!user)
        {
            return res.status(404).send({
                success:false,
                meessage:"Invalid Credentials"
            })
        }

        //check role
        if(user.role !== req.body.role)
        {
            return res.status(500).send({
                success:false,
                message:'Role doesnt match',
            })
        }
        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword)
        {
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'24h'})
        
        return res.status(200).send({
            success:true,
            message:'Login Successfull',
            token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in login API'
        });
    }
}

const currentUserController = async (req, res)=>{
    try {
        const user = await userModel.findOne({_id : req.body.userId});
        return res.status(200).send({
            success:true,
            message:'Successfully fetched the current user',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                success:false,
                message:'Cannot get current user',
                error
            }
        )
    }
}

module.exports={registerController, loginController, currentUserController}