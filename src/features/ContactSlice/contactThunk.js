import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';
import { delay } from '../../utils'

export const fetchContactList = createAsyncThunk("contact/fetchContactList", async () => {
    try{
        const data = await delay(commentsData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchContact = createAsyncThunk("contact/fecthContact", async (id) => {
    try{
        await delay()
        return id;
    }
    catch(error){
        return data;
    }
})

export const createContact = createAsyncThunk("contact/createContact", async (contact) => {
    try{
        await delay()
        return contact;
    }
    catch(error){
        return error;
    }
})

export const updateContact = createAsyncThunk("contact/updateContact", async (contact) => {
    try{
        await delay()
        return contact;
    }
    catch(error){
        return error;
    }
})

export const deleteContact = createAsyncThunk("Contact/deleteContact", async (id) => {
    try{
        await delay()
        return id;
    }
    catch(error){
        return error;
    }
})