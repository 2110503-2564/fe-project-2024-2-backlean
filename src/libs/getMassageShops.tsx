export default async function getMassageShops()
{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massageshops/?timestamp=${new Date().getTime()}`);
    if(!response.ok)
    {
        throw new Error("Failes to fetch shops")
    }
    return await response.json()
}