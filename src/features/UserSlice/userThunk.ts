import { createAsyncThunk } from "@reduxjs/toolkit";
import userData from '../../data/employeesData.json';
import { delay, EmployeeInterface } from '../../utils'

export const fetchUserList = createAsyncThunk<EmployeeInterface[]>("user/fetchUserList", async () => {
    try{
        const data = await delay(userData);
        return data as EmployeeInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchUser = createAsyncThunk<number>("user/fecthUser", async (id:number | void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})

export const createUser = createAsyncThunk<EmployeeInterface>("user/createUser", async (user:EmployeeInterface | void) => {
    try{
        await delay(null)
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateUser = createAsyncThunk<EmployeeInterface>("user/updateUser", async (user:EmployeeInterface | void) => {
    try{
        await delay(null)
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteUser = createAsyncThunk<number>("user/deleteUser", async (id:number | void) => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})