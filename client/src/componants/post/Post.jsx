import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
import { Comments } from '../comments/Comments';
import moment from 'moment';
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import makeRequest from '../../axios';
import { AuthContext } from '../../context/authContext';


export const Post=({post})=>{
    const [commentsOpen,setCommentsOpen]=useState(false);
    const [menuOpen,setMenuOpen]=useState(false);
    const {currentuser}=useContext(AuthContext);

    const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

    const queryClient = useQueryClient()
    const mutation = useMutation(
        (liked) => {
          if(liked) return makeRequest.delete("/likes?postId=" + post.id);
          return makeRequest.post("/likes", { postId: post.id });
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["likes"]);
          },
        }
      );
    const handleLike=()=>{
        mutation.mutate(data.includes(currentuser.id))
    }

    const deleteMutation = useMutation(
        (postId) => {
          return makeRequest.delete("/posts/"+ postId);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
      );
    const handleDelete=()=>{
        deleteMutation.mutate(post.id)
    }
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={"/upload/"+post.profilePic} alt="" />
                        <div className="details">
                            <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${post.userId}`}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon onClick={()=>{setMenuOpen(!menuOpen)}}/>
                    {menuOpen && post.userId===currentuser.id && <button onClick={handleDelete}>Delete</button>}
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    {post.img && <img src={"/upload/"+post.img} alt="" />}
                </div>
                <div className="info">
                    <div className="item">
                        {isLoading ? (
                        "loading"
                        ) : data.includes (currentuser.id) ? (
                        <FavoriteOutlinedIcon onClick={handleLike}
                            style={{ color: "red" }}
                        />
                        ) : (
                        <FavoriteBorderOutlinedIcon onClick={handleLike} />
                        )}
                        {data?.length} Likes
                    </div>
                    <div className="item" onClick={()=>{setCommentsOpen(!commentsOpen)}}>
                        <TextsmsOutlinedIcon/>
                        12 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon/>
                        share
                    </div>
                </div>
                {commentsOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}