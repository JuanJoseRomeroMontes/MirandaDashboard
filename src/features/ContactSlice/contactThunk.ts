import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';
import { APIRequest, delay } from '../../utils'
import { ContactInterface } from "../../types";

export const fetchContactList = createAsyncThunk<ContactInterface[]>("contact/fetchContactList", async () => {
    try{
        const data = await APIRequest("contact");
        return data as ContactInterface[];
    }
    catch(error){
        throw new Error('Failed to fetch contact list');
    }
})

export const fetchContact = createAsyncThunk("contact/fecthContact", async (id:number): Promise<ContactInterface> => {
    try{
        const contact = await APIRequest(`contact/${id}`);
        if (!contact) 
            throw('Failed to fecth contact');
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to fecth contact');
    }
})

export const createContact = createAsyncThunk("contact/createContact", async (contact:ContactInterface): Promise<ContactInterface> => {
    try{
        const contact = await APIRequest(`contact`, 'POST'); //{"contact": contact}
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to create contact');
    }
})

export const updateContact = createAsyncThunk("contact/updateContact", async (contact:ContactInterface): Promise<ContactInterface> => {
    try{
        const contact = await APIRequest(`contact`, 'PATCH'); //{"contact": contact}
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to update contact');
    }
})

export const deleteContact = createAsyncThunk("Contact/deleteContact", async (id:number): Promise<number> => {
    try{
        const contact = await APIRequest(`contact/${id}`, 'DELETE');
        return contact._id as number;
    }
    catch(error){
        throw new Error('Failed to delete contact');
    }
})