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
    <div className="supply-item-modal">
      <div className="supply-item">
        {supply.supply.name}
        <span style={{ color: 'green' }}>+{supply.supply.hp} Health</span>
        <span style={{ color: "white" }}>[{supply.quantity}]</span>
      </div>
      <div className="description">{supply.supply.description}</div>
      <div className="item-actions">
        <button onClick={() => onConsume(supplyId)}>Consume</button>
        <button onClick={() => onThrowAway(supplyId)}>Throw away</button>
      </div>

    </div>
  )
}

const Inventory = () => {
  const { inventory, consumeSupply, throwAwaySupply } = useDataStore();

  const [consumeSupplyModalVisible, setConsumeSupplyModalVisible] = useState<string | undefined>();
  return (
    <div className="inventory">
      <div className="trunk-title">Trunk</div>
      <div className="weapons">
        {inventory.weapons.map(({ weapon, quantity }, index) => (
          <div className="supply-item" key={index}>
            <span style={{ color: "#0070ff" }}>{weapon.name}</span>
            <span style={{ color: "blue" }}>+{weapon.ap}</span>
            <span style={{ color: "white" }}>[{quantity}]</span>
          </div>
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
        onDismiss={() => setConsumeSupplyModalVisible(undefined)}
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