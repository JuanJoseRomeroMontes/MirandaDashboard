import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest } from '../../utils'
import { BookingCreateInterface, BookingInterface } from "../../types";
import { toast } from "react-toastify";

export const fetchBookingList = createAsyncThunk("booking/fetchBookingList", async (): Promise<BookingInterface[]> => {
    try{
        const data = await APIRequest("booking");
        return data.bookings as BookingInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchBooking = createAsyncThunk("booking/fecthBooking", async (id:string): Promise<BookingInterface> => {
    try{
        const booking = await APIRequest(`booking/${id}`);
        if (!booking)
                throw('Failed to fecth booking');
        return booking.booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (booking:BookingCreateInterface): Promise<BookingInterface> => {
    try{
        const bookingAPI = await APIRequest(`booking`, 'POST', {"booking": booking, "roomId": booking.roomId});
        toast.success('Booking created sucessfully')
        return bookingAPI.booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async (booking:BookingInterface): Promise<BookingInterface> => {
    try{
        const bookingAPI = await APIRequest(`booking/${booking._id}`, 'PATCH', booking);
        toast.success('Booking updated sucessfully')
        return bookingAPI.booking as BookingInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id:string): Promise<string> => {
    try{
        const booking = await APIRequest(`booking/${id}`, 'DELETE');
        toast.success('Booking deleted sucessfully')
        return booking.booking._id as string;
    }
    catch(error){
        throw new Error;
    }
})