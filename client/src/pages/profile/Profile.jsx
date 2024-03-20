import './profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Posts} from '../../componants/posts/Posts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import makeRequest from '../../axios';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../componants/update/Update'

export const Profile=()=>{
    const [openUpdate,setOpenUpdate]=useState(false);
    const {currentuser}=useContext(AuthContext);

    const userId=parseInt(useLocation().pathname.split("/")[2])

    const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const {  data:relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );
    

  const queryClient = useQueryClient()
    const mutation = useMutation(
        (following) => {
          if(following) return makeRequest.delete("/relationships?userId=" + userId);
          return makeRequest.post("/relationships/",  {userId});
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["relationship"]);
          },
        }
      );
    const handleFollow=()=>{
        mutation.mutate(relationshipData.includes(currentuser.id))
    }

    return (
        <div className="profile">
            {isLoading ?"Loading":
            <>
                <div className="images">
                <img src={"/upload/"+data?.coverPic} alt="" className='cover'/>
                <img src={"/upload/"+data?.profilePic} alt="" className='profile'/>
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon  />
                        </a>
                        <a href="http://facebook.com">
                            <InstagramIcon />
                        </a>
                        <a href="http://facebook.com">
                            <TwitterIcon />
                        </a>
                        <a href="http://facebook.com">
                            <PinterestIcon />
                        </a>
                        <a href="http://facebook.com">
                            <LinkedInIcon />
                        </a>
                    </div>
                    <div className="center">
                        <span>{data?.name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                <span>{data?.city}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon/>
                                <span>{data?.website}</span>
                            </div>
                        </div>
                        {userId===currentuser.id?
                            (<button onClick={()=>setOpenUpdate(true)}>update</button>):
                                (<button onClick={handleFollow}>{relationshipData.includes(currentuser.id)? "Following":"Follow"}</button>)}
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon/>
                        <MoreVertIcon/>
                    </div>
                </div>
                <Posts userId={userId}/>
            </div>
            </>}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    )
}