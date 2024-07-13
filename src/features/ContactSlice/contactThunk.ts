import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';
import { delay } from '../../utils'
import { ContactInterface } from "../../types";

export const fetchContactList = createAsyncThunk<ContactInterface[]>("contact/fetchContactList", async () => {
    try{
        const data = await delay(commentsData);
        return data as ContactInterface[];
    }
    catch(error){
        throw new Error('Failed to fetch contact list');
    }
})

export const fetchContact = createAsyncThunk("contact/fecthContact", async (id:number): Promise<ContactInterface> => {
    try{
        const contactId:number = await delay(id) as number;
        const contact: ContactInterface | undefined = commentsData.find(contact => contact.id === contactId);
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
        await delay(null)
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to create contact');
    }
})

export const updateContact = createAsyncThunk("contact/updateContact", async (contact:ContactInterface): Promise<ContactInterface> => {
    try{
        await delay(null)
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error('Failed to update contact');
    }
})

export const deleteContact = createAsyncThunk("Contact/deleteContact", async (id:number): Promise<number> => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error('Failed to delete contact');
    }
})