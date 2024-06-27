import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUser, fetchUserList, updateUser } from './userThunk';


export const userSlice = createSlice({
    name: "user",
    initialState:{
        status: 'idle',
        items: [],
        single: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchUserList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = action.payload
        })
        .addCase(fetchUserList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.single = state.items.find(i => i.id === action.payload)
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = [...state.items, action.payload];
        })
        .addCase(createUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = state.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})