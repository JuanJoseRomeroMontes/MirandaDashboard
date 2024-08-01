import { useEffect } from 'react';
import { Menus } from '../../components/Menus/menus';
import { fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { fetchRoom } from '../../features/RoomSlice/roomThunk';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const BookingInfoPage = () => {
    const bookingData = useAppSelector((state) => state.bookingSlice.single);
    const roomData = useAppSelector((state) => state.roomSlice.single);
    const { id = "" } = useParams(); //In case there is an error with the param, it will use "" by default.
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchBooking(id)).unwrap;
        }
        
        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if(bookingData)
                await dispatch(fetchRoom(bookingData.roomId)).unwrap;
        }
        
        fetch();
    }, [bookingData])

    //Checkear si bookingData o roomData es null

    if(bookingData === null || roomData === null)
        return(<>
            <Menus title="Booking Info">
                <h1>Loading...</h1>
            </Menus>
        </>)

    return(
        <>
            <Menus title="Booking Info">
                <div>
                    <p>Client full name: {bookingData.fullName}</p>
                    <p>Id de la reserva: {bookingData._id}</p>
                    <p>Check in: {bookingData.checkIn}</p>
                    <p>Check out: {bookingData.checkOut}</p>
                    <p>Room info: {roomData.cancellation}</p>
                    <p>Price: {roomData.price+"€/nigth"}</p>
                    <p>Special request: {bookingData.specialRequest}</p>
                    <p>Amenities: {roomData.amenities}</p>
                </div>
                <div>
                    <p>Carrousel de fotos</p>
                    <p>Roomtype: {roomData.roomType}</p>
                    <p>Description: {roomData.description}</p>
                    <p>State: {roomData.availability ? "available" : "not availale"}</p>
                </div>
            </Menus>
        </>
    )
};