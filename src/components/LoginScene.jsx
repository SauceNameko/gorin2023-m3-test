import { useRef } from "react"

export const LoginScene = ({ loginCheck }) => {
    const userRef = useRef();
    const passRef = useRef();
    return (
        <>
            username: <input type="text" name="username" id="" ref={userRef} />
            password: <input type="text" name="password" id="" ref={passRef} />
            <button onClick={() => loginCheck(userRef.current.value, passRef.current.value)} >Login</button>
        </>
    )
}