import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from '../../data/roomsData.json';
import { delay, RoomInterface } from '../../utils'

export const fetchRoomList = createAsyncThunk<RoomInterface[]>("room/fetchRoomList", async () => {
    try{
        const data = await delay(roomsData);
        return data as RoomInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchRoom = createAsyncThunk<number>("room/fecthRoom", async (id:number | void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})

export const createRoom = createAsyncThunk<RoomInterface>("room/createRoom", async (room:RoomInterface|void) => {
    try{
        await delay(null)
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateRoom = createAsyncThunk<RoomInterface>("room/updateRoom", async (room:RoomInterface|void) => {
    try{
        await delay(null)
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteRoom = createAsyncThunk<number>("room/deleteRoom", async (id:number | void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})