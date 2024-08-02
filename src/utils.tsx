import { toast } from "react-toastify";

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

export type RequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

export async function APIRequest(endpoint:string, method:RequestMethods = 'GET', bodyData:any = null){
    const url:string = `${import.meta.env.VITE_API_URL}${endpoint}`;
    const token = JSON.parse(localStorage.getItem('AUTH_KEY') as string).token;
    const bodyDebug = bodyData ? JSON.stringify(bodyData) : undefined;
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: bodyDebug,
    })

    if(!response.ok){
        //Gestionar codigo de errores (refrescar la pagina con codigo de errores 401 y 403 borro localStorage y refresco)
        handleAPIErrors(response.status);
    }

    const json = await response.json();
    return json;
}

enum ApiErrorCodes {
    NotFound = 404,
    Unauthorized = 401,
    Forbidden = 403,
    BadRequest = 400,
    InternalServerError = 500
}

function handleAPIErrors(errorCode: number): void {
    switch (errorCode) {
        case ApiErrorCodes.NotFound:
            toast.error('The item you\'re looking for couldn\'t be found');
            break;
        case ApiErrorCodes.Unauthorized:
            toast.error('Fatal error, reinitializing page...');
            localStorage.removeItem('AUTH_KEY');
            window.location.reload();
            break;
        case ApiErrorCodes.Forbidden:
            toast.error('Fatal error, reinitializing page...');
            localStorage.removeItem('AUTH_KEY');
            window.location.reload();
            break;
        case ApiErrorCodes.BadRequest:
            toast.error('Invalid data, please check if you\'re not missing any mandatory field.');
            break;
        default:
            toast.error('An unexpected error ocurred, please reload your browser.');
    }
}