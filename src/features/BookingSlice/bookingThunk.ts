import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import { BookingCompleteInterface, delay } from '../../utils'

export const fetchBookingList = createAsyncThunk<BookingCompleteInterface[]>("booking/fetchBookingList", async () => {
    try{
        const data = await delay(bookingsData);
        return data as BookingCompleteInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchBooking = createAsyncThunk<number>("booking/fecthBooking", async (id:number|void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})

export const createBooking = createAsyncThunk<BookingCompleteInterface>("booking/createBooking", async (booking:BookingCompleteInterface|void) => {
    try{
        await delay(null)
        return booking as BookingCompleteInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateBooking = createAsyncThunk<BookingCompleteInterface>("booking/updateBooking", async (booking:BookingCompleteInterface|void) => {
    try{
        await delay(null)
        return booking as BookingCompleteInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteBooking = createAsyncThunk<number>("booking/deleteBooking", async (id:number|void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})