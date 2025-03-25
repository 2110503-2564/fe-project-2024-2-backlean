export default async function deleteMassageShop(id: string, token: string) {
    console.log("Token:", token); 

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        console.log("Token:", token); 
        if (response.status === 401) {
            throw new Error("Token expired or invalid. Please log in again.");
        }

        throw new Error("Failed to delete reservation");
    }

    return await response.json();
}
