import React, { useState } from 'react';
import { Menus } from '../../components/Menus/menus';

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