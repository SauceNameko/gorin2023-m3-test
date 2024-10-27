import { path } from "./path";
export const GetResultApi = async (level) => {
    const res = await fetch(`${path}/results?level=${level}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    return data;
}