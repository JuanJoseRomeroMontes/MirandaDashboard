import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';

function delay(data){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

export const fetchBookingList = createAsyncThunk("booking/fetchBookingList", async () => {
    try{
        const data = await delay(bookingsData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchBooking = createAsyncThunk("booking/fecthBooking", async (id) => {
    try{
        let data = await delay(bookingsData.find(i => i.id === id));
        return data;
    }
    catch(error){
        return data;
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (booking) => {
    try{
        return booking;
    }
    catch(error){
        return error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking) => {
    try{
        return booking;
    }
    catch(error){
        return error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id) => {
    try{
        return id;
    }
    catch(error){
        return error;
    }
})