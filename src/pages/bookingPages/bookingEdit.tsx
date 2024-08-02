import { useEffect, useMemo, useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { updateBooking, fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookingInterface, RoomInterface } from '../../types';
import { getStatus } from '../../utils';
import { fetchRoom, fetchRoomList } from '../../features/RoomSlice/roomThunk';

export const BookingEditPage = () => {
    const bookingData = useAppSelector((state) => state.bookingSlice.single);
    const roomsData = useAppSelector((state) => state.roomSlice.items);
    const { id = "" } = useParams(); //In case there is an error with the param, it will use 0 by default.
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: 'ChangedName',
        bookDate: '2000-01-01',
        checkIn: '2024-06-01',
        checkOut: '2024-06-30',
        specialRequest: 'ChangedRequest',
        roomId: "",
    });

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchBooking(id)).unwrap;
            if(roomsData.length === 0)
                await dispatch(fetchRoomList());
        }
        fetch();
    }, [])

    const sortedRoomsData = useMemo(() => {
        const roomsCopy = [...roomsData]

        roomsCopy.sort((a,b) => {
            let value = 0;
            if(a.roomNumber < b.roomNumber)
                value = -1;
            else if(a.roomNumber > b.roomNumber)
                value = 1;

            return value;
        });

        return roomsCopy;
    }, [roomsData])

    useEffect(() => {
        if(bookingData != null)
            setForm({
                fullName: bookingData.fullName,
                bookDate: bookingData.bookDate,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                specialRequest: bookingData.specialRequest.trim(),
                roomId: bookingData.roomId,
        })
    }, [bookingData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bookingId = id;
        const dateTemp = new Date();
        const currentDate = `${dateTemp.getFullYear()}-${(dateTemp.getMonth() + 1).toString().padStart(2, '0')}-${dateTemp.getDate().toString().padStart(2, '0')}`;

        const selectedRoom:RoomInterface = sortedRoomsData.find(room => room._id === form.roomId) as RoomInterface;

        const newBooking:BookingInterface = {
            "fullName": form.fullName,
            "_id": bookingId,
            "bookDate": currentDate,
            "checkIn": form.checkIn,
            "checkOut": form.checkOut,
            "specialRequest": form.specialRequest+" ",
            "roomId": form.roomId,
            "roomNumber": selectedRoom.roomNumber,
            "roomType": selectedRoom.roomType,
            "status": getStatus(form.checkIn, form.checkOut)
        }

        dispatch(updateBooking(newBooking))
        navigate(-1);
    };

    return(
        <>
            <Menus title="Edit Booking">
                <Form onSubmit={handleSubmit}>
                    <Label>
                        Client full name:
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Book Date:
                        <input
                            type="date"
                            name="bookDate"
                            value={form.bookDate}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Check In:
                        <input
                            type="date"
                            name="checkIn"
                            value={form.checkIn}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Check Out:
                        <input
                            type="date"
                            name="checkOut"
                            value={form.checkOut}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Special request:
                        <input
                            type="text"
                            name="specialRequest"
                            value={form.specialRequest}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Room id:
                        <select
                            name="roomId"
                            value={form.roomId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a room</option>
                            {sortedRoomsData.map((room) => (
                                <option key={room._id} value={room._id}>
                                    {room.roomNumber} - {room.roomType}
                                </option>
                            ))}
                        </select>
                    </Label>
                    <button type="submit">Submit</button>
                </Form>
            </Menus>
        </>
    )
};