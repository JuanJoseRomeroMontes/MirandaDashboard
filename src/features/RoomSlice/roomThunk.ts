import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from '../../data/roomsData.json';
import { delay } from '../../utils'

export const fetchRoomList = createAsyncThunk("room/fetchRoomList", async () => {
    try{
        const data = await delay(roomsData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchRoom = createAsyncThunk("room/fecthRoom", async (id) => {
    try{
        await delay(null)
        return id;
    }
    catch(error){
        return error;
    }
})

export const createRoom = createAsyncThunk("room/createRoom", async (room) => {
    try{
        await delay(null)
        return room;
    }
    catch(error){
        return error;
    }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (room) => {
    try{
        await delay(null)
        return room;
    }
    catch(error){
        return error;
    }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (id) => {
    try{
        await delay(null)
        return id;
    }
    catch(error){
        return error;
    }
})