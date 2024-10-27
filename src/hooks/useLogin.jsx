import { useEffect, useState } from "react"
import { LoginApi } from "../api/LoginApi";
import { LogoutApi } from "../api/LogoutApi";
export const useLogin = () => {
    const [isLogin, setIsLogin] = useState(false);

    const loginCheck = (username, password) => {
        const check = async () => {
            const data = await LoginApi(username, password);
            if (data.token) {
                setIsLogin(true);
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("username", username);
            } else if (data.success == false) {
                return alert("The username or password is incorrect.");
            }
        }
        check();
    }

    const logout = () => {
        const check = async () => {
            const data = await LogoutApi();
            if (data.success) {
                setIsLogin(false);
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("username");
            }
        }
        check();
    }

    //既にログインしているならログインスキップ
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLogin(true);
        } else {
            return setIsLogin(false);
        }
    }, []);

    return { isLogin, loginCheck, logout };
}