import { useContext, useState} from 'react'
import {AuthContext} from '../../context/authContext'
import makeRequest from '../../axios';
import './comments.scss'
import { useQuery, useMutation,useQueryClient  } from '@tanstack/react-query';
import moment from 'moment';

export const Comments=({postId})=>{
    const {currentuser}=useContext(AuthContext);
    const [description,setDescription]=useState("")
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
          makeRequest.get('/comments?postId='+postId,).then(
            (res) =>{return  res.data},
          ),
      })

      const queryClient = useQueryClient()
      const mutation = useMutation(
        (newComment)=>{
            return makeRequest.post('/comments',newComment)
        }
      ,{
        //mutationFn: postTodo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
      })

      const handleClick=async (e)=>{
        e.preventDefault();
        mutation.mutate({description,postId});
        setDescription("")
      }
    if (error) return 'An error has occurred: ' + error.message
    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentuser.profilePic} alt="" />
                <input type="text" placeholder='Comment here' value={description} onChange={e=>{setDescription(e.target.value)}}/>
                <button onClick={handleClick}>send</button>
            </div>
            {
            isLoading?"Loading"
                :
                (data.map(comment=>(
                    <div className="comment">
                        <img src={"/upload/"+comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.description}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                )))}
        </div>
    )
}