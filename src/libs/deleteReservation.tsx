export default async function deleteReservation(id:string, token:string)
{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    console.log(id)

    if(!response.ok)
    {
        throw new Error("Failed to delete reservation")
    }
    return await response.json()
}