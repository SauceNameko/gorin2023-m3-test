import { useEffect, useState } from "react"
import { GetFieldApi } from "../api/GetFieldApi";
import { fieldObjects } from "../fieldObjects";
export const useField = (level, isReset) => {
    const [field, setField] = useState([]);
    const [playerPos, setPlayerPos] = useState({ y: 0, x: 0 });
    const [isStart, setIsStart] = useState(false);
    const [time, setTime] = useState(0);
    const [isGoal, setIsGaol] = useState(false);
    //スタート処理
    const clickStart = () => {
        setIsStart(true);
    }

    //時間計測
    useEffect(() => {
        if (isStart) {
            const time = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => {
                clearInterval(time);
            }
        }
    }, [isStart]);

    //プレイヤー座標更新
    useEffect(() => {
        if (field.length === 0) return;
        const newField = [...field];
        for (let i = 0; i < newField.length; i++) {
            for (let j = 0; j < newField[i].length; j++) {
                if (newField[i][j] == fieldObjects.player) {
                    setPlayerPos({ y: i, x: j });
                }
            }
        }
    }, [field]);

    const getField = async (level) => {
        const data = await GetFieldApi(level);
        setField(data);
    }

    useEffect(() => {
        if (level != 0) {
            getField(level);
        }
    }, [level])

    //フィールド更新

    const move = (e) => {
        if (field.length === 0) return;
        setPlayerPos(prev => {
            let newY = prev.y;
            let newX = prev.x;
            let direction = "";
            switch (e.key) {
                case "ArrowLeft":
                    newX = newX - 1;
                    direction = "left";
                    break;
                case "ArrowRight":
                    newX = newX + 1;
                    direction = "right";
                    break;

                case "ArrowUp":
                    newY = newY - 1;
                    direction = "up";
                    break;
                case "ArrowDown":
                    newY = newY + 1;
                    direction = "down";
                    break;

                default:
                    break;
            }

            const newField = [...field];
            //何もない場所判定
            if (newField[newY][newX] == fieldObjects.none) {
                newField[newY][newX] = fieldObjects.player;
                newField[prev.y][prev.x] = fieldObjects.none;
            }
            //壁判定
            else if (newField[newY][newX] == fieldObjects.wall) {
                return { y: prev.y, x: prev.x };
            }
            //移動ブロック判定
            else if (newField[newY][newX] == fieldObjects.block) {

                newField[prev.y][prev.x] = fieldObjects.player;
                if (direction == "left") {
                    if (newField[newY][newX - 1] == fieldObjects.none) {
                        newField[newY][newX - 1] = fieldObjects.block;
                        newField[newY][newX] = fieldObjects.none;
                    }
                } else if (direction == "right") {
                    if (newField[newY][newX + 1] == fieldObjects.none) {
                        newField[newY][newX + 1] = fieldObjects.block;
                        newField[newY][newX] = fieldObjects.none;
                    }
                } else if (direction == "up") {
                    if (newField[newY - 1][newX] == fieldObjects.none) {
                        newField[newY - 1][newX] = fieldObjects.block;
                        newField[newY][newX] = fieldObjects.none;
                    }
                } else if (direction == "down") {
                    if (newField[newY + 1][newX] == fieldObjects.none) {
                        newField[newY + 1][newX] = fieldObjects.block;
                        newField[newY][newX] = fieldObjects.none;
                    }
                }
            }
            //ゴール判定
            else if (newField[newY][newX] == fieldObjects.flag) {
                setIsGaol(true);
                setIsStart(false);
            }
            setField(newField);

            return { y: newY, x: newX };
        })
    }

    useEffect(() => {
        if (isStart) {
            document.addEventListener("keydown", move);
            return () => {
                document.removeEventListener("keydown", move);
            }
        }
    }, [field, isStart]);

    //リセット判定
    useEffect(() => {
        if (isReset) {
            setField([]);
            setIsGaol(false);
            setPlayerPos({});
            setTime(0);
        }
    }, [isReset]);

    return { field, isGoal, clickStart, time }
}