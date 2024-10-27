import { useEffect, useState } from "react";
import { PostResultApi } from "../api/PostResultApi"
import { GetResultApi } from "../api/GetResultApi";
export const useResult = (isGoal, level, time) => {
    const [results, setResults] = useState([]);
    const postResultData = async (level, time) => {
        const data = await PostResultApi(level, time);
        if (data.success) {
            alert("投稿が完了しました");
        } else {
            alert("エラーが発生しました");
        }
    }

    const getResultData = async (level) => {
        const data = await GetResultApi(level);
        const sortData = data.sort((a, b) => a.time - b.time);
        const sliceData = sortData.slice(0, 3);
        setResults(sliceData);
    }

    useEffect(() => {
        if (isGoal) {
            postResultData(level, time);
            getResultData(level);
        }
    }, [isGoal]);

    return { results };
}