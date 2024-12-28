import { useDataStore } from "../../context/DataStoreContext";

const PlayerLogs = () => {
  const { logs } = useDataStore();
  return (
    <div className="history">
      {[...logs].reverse().map((log, index) => (
        <p key={index} className={index === 0 ? "active log" : "log"}>
          {log.message}
        </p>
      ))}
    </div>
  )
}

export default PlayerLogs;