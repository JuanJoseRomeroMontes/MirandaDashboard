import { createSlice } from "@reduxjs/toolkit";
import { createBooking, deleteBooking, fetchBooking, fetchBookingList, updateBooking } from './bookingThunk';

export const bookingSlice = createSlice({
    name: "booking",
    initialState:{
        status: 'idle',
        data: {items: [], single: null},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBookingList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchBookingList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = action.payload
        })
        .addCase(fetchBookingList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.single = action.payload
        })
        .addCase(fetchBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = [...state.data.items, action.payload];
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = state.data.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteBooking.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = state.data.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})