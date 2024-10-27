import { useEffect, useState } from "react";
import { GetProfileApi } from "../api/GetProfileApi";
import { PutProfileApi } from "../api/PutProfileApi";
export const useProfile = (isLogin) => {
    const [profileData, setProfileData] = useState([]);
    const [isSetting, setIsSetting] = useState(false);
    const [totalPlayTime, setTotalPlayTime] = useState(0);
    const getProfile = async () => {
        const data = await GetProfileApi();
        if (data.success != false) {
            setProfileData(data);
        }
    }
    useEffect(() => {
        if (isLogin) {
            getProfile();
        }
    }, [isLogin]);

    const settingClick = () => {
        setIsSetting(true);
    }

    const updateClick = (username, nickname) => {
        const check = async () => {
            const user = /^[a-zA-Z0-9]{5,}$/.test(username);
            const nick = nickname.length >= 4;
            if (user && nick) {
                const data = await PutProfileApi(username, nickname);
                if (username == sessionStorage.getItem("username")) {
                    return alert("The username is already taken.");
                }
                if (data.success) {
                    setIsSetting(false);
                }
            }else {
                alert("正しく入力してください")
            }
        }
        check();
    }

    useEffect(() => {
        if (profileData.results) {
            profileData.results.map(profile => {
                setTotalPlayTime(prev => prev += profile.time)
            })
        }

    }, [profileData]);

    return { isSetting, profileData, settingClick, updateClick, totalPlayTime };
}