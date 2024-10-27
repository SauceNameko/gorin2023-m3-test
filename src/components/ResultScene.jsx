import "./ResultScene.css";
export const ResultScene = ({ results, clickReset }) => {
    return (
        <>
            <div>Congratulations!</div>
            <table>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>

                {results.map((result, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td className={`${result.username == sessionStorage.getItem("username") ? "active" : ""} `} >{result.username}</td>
                            <td>{`${Math.floor(result.time / 60)}:${String(result.time % 60).padStart(2, "0")}`}</td>
                        </tr>
                    )
                })}

            </table>
            <button onClick={clickReset} >Replay</button>
        </>
    )
}