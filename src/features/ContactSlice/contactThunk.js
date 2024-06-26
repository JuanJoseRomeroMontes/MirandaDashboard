import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';

function delay(data){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

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
        let data = await delay(commentsData.find(i => i.id === id));
        return data;
    }
    catch(error){
        return data;
    }
})

export const createContact = createAsyncThunk("contact/createContact", async (contact) => {
    try{
        return contact;
    }
    catch(error){
        return error;
    }
})

export const updateContact = createAsyncThunk("contact/updateContact", async (contact) => {
    try{
        return contact;
    }
    catch(error){
        return error;
    }
})

export const deleteContact = createAsyncThunk("Contact/deleteContact", async (id) => {
    try{
        return id;
    }
    catch(error){
        return error;
    }
})