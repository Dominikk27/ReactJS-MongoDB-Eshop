import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider({ isAuthorized, children }) {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
        }
        setIsLoading(false);
    },[]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
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