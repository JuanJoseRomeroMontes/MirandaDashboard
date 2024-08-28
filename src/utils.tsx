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
    const body = bodyData ? JSON.stringify(bodyData) : undefined;
    let response;

    try {
        response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: body,
        })
    } catch (error) {
        toast.error('Connection error, please check your internet conection and try again.');
        return;
    }

    if([401,403].includes(response.status))
    {
        toast.error('Fatal error, reinitializing page...');
        localStorage.removeItem('AUTH_KEY');
        window.location.reload();
    } else if(!response.ok){
        const json = await response.json();
        throw new Error(json.message);
        //throw new Error(response.statusText);
    }

    const json = await response.json();
    return json;
}

export const mockData = {"month":1,"bookings":8023,"occupation":50,"checkIns":152,"checkOuts":257};

export const mockComments = [
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      "userName": "Kusnaidi Anderson",
      "timestamp": "2024-08-15T08:30:00Z"
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      "userName": "Bella Saphira",
      "timestamp": "2024-08-19T15:25:00Z"
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      "userName": "Thomas Al-Ghazali",
      "timestamp": "2024-08-23T12:00:00Z"
    }
]

export const getTimeDifference = (timestamp: number): string => {
    const now = new Date().getTime() as number;
    const then = new Date(timestamp).getTime() as number;
    const differenceInMs = now - then;
    const differenceInHours = Math.floor(differenceInMs / 3600000);
    let returnValue:string;

    if(differenceInHours > 24)
        returnValue = Math.floor(differenceInHours/24)+"d";
    else
        returnValue = differenceInHours+"h"


    return returnValue;
};