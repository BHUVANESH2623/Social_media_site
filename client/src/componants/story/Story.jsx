import './story.scss';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import makeRequest from '../../axios';

export const Story=({story})=>{
    const [menuOpen,setMenuOpen]=useState(false);
    const {currentuser}=useContext(AuthContext)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation(
        (storyId) => {
          return makeRequest.delete("/stories/"+ storyId);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["stories"]);
          },
        }
      );
    const handleDelete=()=>{
        deleteMutation.mutate(story.id)
    }
    return (
            <div className="story" key={story.id}>
                <img src={"/upload/"+story.img} alt="" />
                <span>{story.name}</span>
                <div className="deletestory" key={story.id}>
                <MoreHorizOutlinedIcon onClick={()=>{setMenuOpen(!menuOpen)}}/>
                {menuOpen && story.userId===currentuser.id && <DeleteOutlineOutlinedIcon className='delete' onClick={handleDelete} />}
                </div>
            </div>
    )
}