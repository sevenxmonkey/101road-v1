import { useDataStore } from "../../context/DataStoreContext";

const PlayerLogs = () => {
  const { logs } = useDataStore();
  return (
    <div className="history">
      <div className="diary-title">Diary</div>
      {[...logs].reverse().map((log, index) => (
        <div key={index} className={index === 0 ? "active log" : "log"}>
          {log.message}
        </div>
      ))}
    </div>
  )
}

export default PlayerLogs;