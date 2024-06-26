import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, fetchRoom, fetchRoomList, updateRoom } from './roomThunk';


export const roomSlice = createSlice({
    name: "room",
    initialState:{
        status: 'idle',
        items: [],
        single: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRoomList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchRoomList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = action.payload
        })
        .addCase(fetchRoomList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.single = state.items.find(i => i.id === action.payload)
        })
        .addCase(fetchRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = [...state.items, action.payload];
        })
        .addCase(createRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = state.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})