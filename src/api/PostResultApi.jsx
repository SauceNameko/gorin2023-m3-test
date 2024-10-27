import { path } from "./path";
export const PostResultApi = async (level, time) => {
    const res = await fetch(`${path}/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ level, time })
    });
    const data = await res.json();
    return data;
}