import "./FieldScene.css";
import { fieldObjects } from "../fieldObjects"

export const FieldScene = ({ field, level, clickStart, time }) => {

    const formatT = Math.floor(time / 60);
    const formatS = time % 60;
    const formatTime = `${formatT}:${String(formatS).padStart(2, "0")}`;

    return (
        <>
            <button onClick={() => { clickStart() }} >ゲームスタート</button>
            <div>{formatTime}</div>
            <div className={`field-${level}`}>
                {field.map((y, yIndex) => {
                    return y.map((x, xIndex) => {
                        return (
                            <>
                                {x == fieldObjects.none && <div className="none"></div>}
                                {x == fieldObjects.wall && <div className="wall"></div>}
                                {x == fieldObjects.player && <div className="player"></div>}
                                {x == fieldObjects.block && <div className="block"></div>}
                                {x == fieldObjects.flag && <div className="flag"></div>}
                            </>
                        )
                    })
                })}
            </div>
        </>
    )
}