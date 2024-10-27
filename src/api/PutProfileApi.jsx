import { path } from "./path";
export const PutProfileApi = async (username, nickname) => {
    const res = await fetch(`${path}/users/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ username, nickname })
    });
    const data = await res.json();
    return data;
}