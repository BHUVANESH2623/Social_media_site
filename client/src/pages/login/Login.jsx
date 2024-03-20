import { useContext, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export const Login=()=>{

    const [inputs,setInputs]=useState({
        username:"",
        password:""
    })
    const [err,setErr]=useState(null);
    const navigate=useNavigate()
    const {login} =useContext(AuthContext)

    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            await login(inputs)
            navigate('/');

        }catch(err){
            setErr(err.response.data);
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Socio  socio...</h1>
                    <p>A computer program can easily produce gibberish - especially if it has been provided with garbage beforehand. </p>
                    <span>Don't you have an account</span>
                    <Link to={'/register'}><button>Register</button></Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form >
                        <input type="text" required placeholder='username' name='username' onChange={handleInput}/>
                        <input type="password" required placeholder='password' name='password' onChange={handleInput}/>
                        {err&& <p>{err}</p>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}