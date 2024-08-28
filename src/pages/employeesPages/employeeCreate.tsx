import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useNavigate } from 'react-router';
import { createUser } from '../../features/UserSlice/userThunk';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React from 'react'; // Importar React para usar los tipos
import { EmployeeCreateInterface } from '../../types';
import { Input, TextArea } from '../../components/pagesGeneralComponents';

interface FormState {
    name: string;
    email: string;
    phone: string;
    positionName: string;
    positionDescription: string;
    date: string;
    status: boolean;
    password: string;
}

export const EmployeeCreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dataSlice = useAppSelector((state) => state.userSlice.items);
    const [form, setform] = useState<FormState>({
        name: 'TEST',
        email: 'test@gmail.com',
        phone: '123456789',
        positionName: 'tester',
        positionDescription: 'test things',
        date: '2000-01-01',
        status: true,
        password: 'testing092'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, ariaChecked } = e.target; //Funciona a pesar de que da problema con los tipos
        setform({
            ...form,
            [name]: type === 'checkbox' ? ariaChecked : value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const employeeId = dataSlice.length;

        const newEmployee:EmployeeCreateInterface = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            photo: 'https://www.shutterstock.com/image-vector/grunge-red-work-process-square-260nw-1035090301.jpg',
            positionName: form.positionName,
            positionDescription: form.positionDescription,
            date: form.date,
            status: form.status,
            password: form.password,
        }

        dispatch(createUser(newEmployee));
        navigate(-1);
    };

    return(
        <>
            <Menus title="Create Employee">
                <Form onSubmit={handleSubmit}>
                        <Label $margin={"20px 0 20px 30%"}>
                            Name:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required 
                            ></Input>
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Email:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required 
                            ></Input>                       
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Phone:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required 
                            ></Input>
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Position name:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="text"
                                id="positionName"
                                name="positionName"
                                value={form.positionName}
                                onChange={handleChange}
                                required  
                            ></Input>
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Position description:
                            <TextArea $width={"50%"} $padding={"8px 10px"} $margin={"0 15px"}
                                id="positionDescription"
                                name="positionDescription"
                                value={form.positionDescription}
                                onChange={handleChange}
                                required 
                            ></TextArea>                       
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Date:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="date"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required 
                            ></Input>
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Status:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="checkbox"
                                id="status"
                                name="status"
                                checked={form.status}
                                onChange={handleChange}
                            ></Input>
                        </Label>
                        <Label $margin={"20px 0 20px 30%"}>
                            Password:
                            <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"}
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required 
                            ></Input>
                        </Label>
                        <button type="submit">Submit</button>
                </Form>
            </Menus>
        </>
    )
};