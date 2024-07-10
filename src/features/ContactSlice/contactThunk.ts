import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';
import { ContactInterface, delay } from '../../utils'

export const fetchContactList = createAsyncThunk<ContactInterface[]>("contact/fetchContactList", async () => {
    try{
        const data = await delay(commentsData);
        return data as ContactInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchContact = createAsyncThunk<number>("contact/fecthContact", async (id:number|void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})

export const createContact = createAsyncThunk<ContactInterface>("contact/createContact", async (contact:ContactInterface|void) => {
    try{
        await delay(null)
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateContact = createAsyncThunk<ContactInterface>("contact/updateContact", async (contact:ContactInterface|void) => {
    try{
        await delay(null)
        return contact as ContactInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteContact = createAsyncThunk<number>("Contact/deleteContact", async (id:number|void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})