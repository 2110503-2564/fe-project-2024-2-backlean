export interface ReservationItem{
    _id?: string
    resvDate: string
    massageShop: string
    massageShopName: string
    massageShopId: string
    massageShopProvince: string
    name: string
}

export interface ReservationJSON{
    count: number
    data: ReservationItem[]
}

export interface MassageShop {
    id?: string
    name: string
    picture: string
    promote: string
    description: string
    address: string
    district: string
    province: string
    postalcode: string
    tel: string
    region: string
    open_close_time: string
}

export interface MassageJSON {
    count: number
    data: MassageShop[]
}


export interface User {
    name: string;
    telephone: string;
    email: string;
    password: string;
}