import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register=(req,res)=>{
    const q="SELECT * FROM users WHERE username=?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists");

        const q="INSERT INTO users(username,name,email,password) VALUES(?)";

        const salt=bcrypt.genSaltSync(10);
        const password=bcrypt.hashSync(req.body.password,salt);
        const values=[
            req.body.username,
            req.body.name,
            req.body.email,
            password
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        })
    })

    

}

export const login=(req,res)=>{
    const q="SELECT * FROM users WHERE username=?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err)return res.status(500).json(err);
        if(data.length===0) return res.status(400).json("User not found");

        const checkpassword=bcrypt.compareSync(req.body.password,data[0].password);
        if(!checkpassword) return res.status(400).json("Wrong username or password");

        const token=jwt.sign({id:data[0].id},"secretkey");

        const {password,...others}=data[0];
        
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(others)
    })
}

export const logout=(req,res)=>{
    res.clearCookie("access_token",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user logged out");
}