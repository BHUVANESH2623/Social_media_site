import express from 'express';
import authRoutes from './routes/auth.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import storyRoutes from './routes/stories.js';
import relationshipRoutes from './routes/relationships.js';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';

const app=express();
app.use(cookieParser())
app.use(express.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(cors({
    origin:"http://localhost:3000"
}))


const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
},
filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
}
})

const upload = multer({ storage: storage })

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename)
})
app.use("/api/users",userRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/relationships",relationshipRoutes);
app.use("/api/stories",storyRoutes)



app.listen(8080,()=>{
    console.log("server connected")
})