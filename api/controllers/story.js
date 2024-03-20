import jwt from 'jsonwebtoken';
import db from '../db.js';
import moment from 'moment';

export const getStories=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token) res.status(401).json("User not logged in ");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token not valid");
        const q=`SELECT s.* ,name FROM stories AS s JOIN users AS u ON (s.userId=u.id)
        LEFT JOIN relationships AS r ON (s.userId=r.followedUserId AND r.followerUserId=?) WHERE s.createdAt> DATE_SUB(CURTIME(), INTERVAL 24 HOUR)`;

        db.query(q,[userInfo.id],(err,data)=>{
            if(err) res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

export const addStory=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token) return res.status(403).json("User not logged in");
    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)

        const q='INSERT INTO stories(img,createdAt,userId) VALUES(?)';
        const values=[
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]
        db.query(q,[values],(err,data)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("post created successfully");
        })
    })
}

export const deleteStory=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token) res.status(401).json("User not logged In");

    jwt.verify(token,"secretkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token not valid");

        const q= "DELETE FROM stories WHERE id=? AND  userId=? ";
        db.query(q,[req.params.id,userInfo.id],(err,data)=>{
            if (err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
            return res.status(403).json("You can delete only your post")
        })
    })
}