import { useDataStore } from "../../context/DataStoreContext";

const Inventory = () => {
  const { inventory, consumeSupply } = useDataStore();
  return (
    <div className="inventory">
      <div className="weapons">
        {inventory.weapons.map(({ weapon, quantity }, index) => (
          <div key={index}>{weapon.name} - {weapon.ap} (${quantity})</div>
        ))}
      </div>
      <div className="supplies">
        {inventory.supplies.map(({ supply, quantity }, index) => (
          <div className="supply-item" key={index} onClick={() => consumeSupply(supply.id)}>
            {supply.name}
            <span style={{ color: 'green' }}>+{supply.hp}</span>
            <span style={{ color: "white" }}>[{quantity}]</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory;