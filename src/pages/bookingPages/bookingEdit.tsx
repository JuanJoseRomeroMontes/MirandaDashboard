import { useEffect, useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { updateBooking, fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookingInterface } from '../../types';
import { getStatus } from '../../utils';

export const BookingEditPage = () => {
    const data = useAppSelector((state) => state.bookingSlice.single);
    const { id = 0 } = useParams(); //In case there is an error with the param, it will use 0 by default.
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: 'ChangedName',
        bookDate: '2000-01-01',
        checkIn: '2024-06-01',
        checkOut: '2024-06-30',
        specialRequest: 'ChangedRequest',
        roomId: 0,
    });

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchBooking(+id)).unwrap;
        }
        
        fetch();
    })

    useEffect(() => {
        if(data != null)
            setForm({
                fullName: data.fullName,
                bookDate: data.bookDate,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                specialRequest: data.specialRequest,
                roomId: data.roomId,
        })
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bookingId = +id;
        const dateTemp = new Date();
        const currentDate = `${dateTemp.getFullYear()}-${(dateTemp.getMonth() + 1).toString().padStart(2, '0')}-${dateTemp.getDate().toString().padStart(2, '0')}`;

        const newBooking:BookingInterface = {
            "fullName": form.fullName,
            "id": bookingId,
            "bookDate": currentDate,
            "checkIn": form.checkIn,
            "checkOut": form.checkOut,
            "specialRequest": form.specialRequest,
            "roomId": +form.roomId,
            "roomNumber": 99,
            "roomType": "Temp",
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