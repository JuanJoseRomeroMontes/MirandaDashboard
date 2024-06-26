import React, { useState } from 'react';
import rooms from '../data/roomsData.json';
import { Menus } from '../components/Menus/menus';

export const RoomCreatePage = () => {
    const [form, setForm] = useState({
        roomType: '',
        roomNumber: '',
        description: '',
        offer: false,
        price: '',
        discount: '',
        cancellation: '',
        amenities: []
    });

    const amenitiesList = ['WiFi', 'TV', 'Minibar', 'Air Conditioning', 'Room Service'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;
        setForm(prevState => {
            const amenities = checked
                ? [...prevState.amenities, value]
                : prevState.amenities.filter(am => am !== value);
            return { ...prevState, amenities };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la sumisión del formulario, por ejemplo, enviándolo a una API
        console.log('Formulario enviado:', form);
    };

    return (
        <Menus title="Room Create">
            <h1>CreateRoom</h1>
        </Menus>
    );
};

/*
<form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Room Type:
                        <input
                            type="text"
                            name="roomType"
                            value={form.roomType}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Room Number:
                        <input
                            type="number"
                            name="roomNumber"
                            value={form.roomNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Offer:
                        <input
                            type="checkbox"
                            name="offer"
                            checked={form.offer}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
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
                    </label>
                </div>
                <div>
                    <label>
                        Cancellation:
                        <textarea
                            name="cancellation"
                            value={form.cancellation}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
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
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
*/