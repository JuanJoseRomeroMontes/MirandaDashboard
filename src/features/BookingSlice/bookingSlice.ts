import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBooking, deleteBooking, fetchBooking, fetchBookingList, updateBooking } from './bookingThunk';
import { BookingInterface } from "../../types";

// Define a type for the slice state
interface BookingState {
    status:string,
    items:BookingInterface[],
    single:BookingInterface | null,
    error:any,
}

// Define the initial state using that type
const initialState: BookingState = {
    status: 'idle',
    items: [],
    single: null,//{bookDate:"", checkIn:"", checkOut:"", fullName:"", id:-1, roomId:-1, roomNumber:-1, roomType:"", specialRequest:"", status:""},
    error: null,
}

export const bookingSlice = createSlice({
    name: "booking",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchBookingList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchBookingList.fulfilled, (state, action:PayloadAction<BookingInterface[]>) => {
            state.status = 'fulfilled';
            state.items = action.payload;
        })
        .addCase(fetchBookingList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchBooking.fulfilled, (state, action:PayloadAction<BookingInterface>) => {
            state.status = 'fulfilled'
            state.single = action.payload
        })
        .addCase(fetchBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createBooking.fulfilled, (state, action:PayloadAction<BookingInterface>) => {
            state.status = 'fulfilled'
            state.items = [...state.items, action.payload];
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateBooking.fulfilled, (state, action:PayloadAction<BookingInterface>) => {
            state.status = 'fulfilled'
            state.items = state.items.map(i => i._id === action.payload._id ? action.payload : i);
        })
        .addCase(updateBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteBooking.fulfilled, (state, action:PayloadAction<string>) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i._id !== action.payload);
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})