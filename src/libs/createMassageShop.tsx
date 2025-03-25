import { MassageShop } from "../../interfaces";

export async function createMassageShop(token: string, item: MassageShop) {
  const { id, ...open_close_time} = item; 

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(open_close_time),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Failed to Add Massage Shop: ${JSON.stringify(data)}`);
  return data;
}