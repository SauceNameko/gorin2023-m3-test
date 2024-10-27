import { path } from "./path";
export const GetProfileApi = async () => {
    const res = await fetch(`${path}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    return data;
}