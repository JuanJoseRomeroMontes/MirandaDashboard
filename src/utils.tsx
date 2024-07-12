export const delay =(data:any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

export function checkDay(checkIn:string, checkOut:string):string{
    let roomState = "No state";
    const date = new Date();

    const checkInDate:Date = convertStringToDate(checkIn);
    const checkOutDate:Date = convertStringToDate(checkOut);

    if (date < checkInDate) 
        roomState = "In progress"
    else if (date > checkOutDate) 
        roomState = "Check out"
    else 
        roomState = "Check in" 

    return roomState;
}

export function convertStringToDate(stringDate:string):Date{
    const dateSplit = stringDate.split('-');
    //Javascript months are indexed from 0, thats why they are substracted 1
    return new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]));
}