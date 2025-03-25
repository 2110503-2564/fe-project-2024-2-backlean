'use client';

import { useState } from "react";
import MassageShopCard from "./MassageShopCard";
import { MassageShop, MassageJSON } from "../../interfaces";

export default function MassageShopsCatalog({ massageJSON }: { massageJSON: MassageJSON }) {
  const [shops, setShops] = useState<MassageShop[]>(massageJSON.data);

  const handleDelete = (deletedId: string) => {
    setShops((prev) => prev.filter((shop) => shop.id !== deletedId));
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap"
    }}>
      {shops.map((massageItem) => (
        <MassageShopCard
          key={massageItem.id}
          shopName={massageItem.name}
          imgSrc={massageItem.picture}
          promote={massageItem.promote}
          description={massageItem.description}
          location={massageItem.address}
          tel={massageItem.tel}
          hours={massageItem.open_close_time}
          province={massageItem.province}
          id={massageItem.id || ""}
          onDelete={() => handleDelete(massageItem.id || "")}
        />
      ))}
    </div>
  );
}
