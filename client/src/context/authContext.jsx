import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentuser,setCurrentuser]=useState(JSON.parse(localStorage.getItem("currentuser"))||null);

    const login=async (inputs)=>{
        try{
            const res= await axios.post("http://localhost:8080/api/auth/login",inputs,{
                withCredentials:"true"
            });
            setCurrentuser(res.data);
        }catch(err){
            console.log(err);
        }
    }

    const logout=async (inputs)=>{
        try{
            await axios.post("http://localhost:8080/api/auth/logout");
            setCurrentuser(null);
        }catch(err)
        {
            console.log(err)
        }
    }

    useEffect(()=>{
        localStorage.setItem("currentuser",JSON.stringify(currentuser))
    },[currentuser])

    return (
        <AuthContext.Provider value={{currentuser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}