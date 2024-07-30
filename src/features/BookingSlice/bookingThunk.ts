import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import { APIRequest, delay } from '../../utils'
import { BookingInterface } from "../../types";

export const fetchBookingList = createAsyncThunk("booking/fetchBookingList", async (): Promise<BookingInterface[]> => {
    try{
        const data: BookingInterface[] = await APIRequest("booking");
        return data as BookingInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchBooking = createAsyncThunk("booking/fecthBooking", async (id:number): Promise<BookingInterface> => {
    try{
        const booking = await APIRequest(`booking/${id}`);
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
        const booking = await APIRequest(`booking`, 'POST'); //{"booking": booking, "roomId": booking.roomId}
        return booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking:BookingInterface): Promise<BookingInterface> => {
    try{
        const booking = await APIRequest(`booking`, 'PATCH'); //{"booking": booking}
        return booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id:number): Promise<number> => {
    try{
        const booking = await APIRequest(`booking/${id}`, 'DELETE');
        return booking._id as number;
    }
    catch(error){
        throw new Error;
    }
})