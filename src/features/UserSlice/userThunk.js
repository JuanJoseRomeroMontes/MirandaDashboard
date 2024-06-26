import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from '../../data/commentsData.json';

function delay(data){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}

export const fetchUserList = createAsyncThunk("user/fetchUserList", async () => {
    try{
        const data = await delay(commentsData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchUser = createAsyncThunk("user/fecthUser", async (id) => {
    try{
        let data = await delay(commentsData.find(i => i.id === id));
        return data;
    }
    catch(error){
        return data;
    }
})

export const createUser = createAsyncThunk("user/createUser", async (user) => {
    try{
        return user;
    }
    catch(error){
        return error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
    try{
        return user;
    }
    catch(error){
        return error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    try{
        return id;
    }
    catch(error){
        return error;
    }
})