import { createAsyncThunk } from "@reduxjs/toolkit";
import userData from '../../data/employeesData.json';
import { delay } from '../../utils'

export const fetchUserList = createAsyncThunk("user/fetchUserList", async () => {
    try{
        const data = await delay(userData);
        return data;
    }
    catch(error){
        return error;
    }
})

export const fetchUser = createAsyncThunk("user/fecthUser", async (id) => {
    try{
        await delay(null)
        return id;
    }
    catch(error){
        return error;
    }
})

export const createUser = createAsyncThunk("user/createUser", async (user) => {
    try{
        await delay(null)
        return user;
    }
    catch(error){
        return error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
    try{
        await delay(null)
        return user;
    }
    catch(error){
        return error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    try{
        await delay(null)
        return id;
    }
    catch(error){
        return error;
    }
})