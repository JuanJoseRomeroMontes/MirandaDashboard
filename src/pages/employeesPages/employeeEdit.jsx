import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useNavigate, useParams } from 'react-router';
import { fetchUser, updateUser } from '../../features/UserSlice/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const EmployeeEditPage = () => {
    const data = useSelector((state) => state.userSlice.single);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setform] = useState({
        name: 'TEST',
        email: 'test@gmail.com',
        phone: '123456789',
        positionName: 'tester',
        positionDescription: 'test things',
        date: '2000-01-01',
        status: true,
        password: 'testing092'
    });

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchUser(+id)).unwrap;
        }
        
        fetch();
    })

    useEffect(() => {
        if(data != null)
            setform({
                name: data.name,
                email: data.email,
                phone: data.phone,
                positionName: data.position.name,
                positionDescription: data.position.description,
                date: data.date,
                status: data.status,
                password: data.password
            })
    }, [data])

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setform({
        ...form,
        [name]: type === 'checkbox' ? checked : value
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            id: +id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            photo: 'https://www.shutterstock.com/image-vector/grunge-red-work-process-square-260nw-1035090301.jpg',
            position: {
                name: form.positionName,
                description: form.positionDescription,
            },
            date: form.date,
            status: form.status,
            password: form.password,
        }

        dispatch(updateUser(newEmployee));
        navigate(-1);
    };

    return(
        <>
            <Menus title="Employee Edit">
                <Form onSubmit={handleSubmit}>
                        <Label>
                            Name:
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required 
                            />
                        </Label>
                        <Label>
                            Email:
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required 
                            />                        
                        </Label>
                        <Label>
                            Phone:
                            <input 
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required 
                            />
                        </Label>
                        <Label>
                            Position name:
                            <input 
                                type="text"
                                id="positionName"
                                name="positionName"
                                value={form.positionName}
                                onChange={handleChange}
                                required  
                            />
                        </Label>
                        <Label>
                            Position description:
                            <textarea 
                                id="positionDescription"
                                name="positionDescription"
                                value={form.positionDescription}
                                onChange={handleChange}
                                required 
                            />                        
                        </Label>
                        <Label>
                            Date:
                            <input 
                                type="date"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required 
                            />
                        </Label>
                        <Label>
                            Status:
                            <input 
                                type="checkbox"
                                id="status"
                                name="status"
                                checked={form.status}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            Password:
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
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