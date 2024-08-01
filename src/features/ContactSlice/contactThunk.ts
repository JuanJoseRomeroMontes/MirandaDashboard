import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest } from '../../utils'
import { ContactInterface } from "../../types";

export const fetchContactList = createAsyncThunk<ContactInterface[]>("contact/fetchContactList", async () => {
    try{
        const data = await APIRequest("contact");
        return data.contacts as ContactInterface[];
    }
    catch(error){
        throw new Error('Failed to fetch contact list');
    }
})

export const fetchContact = createAsyncThunk("contact/fecthContact", async (id:string): Promise<ContactInterface> => {
    try{
        const contact = await APIRequest(`contact/${id}`);
        if (!contact) 
            throw('Failed to fecth contact');
        return contact.contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to fecth contact');
    }
})

export const createContact = createAsyncThunk("contact/createContact", async (contact:ContactInterface): Promise<ContactInterface> => {
    try{
        const contactAPI = await APIRequest(`contact`, 'POST', contact);
        return contactAPI.contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to create contact');
    }
})

export const updateContact = createAsyncThunk("contact/updateContact", async (contact:ContactInterface): Promise<ContactInterface> => {
    try{
        const contactAPI = await APIRequest(`contact/${contact._id}`, 'PATCH', contact);
        return contactAPI.contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to update contact');
    }
})

export const deleteContact = createAsyncThunk("Contact/deleteContact", async (id:string): Promise<string> => {
    try{
        const contact = await APIRequest(`contact/${id}`, 'DELETE');
        return contact.contact._id as string;
    }
    catch(error){
        throw new Error('Failed to delete contact');
    }
})