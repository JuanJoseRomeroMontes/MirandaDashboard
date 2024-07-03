import { useEffect } from 'react';
import { Menus } from '../../components/Menus/menus';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { fetchRoom } from '../../features/RoomSlice/roomThunk';
import { useParams } from 'react-router';

export const BookingInfoPage = () => {
    const bookingData = useSelector((state) => state.bookingSlice.single);
    const roomData = useSelector((state) => state.roomSlice.single);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchBooking(+id)).unwrap;
        }
        
        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if(bookingData)
                await dispatch(fetchRoom(+bookingData.roomId)).unwrap;
        }
        
        fetch();
    }, [bookingData])

    return(
        <>
            <Menus title="Booking Info">
                <div>
                    <p>Client full name: {bookingData === null ? "" : bookingData.fullName}</p>
                    <p>Id de la reserva: {bookingData === null ? "" : bookingData.id}</p>
                    <p>Check in: {bookingData === null ? "" : bookingData.checkIn}</p>
                    <p>Check out: {bookingData === null ? "" : bookingData.checkOut}</p>
                    <p>Room info: {roomData === null ? "" : roomData.cancellation}</p>
                    <p>Price: {roomData === null ? "" : roomData.price+"€/nigth"}</p>
                    <p>Special request: {bookingData === null ? "" : bookingData.specialRequest}</p>
                    <p>Amenities: {roomData === null ? "" : roomData.amenities}</p>
                </div>
                <div>
                    <p>Carrousel de fotos</p>
                    <p>Roomtype: {roomData === null ? "" : roomData.roomType}</p>
                    <p>Description: {roomData === null ? "" : roomData.description}</p>
                    <p>State: {roomData === null ? "" : roomData.availability ? "available" : "not availale"}</p>
                </div>
            </Menus>
        </>
    )
};