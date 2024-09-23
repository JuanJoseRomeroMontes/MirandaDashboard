import { useEffect } from 'react';
import { Menus } from '../../components/Menus/menus';
import { fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { fetchRoom } from '../../features/RoomSlice/roomThunk';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ContainerInfo } from '../../components/pagesGeneralComponents';

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

    function getAmenities():string{
        let amenitiesString = "";

        if(roomData && roomData.amenities.length > 0)
        {
            roomData.amenities.forEach(amenity => {
                amenitiesString = amenitiesString + `${amenity}, `
            });

            amenitiesString = amenitiesString.slice(0, -2);
        }
        else
            amenitiesString = "No amenities"

        return amenitiesString;
    }

    return(
        <>
            <Menus title="Booking Info">
                <ContainerInfo>
                    <p><b>Id de la reserva:</b> {bookingData._id}</p>
                    <p><b>Client name:</b> {bookingData.fullName}</p>
                    <p><b>Check in:</b> {bookingData.checkIn}</p>
                    <p><b>Check out:</b> {bookingData.checkOut}</p>
                    <p><b>Room info:</b> {roomData.cancellation}</p>
                    <p><b>Price:</b> {roomData.price+"€/nigth"}</p>
                    <p><b>Special request:</b> {bookingData.specialRequest}</p>
                    <p><b>Amenities:</b> {getAmenities()}</p>
                    <p><b>Roomtype:</b> {roomData.roomType}</p>
                    <p><b>Description:</b> {roomData.description}</p>
                    <p><b>State:</b> {roomData.availability ? "available" : "not availale"}</p>
                    <p><b>Carrousel de fotos</b></p>
                </ContainerInfo>
            </Menus>
        </>
    )
};