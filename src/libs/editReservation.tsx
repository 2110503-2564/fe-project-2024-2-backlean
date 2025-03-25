export default async function editReservation(id:string, token:string, updatedData: {
    resvDate?: string,
    massageShopName?: string,
    massageShopProvince?: string
})
{
    console.log(updatedData.massageShopProvince)
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData)
    })
    console.log(updatedData.massageShopProvince)

    if(!response.ok)
    {
        throw new Error("Failed to edit reservation")
    }
    return await response.json()
}