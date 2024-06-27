import { useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../features/BookingSlice/bookingThunk';
import { useNavigate } from 'react-router';

export const BookingCreatePage = () => {
    const dataSlice = useSelector((state) => state.bookingSlice.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: 'Pablo',
        checkIn: '2024-06-01',
        checkOut: '2024-06-30',
        specialRequest: '',
        roomId: '11'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingId = dataSlice.length;
        const dateTemp = new Date();
        const currentDate = `${dateTemp.getFullYear()}-${(dateTemp.getMonth() + 1).toString().padStart(2, '0')}-${dateTemp.getDate().toString().padStart(2, '0')}`;

        const newBooking = {
            "fullName": form.fullName,
            "id": bookingId,
            "bookDate": currentDate,
            "checkIn": form.checkIn,
            "checkOut": form.checkOut,
            "specialRequest": form.specialRequest,
            "roomId": +form.roomId
        }

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
                        <input
                            type="number"
                            name="roomId"
                            value={form.roomId}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <button type="submit">Submit</button>
                </Form>
            </Menus>
        </>
    )
};