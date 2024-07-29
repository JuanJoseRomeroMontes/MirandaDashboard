import { toast } from "react-toastify";

export const delay =(data:any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

type Statuses = "In progress" | "Check in" | "Check out";

export function getStatus(checkIn:string, checkOut:string):Statuses{
    let roomState:Statuses = "Check in";
    const date = new Date();

    const checkInDate:Date = convertStringToDate(checkIn);
    const checkOutDate:Date = convertStringToDate(checkOut);

    if (date < checkInDate) 
        roomState = "In progress"
    else if (date > checkOutDate) 
        roomState = "Check out"

    return roomState;
}

export function convertStringToDate(stringDate:string):Date{
    const dateSplit = stringDate.split('-');
    //Javascript months are indexed from 0, thats why they are substracted 1
    return new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]));
}

type RequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

export async function APIRequest(endpoint:string, method:RequestMethods = 'GET', data = null){
    const url:string = `${process.env.API_URL}/${endpoint}`; //install dotenv
    const token = localStorage.getItem('AUTH_TOKEN');
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: data ?? undefined,
    })

    if(!response.ok){
        //Gestionar codigo de errores (refrescar la pagina con codigo de errores 401 y 403 borro localStorage y refresco)
        toast.error('Error in API call');
    }

    const json = await response.json();
    return json;
}