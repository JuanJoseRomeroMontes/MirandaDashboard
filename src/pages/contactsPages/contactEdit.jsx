
import { Menus } from '../../components/Menus/menus';
import { Form, Label } from '../../components/form'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchContact, updateContact } from '../../features/ContactSlice/contactThunk';

export const ContactEditPage = () => {
    const data = useSelector((state) => state.contactSlice.single);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataSlice = useSelector((state) => state.contactSlice.items);
    const [form, setform] = useState({
        name: 'test',
        email: 'test@gmail.com',
        phone: '123456789',
        subject: 'subject',
        comment: 'comment',
        date: '2000-01-01',
        archived: false,
    });

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchContact(+id)).unwrap;
        }
        
        fetch();
    })

    useEffect(() => {
        if(data != null)
            setform({
                name: data.client.name,
                email: data.client.email,
                phone: data.client.phone,
                subject: data.subject,
                comment: data.comment,
                date: data.date,
                archived: data.archived,
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

        dispatch(updateContact(newContact));
        navigate(-1);
    };

    return(
        <>
            <Menus title="Edit Contact">
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
                            Archived:
                            <input 
                                type="checkbox"
                                id="archived"
                                name="archived"
                                checked={form.archived}
                                onChange={handleChange}
                            />
                        </Label>
                        <button type="submit">Submit</button>
                </Form>
            </Menus>
        </>
    )
};