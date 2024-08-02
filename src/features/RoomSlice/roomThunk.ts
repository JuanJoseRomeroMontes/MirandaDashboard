import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest } from '../../utils'
import { RoomCreateInterface, RoomInterface } from "../../types";
import { toast } from "react-toastify";

export const fetchRoomList = createAsyncThunk("room/fetchRoomList", async (): Promise<RoomInterface[]> => {
    try{
        const data = await APIRequest("room");
        return data.rooms as RoomInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchRoom = createAsyncThunk("room/fecthRoom", async (id:string): Promise<RoomInterface> => {
    try{
        const room = await APIRequest(`room/${id}`);
        if (!room) 
            throw('Failed to fecth room');
        return room.room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createRoom = createAsyncThunk("room/createRoom", async (room:RoomCreateInterface): Promise<RoomInterface> => {
    try{
        const roomAPI = await APIRequest(`room`, 'POST', room);
        toast.success('Room created sucessfully')
        return roomAPI.room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (room:RoomInterface): Promise<RoomInterface> => {
    try{
        const roomAPI = await APIRequest(`room/${room._id}`, 'PATCH', room);
        toast.success('Room updated sucessfully')
        return roomAPI.room as RoomInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (id:string): Promise<string> => {
    try{
        const room = await APIRequest(`room/${id}`, 'DELETE');
        toast.success('Room deleted sucessfully')
        return room.room._id as string;
    }
    catch(error){
        throw new Error;
    }
})