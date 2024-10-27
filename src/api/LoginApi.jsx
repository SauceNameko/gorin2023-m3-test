import { path } from "./path";
export const LoginApi = async (username, password) => {
    const res = await fetch(`${path}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success == false) {
        return data;
    } else if (data.token) {
        return data;
    }
}