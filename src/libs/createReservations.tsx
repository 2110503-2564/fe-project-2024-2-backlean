import { ReservationItem } from "../../interfaces";

export async function createReservation(token: string, item: ReservationItem) {
  const { massageShopId,...massageShop} = item; 

  console.log(massageShop);

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops/${massageShopId}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(massageShop),
  });

  const data = await res.json();
  console.log(data)
  if (!res.ok) throw new Error(`Reservation failed: ${JSON.stringify(data)}`);
  return data;
}