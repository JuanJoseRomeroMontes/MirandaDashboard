export interface BookingInterface {
    fullName: string;
    _id:string;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:string;
    roomType:string;
    roomNumber:number;
    status:string;
}

export interface BookingCreateInterface {
    fullName: string;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:string;
    status:string;
}

export type BookingProperties = 'fullName' | '_id' | 'bookDate' | 'checkIn' | 'checkOut' | 'specialRequest' | 'roomId' | 'roomType' |
                                'roomNumber' | 'status';

export interface ContactInterface {
    date:string;
    client: {
        name:string;
        email:string;
        phone:string;
    };
    _id:string;
    subject:string;
    comment:string;
    archived:boolean
}

export type ContactProperties = 'date' | '_id' | 'subject' | 'comment' | 'archived' | 'client';

export interface EmployeeInterface {
    _id:string;
    name:string;
    email:string;
    phone:string;
    photo:string;
    positionName:string,
    positionDescription:string,
    date:string;
    status:boolean;
    password:string
}

export type EmployeeProperties = 'name' | '_id' | 'email' | 'phone' | 'photo' | 'date' | 'status' | 'password' | 'positionName' | 'positionDescription';

export interface RoomInterface {
    _id:string;
    roomNumber:number;
    availability: boolean;
    roomType:string;
    description:string;
    offer:boolean;
    price:number;
    discount:number;
    cancellation:string;
    amenities: string[];
    photosArray: string[]
}

export type RoomProperties =    '_id' | 'roomNumber' | 'availability' | 'roomType' | 'description' | 'offer' | 'price' | 'discount' | 
                                'cancellation' | 'amenities' | 'photosArray';
