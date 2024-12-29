import { useState } from "react";
import { useDataStore } from "../../context/DataStoreContext";
import Dialog from "../common/Dialog";

const WeaponItem = ({
  weaponId,
  onEquip,
  onThrowAway
}: {
  weaponId: string | undefined;
  onEquip: (id?: string) => void;
  onThrowAway: (id?: string) => void
}) => {
  const { inventory, player } = useDataStore();
  const weapon = inventory.weapons.find(w => w.weapon.id === weaponId);
  if (!weapon) {
    return null;
  }

  const isWeaponEquipped = player.equipped?.id === weaponId;
  return (
    <div className="supply-item-modal">
      <div className="supply-item">
        <strong style={{ color: "#0070ff" }}>{weapon.weapon.name}</strong>
        <span style={{ color: 'blue' }}>+{weapon.weapon.ap} Attack</span>
        <span style={{ color: "white" }}>[{weapon.quantity}]</span>
      </div>
      <div className="description">{weapon.weapon.description}</div>
      <div className="item-actions">
        <button onClick={() => onEquip(weaponId)}>
          {isWeaponEquipped ? "Unequip" : "Equip"}
        </button>
        <button disabled={isWeaponEquipped} onClick={() => onThrowAway(weaponId)}>Throw away</button>
      </div>
    </div>
  )
}

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
  const { player, inventory, consumeSupply, throwAwaySupply, throwAwayWeapon, equipWeapon, unequipWeapon } = useDataStore();

  const [consumeSupplyModalVisible, setConsumeSupplyModalVisible] = useState<string | undefined>();
  const [checkWeaponModalVisible, setCheckWeaponModalVisible] = useState<string | undefined>();

  return (
    <div className="inventory">
      <div className="trunk-title">Trunk</div>
      <div className="weapons">
        {inventory.weapons.map(({ weapon, quantity }, index) => (
          <div className={player.equipped?.id === weapon.id ? "supply-item equiped" : "supply-item"} key={index} onClick={() => setCheckWeaponModalVisible(weapon.id)}>
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
        isVisible={!!checkWeaponModalVisible}
        onDismiss={() => setCheckWeaponModalVisible(undefined)}
        message={
          <WeaponItem
            weaponId={checkWeaponModalVisible}
            onEquip={(id) => {
              if (id) {
                if (player.equipped?.id === id) {
                  unequipWeapon(id);
                } else {
                  equipWeapon(id);
                }
              }
            }}
            onThrowAway={(id) => {
              setCheckWeaponModalVisible(undefined);
              id && throwAwayWeapon(id);
            }}
          />
        }
      />
      <Dialog
        isVisible={!!consumeSupplyModalVisible}
        onDismiss={() => setConsumeSupplyModalVisible(undefined)}
        message={
          <SupplyItem
            supplyId={consumeSupplyModalVisible}
            onThrowAway={(id) => {
              // if this supply is the last one, close the modal
              if (inventory.supplies.find(s => s.supply.id === id)?.quantity === 1) {
                setConsumeSupplyModalVisible(undefined);
              }
              id && throwAwaySupply(id);
            }}
            onConsume={(id) => {
              if (inventory.supplies.find(s => s.supply.id === id)?.quantity === 1) {
                setConsumeSupplyModalVisible(undefined);
              }
              id && consumeSupply(id);
            }}
          />
        }
      />
    </div>
  )
}

export default Inventory;