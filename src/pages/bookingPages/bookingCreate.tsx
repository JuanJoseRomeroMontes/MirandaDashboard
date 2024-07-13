import { useEffect, useMemo, useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { createBooking, updateBooking } from '../../features/BookingSlice/bookingThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookingInterface, RoomInterface } from '../../types';
import { getStatus } from '../../utils';
import { fetchRoomList } from '../../features/RoomSlice/roomThunk';

export const BookingCreatePage = () => {
    const roomsData = useAppSelector((state) => state.roomSlice.items);
    const dataSlice = useAppSelector((state) => state.bookingSlice.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if(roomsData.length === 0)
                await dispatch(fetchRoomList());
        }
        
        fetch();
    })

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

    const [form, setForm] = useState({
        fullName: 'Pablo',
        checkIn: '2024-06-01',
        checkOut: '2024-06-30',
        specialRequest: '',
        roomId: '11'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bookingId = dataSlice.length;
        const dateTemp = new Date();
        const currentDate = `${dateTemp.getFullYear()}-${(dateTemp.getMonth() + 1).toString().padStart(2, '0')}-${dateTemp.getDate().toString().padStart(2, '0')}`;

        const selectedRoom:RoomInterface = sortedRoomsData.find(room => room.id === +form.roomId) as RoomInterface;

        const newBooking:BookingInterface = {
            "fullName": form.fullName,
            "id": bookingId,
            "bookDate": currentDate,
            "checkIn": form.checkIn,
            "checkOut": form.checkOut,
            "specialRequest": form.specialRequest,
            "roomId": +form.roomId,
            "roomNumber": selectedRoom.roomNumber,
            "roomType": selectedRoom.roomType,
            "status": getStatus(form.checkIn, form.checkOut)
        }
        console.log(newBooking);

        dispatch(createBooking(newBooking))
        navigate(-1);
    };

    return(
        <>
            <Menus title="Create Booking">
                <Form onSubmit={handleSubmit}>
                    <Label>
                        Client full name:
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Check In:
                        <input
                            type="date"
                            name="checkIn"
                            value={form.checkIn}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Check Out:
                        <input
                            type="date"
                            name="checkOut"
                            value={form.checkOut}
                            onChange={handleChange}
                            required
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
                                <option key={room.id} value={room.id}>
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