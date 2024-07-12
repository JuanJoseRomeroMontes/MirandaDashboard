import React, { useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { createRoom } from '../../features/RoomSlice/roomThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomInterface } from '../../types';

interface FormState {
    roomNumber: string;
    roomType: string;
    description: string;
    offer: boolean;
    price: string;
    discount: string;
    cancellation: string;
    amenities: string[];
}

export const RoomCreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dataSlice = useAppSelector((state) => state.roomSlice.items);
    const [form, setForm] = useState<FormState>({
        roomNumber: '04',
        roomType: 'Single Bed',
        description: 'Description',
        offer: false,
        price: '1000',
        discount: '10',
        cancellation: 'No cancellation',
        amenities: []
    });

    const amenitiesList = ['WiFi', 'TV', 'Minibar', 'Air Conditioning', 'Room Service'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target; //Funciona a pesar de que da problema con los tipos
        setForm(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm(prevState => {
            const amenities = checked
                ? [...prevState.amenities, value]
                : prevState.amenities.filter(am => am !== value);
            return { ...prevState, amenities };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomId = dataSlice.length;

        const newRoom:RoomInterface = {
            "id": +roomId,
            "roomNumber": +form.roomNumber,
            "availability": true,
            "roomType": form.roomType,
            "description": form.description,
            "offer": form.offer,
            "price": +form.price,
            "discount": +form.discount,
            "cancellation": form.cancellation,
            "amenities": form.amenities,
            "photosArray": ['https://www.shutterstock.com/image-vector/grunge-red-work-process-square-260nw-1035090301.jpg', 'https://www.shutterstock.com/image-vector/grunge-red-work-process-square-260nw-1035090301.jpg', 'https://www.shutterstock.com/image-vector/grunge-red-work-process-square-260nw-1035090301.jpg']
        }

        dispatch(createRoom(newRoom));
        navigate(-1);
    };

    return (
        <Menus title="Create Room">
            <Form onSubmit={handleSubmit}>
                    <Label>
                        Room Number:
                        <input
                            type="number"
                            name="roomNumber"
                            value={form.roomNumber}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Room Type:
                        <input
                            type="text"
                            name="roomType"
                            value={form.roomType}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Offer:
                        <input
                            type="checkbox"
                            name="offer"
                            checked={form.offer}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Discount:
                        <input
                            type="number"
                            name="discount"
                            min="1"
                            max="100"
                            value={form.discount}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Cancellation:
                        <input
                            type="text"
                            name="cancellation"
                            value={form.cancellation}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        Amenities:
                        {amenitiesList.map((amenity, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="amenities"
                                        value={amenity}
                                        checked={form.amenities.includes(amenity)}
                                        onChange={handleAmenitiesChange}
                                    />
                                    {amenity}
                                </label>
                            </div>
                        ))}
                    </Label>
                    <button type="submit">Submit</button>
            </Form>
        </Menus>
    );
};