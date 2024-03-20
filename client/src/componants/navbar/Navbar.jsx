import './navbar.scss';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

export const Navbar=()=>{
    const {darkmode,toggle}=useContext(DarkModeContext);
    const {currentuser,logout}=useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link style={{textDecoration:"none"}} to={'/'}><span>Socio Socio..</span></Link>
                <HomeOutlinedIcon/>
                {
                darkmode?(
                    <WbSunnyOutlinedIcon onClick={toggle}/>
                )
                    :(
                    <DarkModeOutlinedIcon onClick={toggle}/>
                )
                }
                <GridViewOutlinedIcon/>
                <div className="search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder='Search ..' />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon/>
                <EmailOutlinedIcon/>
                <NotificationsOutlinedIcon/>
                {currentuser && <div className="user">
                    {/* <img src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" /> */}
                    <img src={"/upload/"+currentuser.profilePic} alt="" />
                    <span>{currentuser.name}</span>
                    {currentuser && <span onClick={logout}>Logout</span>}
                </div>}

                {/* <span>{currentuser?.username}</span>
                {currentuser.profilePic && <img src={currentuser.profilePic} alt=''/>}
                {currentuser?<span onClick={logout}>Logout</span>:<Link className="link" to="/login">Login</Link>} */}
            </div>
        </div>
    )
}