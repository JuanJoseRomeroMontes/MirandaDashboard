import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from '../../data/roomsData.json';
import { delay, RoomInterface } from '../../utils'

export const fetchRoomList = createAsyncThunk("room/fetchRoomList", async (): Promise<RoomInterface[]> => {
    try{
        const data = await delay(roomsData);
        return data as RoomInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchRoom = createAsyncThunk("room/fecthRoom", async (id:number): Promise<RoomInterface> => {
    try{
        const roomId:number = await delay(id) as number;
        const room: RoomInterface | undefined = roomsData.find(room => room.id === roomId);
        if (!room) 
            throw('Failed to fecth contact');
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createRoom = createAsyncThunk("room/createRoom", async (room:RoomInterface): Promise<RoomInterface> => {
    try{
        await delay(null)
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (room:RoomInterface): Promise<RoomInterface> => {
    try{
        await delay(null)
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (id:number): Promise<number> => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})