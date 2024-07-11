export const delay =(data:any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

//#region DataStructures
function checkDay(checkIn:string, checkOut:string):string{
    let roomState = "No state";
    const date = new Date();

    const checkInDate:Date = convertStringToDate(checkIn);
    const checkOutDate:Date = convertStringToDate(checkOut);

    if (date < checkInDate) 
        roomState = 'In progress'
    else if (date > checkOutDate) 
        roomState = 'Check out'
    else 
        roomState = 'Check in' 

    return roomState;
}

function convertStringToDate(stringDate:string):Date{
    const dateSplit = stringDate.split('-');
    //Javascript months are indexed from 0, thats why they are substracted 1
    return new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]));
}

export interface BookingInterface {
    fullName: string;
    id:number;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:number;
}

export class Booking {
    fullName: string;
    id:number;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:number;

    constructor(name:string, id:number, bookDate:string, checkIn:string, checkOut:string, specialRequest:string, roomId:number){
        this.fullName = name;
        this.id = id;
        this.bookDate = bookDate;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.specialRequest = specialRequest;
        this.roomId = roomId;
    }
}

export interface BookingCompleteInterface {
    fullName: string;
    id:number;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:number;
    roomType:string;
    roomNumber:number;
    status:string;
}

export class BookingComplete {
    fullName: string;
    id:number;
    bookDate:string;
    checkIn:string;
    checkOut:string;
    specialRequest:string;
    roomId:number;
    roomType:string;
    roomNumber:number;
    status:string;

    constructor(name:string, id:number, bookDate:string, checkIn:string, checkOut:string, specialRequest:string, 
        roomId:number, roomType:string, roomNumber:number){
        this.fullName = name;
        this.id = id;
        this.bookDate = bookDate;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.specialRequest = specialRequest;
        this.roomId = roomId;
        this.roomType = roomType;
        this.roomNumber = roomNumber;
        this.status = checkDay(checkIn, checkOut)
    }
}

export interface ContactInterface {
    date:string;
    client: {
        name:string;
        email:string;
        phone:string;
    };
    id:number;
    subject:string;
    comment:string;
    archived:boolean
}

export class Contact {
    date:string;
    client: {
        name:string;
        email:string;
        phone:string;
    };
    id:number;
    subject:string;
    comment:string;
    archived:boolean

    constructor(date:string, client:{name:string, email:string, phone:string}, id:number, subject:string, comment:string, archived:boolean){
        this.date = date;
        this.client = client;
        this.id = id;
        this.subject = subject;
        this.comment = comment;
        this.archived = archived
    }
}

export interface EmployeeInterface {
    id:number;
    name:string;
    email:string;
    phone:string;
    photo:string;
    position: {
        name:string;
        description:string
    };
    date:string;
    Estatus:boolean;
    password:string
}

export class Employee {
    id:number;
    name:string;
    email:string;
    phone:string;
    photo:string;
    position: {
        name:string;
        description:string
    };
    date:string;
    Estatus:boolean;
    password:string

    constructor( id: number, name: string, email: string, phone: string, photo: string,
        position: { name: string; description: string }, date: string, status: boolean, password: string) 
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.position = position;
        this.date = date;
        this.Estatus = status;
        this.password = password;
    }
}

export interface RoomInterface {
    id:number;
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

export class Room {
    id:number;
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

    constructor( id: number, roomNumber: number,  availability: boolean, roomType: string, description: string, offer: boolean, 
        price: number, discount: number, cancellation: string, amenities: string[], photosArray: string[]) 
    {
        this.id = id;
        this.roomNumber = roomNumber;
        this.availability = availability;
        this.roomType = roomType;
        this.description = description;
        this.offer = offer;
        this.price = price;
        this.discount = discount;
        this.cancellation = cancellation;
        this.amenities = amenities;
        this.photosArray = photosArray;
    }
}
//#endregion