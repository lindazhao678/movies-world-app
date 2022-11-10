import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthContext";

//Create useAuth function to access AuthContext values [Access the wrapper]
const useAuth = () => {
    const { user } = useContext(AuthContext);

    // Format Function (only call when you inspecting the dev tool). Optional chaining: user?.id
    useDebugValue(user, user => user?.id ? "Logged In" : "Logged Out");

    return useContext(AuthContext);
};

export default useAuth;
