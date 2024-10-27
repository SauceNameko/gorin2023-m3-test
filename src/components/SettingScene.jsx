import { useRef } from "react"

export const SettingScene = ({ profileData, updateClick }) => {
    const userRef = useRef();
    const nickRef = useRef();
    return (
        <>
            username: <input type="text" name="username" id="" defaultValue={profileData.username} ref={userRef} />
            nickname: <input type="text" name="nickname" id="" defaultValue={profileData.nickname} ref={nickRef} />
            <button onClick={() => { updateClick(userRef.current.value, nickRef.current.value) }} >Update</button>
        </>
    )
}