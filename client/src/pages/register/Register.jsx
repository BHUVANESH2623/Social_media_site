import { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register=()=>{
    const navigate=useNavigate();
    const [inputs,setInputs]=useState({
        username:"",
        name:"",
        email:"",
        password:""
    });
    const [err,setErr]=useState(null);
    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/auth/register",inputs)
            navigate("/login")

        }catch(err){
            setErr(err.response.data);
        }
    }

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Register</h1>
                    <form >
                        <input type="text" required placeholder='username' name='username' onChange={handleInput}/>
                        <input type="text" required placeholder='name' name='name' onChange={handleInput}/>
                        <input type="email" required placeholder='email' name='email' onChange={handleInput}/>
                        <input type="password" required placeholder='password' name='password' onChange={handleInput}/>
                        {err&& <p>{err}</p>}
                        <button onClick={handleSubmit}>Register</button>
                    </form>
                </div>
                <div className="right">
                    <h1>Hello World</h1>
                    <p>A computer program can easily produce gibberish - especially if it has been provided with garbage beforehand. </p>
                    <span>Do you have an account</span>
                    <Link to={'/login'}><button>Login</button></Link>
                </div>
            </div>
        </div>
    )
}