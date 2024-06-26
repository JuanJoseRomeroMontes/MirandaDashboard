import { createSlice } from "@reduxjs/toolkit";
import { createContact, deleteContact, fetchContact, fetchContactList, updateContact } from './contactThunk';


export const contactSlice = createSlice({
    name: "contact",
    initialState:{
        status: 'idle',
        data: {items: [], single: null},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchContactList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchContactList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = action.payload
        })
        .addCase(fetchContactList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchContact.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.single = action.payload
        })
        .addCase(fetchContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createContact.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = [...state.data.items, action.payload];
        })
        .addCase(createContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateContact.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = state.data.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data.items = state.data.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})

