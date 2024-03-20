import './leftbar.scss';
import Cart from '../../assests/cart.png';
import Message from '../../assests/comments.png';
import Course from '../../assests/course.png';
import Event from '../../assests/Events.png';
import Friend from '../../assests/friend.png';
import Fund from '../../assests/fund.png';
import Gallary from '../../assests/gallary.png';
import Gaming from '../../assests/Gaming.png';
import Memories from '../../assests/memoriespng.png';
import Group from '../../assests/people.png';
import Tutorial from '../../assests/tutorials.png';
import Video from '../../assests/videos.png';
import Watch from '../../assests/Watch.png';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const Leftbar=()=>{
    const {currentuser}=useContext(AuthContext);
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        {/* <img src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" /> */}
                        <img src={"/upload/"+currentuser.profilePic} alt="" />
                        <span>{currentuser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friend} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Group} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Cart} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Other shortcuts</span>
                    <div className="item">
                        <img src={Event} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallary} alt="" />
                        <span>Gallary</span>
                    </div>
                    <div className="item">
                        <img src={Video} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Message} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Funds</span>
                    </div>
                    <div className="item">
                        <img src={Course} alt="" />
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={Tutorial} alt="" />
                        <span>Tutorials</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Funds</span>
                    </div>
                    <div className="item">
                        <img src={Course} alt="" />
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={Tutorial} alt="" />
                        <span>Tutorials</span>
                    </div>
                </div>
            </div>
        </div>
    )
}