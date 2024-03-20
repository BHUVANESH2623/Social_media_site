import { createContext,useEffect, useState } from "react";

export const DarkModeContext=createContext();

export const DarkModeContextProvider=({children})=>{
    const [darkmode,setDarkmode]=useState(JSON.parse(localStorage.getItem("darkmode"))||false);

    const toggle=()=>{
        setDarkmode(!darkmode);
    }

    useEffect(()=>{
        localStorage.setItem("darkmode",darkmode)
    },[darkmode]);


    return (
        <DarkModeContext.Provider value={{darkmode,toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}