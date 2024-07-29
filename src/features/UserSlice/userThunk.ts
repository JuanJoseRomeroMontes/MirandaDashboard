import { createAsyncThunk } from "@reduxjs/toolkit";
import userData from '../../data/employeesData.json';
import { delay } from '../../utils'
import { EmployeeInterface } from "../../types";

export const fetchUserList = createAsyncThunk("user/fetchUserList", async (): Promise<EmployeeInterface[]> => {
    try{
        const data = await delay(userData);
        return data as EmployeeInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchUser = createAsyncThunk("user/fecthUser", async (id:number): Promise<EmployeeInterface> => {
    try{
        const employeeId:number = await delay(id) as number;
        const employee: EmployeeInterface | undefined = userData.find(employee => employee.id === employeeId);
        if (!employee) 
            throw('Failed to fecth user');
        return employee as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createUser = createAsyncThunk("user/createUser", async (user:EmployeeInterface): Promise<EmployeeInterface> => {
    try{
        await delay(null)
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (user:EmployeeInterface): Promise<EmployeeInterface> => {
    try{
        await delay(null)
        return user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id:number): Promise<number> => {
    try{
        await delay(null)
        return id as number;
    }
    catch(error){
        throw new Error;
    }
})