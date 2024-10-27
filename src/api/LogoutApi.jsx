import { path } from "./path";
export const LogoutApi = async () => {
    const res = await fetch(`${path}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    return data;
}