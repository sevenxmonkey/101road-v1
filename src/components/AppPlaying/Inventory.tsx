import { useState } from "react";
import { useDataStore } from "../../context/DataStoreContext";
import Dialog from "../common/Dialog";

const SupplyItem = ({
  supplyId,
  onConsume,
  onThrowAway
}: {
  supplyId: string | undefined;
  onConsume: (id?: string) => void;
  onThrowAway: (id?: string) => void
}) => {
  const { inventory } = useDataStore();
  const supply = inventory.supplies.find(s => s.supply.id === supplyId);
  if (!supply) {
    return null;
  }
  return (
    <div>
      <div>{supply.supply.name} - {supply.supply.hp} - {supply.quantity}</div>
      <div>{supply.supply.description}</div>
      <button onClick={() => onThrowAway(supplyId)}>Throw away</button>
      <button onClick={() => onConsume(supplyId)}>Consume</button>
    </div>
  )
}

const Inventory = () => {
  const { inventory, consumeSupply, throwAwaySupply } = useDataStore();

  const [consumeSupplyModalVisible, setConsumeSupplyModalVisible] = useState<string | undefined>();
  return (
    <div className="inventory">
      <div className="weapons">
        {inventory.weapons.map(({ weapon, quantity }, index) => (
          <div key={index}>{weapon.name} - {weapon.ap} (${quantity})</div>
        ))}
      </div>
      <div className="supplies">
        {inventory.supplies.map(({ supply, quantity }, index) => (
          <div className="supply-item" key={index} onClick={() => setConsumeSupplyModalVisible(supply.id)}>
            {supply.name}
            <span style={{ color: 'green' }}>+{supply.hp}</span>
            <span style={{ color: "white" }}>[{quantity}]</span>
          </div>
        ))}
      </div>
      <Dialog
        isVisible={!!consumeSupplyModalVisible}
        message={
          <SupplyItem
            supplyId={consumeSupplyModalVisible}
            onThrowAway={(id) => {
              setConsumeSupplyModalVisible(undefined);
              id && throwAwaySupply(id);
            }}
            onConsume={(id) => {
              setConsumeSupplyModalVisible(undefined);
              id && consumeSupply(id);
            }}
          />
        }
      />
    </div>
  )
}

export default Inventory;