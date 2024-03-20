import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext'
import './share.scss';
import Image from '../../assests/image.png';
import Place from '../../assests/add-location.png';
import Tagfriend from '../../assests/tag.png';
import makeRequest from '../../axios'
import {useMutation,useQueryClient} from '@tanstack/react-query'

export const Share=()=>{
    const [file,setFile]=useState(null);
    const [description,setDescription]=useState("");
    const {currentuser}=useContext(AuthContext);

    const upload=async ()=>{
        try{
            const formData=new FormData();
            formData.append("file",file);
            const res=await makeRequest.post('/upload',formData)
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    const queryClient = useQueryClient()
    const mutation = useMutation((newPost)=>{
       return makeRequest.post("/posts",newPost)
    },{
        // mutationFn: postTodo,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
      })

    const handleClick= async (e)=>{
        e.preventDefault();
        let imgURL="";
        if(file) imgURL=await upload();
        mutation.mutate({description,img:imgURL})
        setDescription("");
        setFile(null);
    }

    return(
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={"/upload/"+currentuser.profilePic} alt="" />
                        <input type="text" required placeholder={`what on your mind ${currentuser.username}`} value={description} onChange={e=>{setDescription(e.target.value)}}/>
                    </div>
                    <div className="right">
                        {file && <img className='file' src={URL.createObjectURL(file)} alt="" />}
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <input type="file"id='file' style={{display:"none"}} onChange={e=>{setFile(e.target.files[0])}}/>
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Place} alt="" />
                            <span>Add place</span>
                        </div>
                        <div className="item">
                            <img src={Tagfriend} alt="" />
                            <span>Tag Friend</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}