import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createContact } from '../../features/ContactSlice/contactThunk';

export const ContactCreatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataSlice = useSelector((state) => state.contactSlice.items);
    const [form, setform] = useState({
        name: 'test',
        email: 'test@gmail.com',
        phone: '123456789',
        subject: 'subject',
        comment: 'comment',
    });

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setform({
        ...form,
        [name]: type === 'checkbox' ? checked : value
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const commentId = dataSlice.length;
        const dateTemp = new Date();
        const currentDate = `${dateTemp.getFullYear()}-${(dateTemp.getMonth() + 1).toString().padStart(2, '0')}-${dateTemp.getDate().toString().padStart(2, '0')}`;

        const newContact = {
            date: currentDate,
            client: {
                name: form.name,
                email: form.email,
                phone: form.phone,
            },
            id: commentId,
            subject: form.subject,
            comment: form.comment,
            archived: false,
        }

        dispatch(createContact(newContact));
        navigate(-1);
    };

    return(
        <>
            <Menus title="Create Contact">
                <Form onSubmit={handleSubmit}>
                        <Label>
                            Client Name:
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
                            Client Email:
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
                            Client Phone:
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
                            Subject:
                            <input 
                                type="text"
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required  
                            />
                        </Label>
                        <Label>
                            Comment:
                            <textarea 
                                id="comment"
                                name="comment"
                                value={form.comment}
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