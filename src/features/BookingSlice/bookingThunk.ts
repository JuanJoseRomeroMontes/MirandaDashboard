import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import { delay } from '../../utils'
import { BookingInterface } from "../../types";

export const fetchBookingList = createAsyncThunk("booking/fetchBookingList", async (): Promise<BookingInterface[]> => {
    try{
        const data: BookingInterface[] = bookingsData;
        return data as BookingInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchBooking = createAsyncThunk("booking/fecthBooking", async (id:number): Promise<BookingInterface> => {
    try{
        const bookingId:number = await delay(id) as number;
        const booking: BookingInterface | undefined = bookingsData.find(booking => booking.id === bookingId);
        if (!booking) 
            throw('Failed to fecth booking');
        return booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (booking:BookingInterface): Promise<BookingInterface> => {
    try{
        await delay(null)
        return booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking:BookingInterface): Promise<BookingInterface> => {
    try{
        await delay(null)
        return booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id:number): Promise<number> => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})