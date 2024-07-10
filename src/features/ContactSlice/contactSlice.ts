import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createContact, deleteContact, fetchContact, fetchContactList, updateContact } from './contactThunk';
import { ContactInterface } from "../../utils";

// Define a type for the slice state
interface CounterState {
    status:string,
    items:ContactInterface[],
    single:ContactInterface | undefined,
    error:any,
}

// Define the initial state using that type
const initialState: CounterState = {
    status: 'idle',
    items: [],
    single: undefined,
    error: null,
}

export const contactSlice = createSlice({
    name: "contact",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchContactList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchContactList.fulfilled, (state, action:PayloadAction<ContactInterface[]>) => {
            state.status = 'fulfilled'
            state.items = action.payload
        })
        .addCase(fetchContactList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchContact.fulfilled, (state, action:PayloadAction<number>) => {
            state.status = 'fulfilled'
            state.single = state.items.find(i => i.id === action.payload)
        })
        .addCase(fetchContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createContact.fulfilled, (state, action:PayloadAction<ContactInterface>) => {
            state.status = 'fulfilled'
            state.items = [...state.items, action.payload];
        })
        .addCase(createContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateContact.fulfilled, (state, action:PayloadAction<ContactInterface>) => {
            state.status = 'fulfilled'
            state.items = state.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteContact.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteContact.fulfilled, (state, action:PayloadAction<number>) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteContact.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})

