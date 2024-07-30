import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from '../../data/roomsData.json';
import { APIRequest, delay } from '../../utils'
import { RoomInterface } from "../../types";

export const fetchRoomList = createAsyncThunk("room/fetchRoomList", async (): Promise<RoomInterface[]> => {
    try{
        const data = await APIRequest("room");
        return data as RoomInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchRoom = createAsyncThunk("room/fecthRoom", async (id:number): Promise<RoomInterface> => {
    try{
        const room = await APIRequest(`room/${id}`);
        if (!room) 
            throw('Failed to fecth room');
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createRoom = createAsyncThunk("room/createRoom", async (room:RoomInterface): Promise<RoomInterface> => {
    try{
        const room = await APIRequest(`room`, 'POST'); //{"room": room}
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (room:RoomInterface): Promise<RoomInterface> => {
    try{
        const room = await APIRequest(`room`, 'PATCH'); //{"room": room}
        return room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (id:number): Promise<number> => {
    try{
        const room = await APIRequest(`room/${id}`, 'DELETE');
        return room._id as number;
    }
    catch(error){
        throw new Error;
    }
})