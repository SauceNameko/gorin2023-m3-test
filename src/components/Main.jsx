import { useState } from "react";
import { useField } from "../hooks/useField";
import { useProfile } from "../hooks/useProfile";
import { SettingScene } from "./SettingScene";
import { FieldScene } from "./FieldScene";
import { ResultScene } from "./ResultScene";
import { useResult } from "../hooks/useResult";

export const Main = ({ isLogin, logout }) => {
    const { isSetting, profileData, settingClick, updateClick, totalPlayTime } = useProfile(isLogin);
    const [level, setLevel] = useState(0);
    const [isReset, setIsReset] = useState(false);
    const { field, isGoal, clickStart, time } = useField(level, isReset);
    const { results } = useResult(isGoal, level, time);

    //リセット実行フラグ
    const clickReset = () => {
        setIsReset(true);
        setLevel(0);
    }



    return (
        <>
            {!isSetting && level == 0 &&
                <>
                    <div className="title">Welecome,{profileData.nickname}!</div>
                    <div>Your total time is {totalPlayTime / 60}min</div>
                    <button onClick={() => {
                        settingClick()
                        setIsReset(false)
                    }} >Profile Settings</button>
                    <button onClick={() => {
                        logout()
                        setIsReset(false)
                    }} >Logout</button>
                    <button onClick={() => {
                        setLevel(1)
                        setIsReset(false)
                    }} >Easy</button>
                    <button onClick={() => {
                        setLevel(2)
                        setIsReset(false)
                    }} >Normal</button>
                </>
            }
            {isSetting && <SettingScene profileData={profileData} updateClick={updateClick}></SettingScene>}
            {level != 0 && !isGoal && <FieldScene field={field} level={level} clickStart={clickStart} time={time} ></FieldScene>}
            {level != 0 && isGoal && <ResultScene results={results} clickReset={clickReset} ></ResultScene>}
        </>
    )
}