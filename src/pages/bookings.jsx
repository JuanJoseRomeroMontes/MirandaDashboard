import bookings from '../data/bookingsData.json';
import rooms from '../data/roomsData.json';
import { Menus } from '../components/Menus/menus';
import { Table } from '../components/Tables/Table';
import { useState } from 'react';
import { Guest, RoomStatus, SpecialRequest, DeleteBookingData } from '../components/Tables/BookingTableComponents';
import styled from 'styled-components';

const RequestPopUp = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 99;
    background-color: #80808050;
    display: ${(props) => (props.$display ? "flex" : "none")};
    align-items: center;
    justify-content: center;

    div{
        padding: 15px;
        width: fit-content;
        background-color: white;
        min-width: 250px;
        text-align: center;
    }
`;

export const BookingsPage = () => {
    const [bookingData, setBookingData] = useState(() => {
        const data = [];

        bookings.forEach(element => {
            const modifiedElement = { ...element };
            const bookedRoom = rooms.find(room => room.id === modifiedElement.roomId);
            
            modifiedElement.roomType = bookedRoom.roomType;
            modifiedElement.roomNumber = bookedRoom.roomNumber;
            modifiedElement.status = CheckDay(modifiedElement.checkIn, modifiedElement.checkOut);

            data.push(modifiedElement)
        });

        return data;
    })

    const [dataTemp, setDataTemp] = useState(...bookingData)

    const [popUpMessage, setpopUpMessage] = useState("");

    const ShowPopUp = (message) => {
        setpopUpMessage(message)
    }

    const DeleteData = (idToFilter) => {
        const FilteredData = [...bookingData].filter(booking => booking.id !== idToFilter);
        console.log(FilteredData)
        setBookingData(FilteredData)
        setDataTemp(FilteredData)
    }

    const columns = [
        { header: 'Guest', render: (row) => <Guest fullName={row.fullName} bookingId={row.id} />, },
        { header: 'Order Date', render: (row) => <p>{row.bookDate}</p>, },
        { header: 'Check In', render: (row) => <p>{row.checkIn}</p>, },
        { header: 'Check Out', render: (row) => <p>{row.checkOut}</p>, },
        { header: 'Special Request', render: (row) => <SpecialRequest message={row.specialRequest} showPopUp={ShowPopUp}/>, },
        { header: 'Room Type', render: (row) => <p>{row.roomType}</p>, },
        { header: 'Status', render: (row) => <RoomStatus status={row.status}/>, },
        { header: '',  render: (row) => <DeleteBookingData id={row.id} deleteFunc={DeleteData}/>, },
    ];

    return(
        <>
            <Menus title="Bookings">
                <h1>Bookings</h1>
                <Table data={bookingData} columns={columns} />
                
            </Menus>
            <RequestPopUp $display={popUpMessage!==""} onClick={() => {setpopUpMessage("")}}><div>{popUpMessage}</div></RequestPopUp>
        </>
    )
};

function CheckDay(checkIn, checkOut){
    let roomState = null;
    const date = new Date();
    const checkInParts = checkIn.split('-');
    const checkOutParts = checkOut.split('-');

    const checkInDate = new Date(parseInt(checkInParts[0]), parseInt(checkInParts[1])-1, parseInt(checkInParts[2])); // Meses en JavaScript son indexados desde 0, por eso le resto 1
    const checkOutDate = new Date(parseInt(checkOutParts[0]), parseInt(checkOutParts[1])-1, parseInt(checkOutParts[2]));

    if (date < checkInDate) 
        roomState = 'In progress'
    else if (date > checkOutDate) 
        roomState = 'Check out'
    else 
        roomState = 'Check in' 

    return roomState;
}