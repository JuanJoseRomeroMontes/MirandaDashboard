import { createAsyncThunk } from "@reduxjs/toolkit";
import userData from '../../data/employeesData.json';
import { APIRequest, delay } from '../../utils'
import { EmployeeInterface } from "../../types";

export const fetchUserList = createAsyncThunk("user/fetchUserList", async (): Promise<EmployeeInterface[]> => {
    try{
        const data = await APIRequest("user");
        return data as EmployeeInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchUser = createAsyncThunk("user/fecthUser", async (id:number): Promise<EmployeeInterface> => {
    try{
        const user = await APIRequest(`user/${id}`);
        if (!user) 
            throw('Failed to fecth user');
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createUser = createAsyncThunk("user/createUser", async (user:EmployeeInterface): Promise<EmployeeInterface> => {
    try{
        const user = await APIRequest(`user`, 'POST'); //{"room": room}
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (user:EmployeeInterface): Promise<EmployeeInterface> => {
    try{
        const user = await APIRequest(`user`, 'PATCH'); //{"room": room}
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id:number): Promise<number> => {
    try{
        const user = await APIRequest(`user/${id}`, 'DELETE');
        return user._id as number;
    }
    catch(error){
        throw new Error;
    }
})