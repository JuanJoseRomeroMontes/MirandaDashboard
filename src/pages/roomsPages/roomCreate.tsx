import React, { useState } from 'react';
import { Menus } from '../../components/Menus/menus';
import { Form, Label, LabelDiv } from '../../components/form'
import { createRoom } from '../../features/RoomSlice/roomThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomCreateInterface, RoomInterface } from '../../types';
import { Input } from '../../components/pagesGeneralComponents';

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
        const { name, value, type, ariaChecked } = e.target; //Funciona a pesar de que da problema con los tipos
        setForm(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? ariaChecked : value
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

        const newRoom:RoomCreateInterface = {
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
                    <Label $margin={"10px 0 10px 30%"}>
                        Room Number:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="number"
                            name="roomNumber"
                            value={form.roomNumber}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <Label $margin={"10px 0 10px 30%"}>
                        Room Type:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="text"
                            name="roomType"
                            value={form.roomType}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <Label $margin={"10px 0 10px 30%"}>
                        Description:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <LabelDiv $margin={"10px 0 10px 30%"}>
                        Offer:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="checkbox"
                            name="offer"
                            checked={form.offer}
                            onChange={handleChange}
                        ></Input>
                    </LabelDiv>
                    <Label $margin={"10px 0 10px 30%"}>
                        Price:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 0 0 1%"}
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <Label $margin={"10px 0 10px 30%"}>
                        Discount:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="number"
                            name="discount"
                            min="1"
                            max="100"
                            value={form.discount}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <Label $margin={"10px 0 10px 30%"}>
                        Cancellation:
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                            type="text"
                            name="cancellation"
                            value={form.cancellation}
                            onChange={handleChange}
                            required
                        ></Input>
                    </Label>
                    <LabelDiv $margin={"10px 0 10px 30%"}>
                        Amenities:
                        {amenitiesList.map((amenity, index) => (
                            <div key={index} style={{width:"25%"}}>
                                <label>
                                    <Input $width={"auto"} $padding={"8px 10px"} $margin={"10px 0 10px 30%"}
                                        type="checkbox"
                                        name="amenities"
                                        value={amenity}
                                        checked={form.amenities.includes(amenity)}
                                        onChange={handleAmenitiesChange}
                                    ></Input>
                                    {amenity}
                                </label>
                            </div>
                        ))}
                    </LabelDiv>
                    <button type="submit">Submit</button>
            </Form>
        </Menus>
    );
};