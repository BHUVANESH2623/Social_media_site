import './stories.scss'
import { Story } from '../story/Story'
import { useQuery } from '@tanstack/react-query'
import makeRequest from '../../axios'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//import Image from '../../assests/image.png'

export const Stories=()=>{
    const { isLoading, error, data } = useQuery({
        queryKey: ['stories'],
        queryFn: () => makeRequest.get("/stories").then((res)=>{
            return res.data;
        })
      });
    const [openStory,setOpenStory]=useState(false);
    const {currentuser}=useContext(AuthContext)
    const [file,setFile]=useState(null);
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
       return makeRequest.post("/stories",newPost)
    },{
        // mutationFn: postTodo,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['stories'] })
        },
      })

      const handleClick= async (e)=>{
        e.preventDefault();
        let imgURL="";
        if(file) imgURL=await upload();
        mutation.mutate({img:imgURL})
        setFile(null);
        setOpenStory(false);
    }
    return (
        <div className="stories">
            <div className="story">
                <img src={"/upload/" +currentuser.profilePic} alt="" />
                <span className='uspan'>{currentuser.name}</span>
                <button className='addstory' onClick={()=>setOpenStory(!openStory)}>+</button>
            </div>
            <div className="story">
                {
                    error?"something went wrong"
                    :
                    isLoading?"loading..."
                    :
                    (data.map((story)=>
                        (
                        <div className="story">
                            <Story story={story} key={story.id}/>
                        </div>
                    )))
                }
            </div>

            
            {openStory &&
                <div className="add">
                    <button className='close' onClick={()=>setOpenStory(false)}>X</button>
                    <div className='item'>
                        <input type="file"id='file' style={{display:"none"}} onChange={e=>{setFile(e.target.files[0])}}/>
                        <label htmlFor="file">
                            <span>Add Image</span>
                        </label>
                    </div>
                    {file && <img className='file' src={URL.createObjectURL(file)} alt="" />}
                    <button onClick={handleClick}>Upload</button>
                </div>
            }
            
        </div>
    )
}
