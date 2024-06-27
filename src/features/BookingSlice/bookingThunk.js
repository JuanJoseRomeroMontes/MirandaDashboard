import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import { delay } from '../../utils'

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
        await delay()
        return id;
    }
    catch(error){
        return data;
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (booking) => {
    try{
        await delay()
        return booking;
    }
    catch(error){
        return error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking) => {
    try{
        await delay()
        return booking;
    }
    catch(error){
        return error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id) => {
    try{
        await delay()
        return id;
    }
    catch(error){
        return error;
    }
})