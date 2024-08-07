import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, fetchRoom, fetchRoomList, updateRoom } from './roomThunk';
import { RoomInterface } from "../../types";

// Define a type for the slice state
interface RoomState {
    status:string,
    items:RoomInterface[],
    single:RoomInterface | null,
    error:any,
}

// Define the initial state using that type
const initialState: RoomState = {
    status: 'idle',
    items: [],
    single: null,
    error: null,
}

export const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRoomList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchRoomList.fulfilled, (state, action:PayloadAction<RoomInterface[]>) => {
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
        .addCase(fetchRoom.fulfilled, (state, action:PayloadAction<RoomInterface>) => {
            state.status = 'fulfilled'
            state.single = action.payload
        })
        .addCase(fetchRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createRoom.fulfilled, (state, action:PayloadAction<RoomInterface>) => {
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
        .addCase(updateRoom.fulfilled, (state, action:PayloadAction<RoomInterface>) => {
            state.status = 'fulfilled'
            state.items = state.items.map(i => i._id === action.payload._id ? action.payload : i);
        })
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteRoom.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteRoom.fulfilled, (state, action:PayloadAction<string>) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i._id !== action.payload);
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})