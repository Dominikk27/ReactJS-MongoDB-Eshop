
import { createContext, useContext, useEffect, useState } from "react";

import config from "../../../utils/config.js";


const AuthContext = createContext();

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() =>{
        const fetchAuthStatus = async () =>{
            try{
                const res = await fetch(`${config.API_URL}/auth/status`, {
                    method: "GET",
                    credentials: "include"
                });

                if(!res.ok){
                    throw new Error("Failed to fetch auth status");
                }

                const data = await res.json();
                if(!data.authentificated && !data.accessToken){
                    console.log("YEY");
                    setToken(null);
                    setIsAuthorized(false);
                }
                setToken(data.accessToken);
                setIsAuthorized(true);
                
            }catch(e){
                console.log("Failed to auth! error: ", e);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchAuthStatus();
    }, []);

    const login = (token) => {
        setToken(token); 
        setIsAuthorized(true);
    }

    const logout = async () => {

        try{
            const res = await fetch(`${config.API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            if(!res.ok){
                throw new Error("Failed to fetch auth status");
            }
            
        }catch(e){
            console.log("Failed to logout! error: ", e);
        }
        finally{
            setToken(null);
            setIsAuthorized(false);
            setIsLoading(false);
        }
    }

    const contextValues = {
        token,
        isAuthorized: !!token,
        isLoading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={ contextValues }>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthContext, AuthProvider}