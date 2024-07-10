import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import { BookingCompleteInterface, delay } from '../../utils'

export const fetchBookingList = createAsyncThunk("booking/fetchBookingList", async () => {
    try{
        const data = await delay(bookingsData);
        return data as BookingCompleteInterface[];
    }
    catch(error){
        return error;
    }
})

export const fetchBooking = createAsyncThunk("booking/fecthBooking", async (id:number) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        return error;
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (booking:BookingCompleteInterface) => {
    try{
        await delay(null)
        return booking as BookingCompleteInterface;
    }
    catch(error){
        return error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking:BookingCompleteInterface) => {
    try{
        await delay(null)
        return booking as BookingCompleteInterface;
    }
    catch(error){
        return error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id:number) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        return error;
    }
})