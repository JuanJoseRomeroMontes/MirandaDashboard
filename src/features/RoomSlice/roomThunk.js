import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';

function delay(data){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

export const fetchRoomList = createAsyncThunk("room/fetchRoomList", async () => {
    try{
        const data = await delay(commentsData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchRoom = createAsyncThunk("room/fecthRoom", async (id) => {
    try{
        let data = await delay(commentsData.find(i => i.id === id));
        return data;
    }
    catch(error){
        return data;
    }
})

export const createRoom = createAsyncThunk("room/createRoom", async (room) => {
    try{
        return room;
    }
    catch(error){
        return error;
    }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (room) => {
    try{
        return room;
    }
    catch(error){
        return error;
    }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (id) => {
    try{
        return id;
    }
    catch(error){
        return error;
    }
})