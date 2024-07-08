import { useEffect, useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking, fetchBooking } from '../../features/BookingSlice/bookingThunk';
import { useNavigate, useParams } from 'react-router';

export const BookingEditPage = () => {
    const data = useSelector((state) => state.bookingSlice.single);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: 'ChangedName',
        bookDate: '2000-01-01',
        checkIn: '2024-06-01',
        checkOut: '2024-06-30',
        specialRequest: 'ChangedRequest',
        roomId: '0',
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingId = +id;
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