import { createContext, useEffect, useState } from "react";

const UserContext = createContext();
const initialUser = null;

const UserProvider = ({children}) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        const token = localStorage.getItem('tokenUserRecipe');
        if(token){
            setUser(JSON.parse(token));
        }
    },[])

    const data = {user, setUser};

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider }
export default UserContext;