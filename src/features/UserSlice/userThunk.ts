import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest } from '../../utils'
import { EmployeeCreateInterface, EmployeeInterface } from "../../types";
import { toast } from "react-toastify";

export const fetchUserList = createAsyncThunk("user/fetchUserList", async (): Promise<EmployeeInterface[]> => {
    try{
        const data = await APIRequest("user");
        return data.users as EmployeeInterface[];
    }
    catch(error){
        throw new Error;
    }
})

export const fetchUser = createAsyncThunk("user/fecthUser", async (id:string): Promise<EmployeeInterface> => {
    try{
        const user = await APIRequest(`user/${id}`);
        if (!user) 
            throw('Failed to fecth user');
        return user.user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const createUser = createAsyncThunk("user/createUser", async (user:EmployeeCreateInterface): Promise<EmployeeInterface> => {
    try{
        const userAPI = await APIRequest(`user`, 'POST', user);
        toast.success('Employee created sucessfully')
        return userAPI.user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (user:EmployeeInterface): Promise<EmployeeInterface> => {
    try{
        const userAPI = await APIRequest(`user/${user._id}`, 'PATCH', user);
        toast.success('Employee updated sucessfully')
        return userAPI.user as EmployeeInterface;
    }
    catch(error){
        throw new Error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id:string): Promise<string> => {
    try{
        const user = await APIRequest(`user/${id}`, 'DELETE');
        toast.success('Employee deleted sucessfully')
        return user.user._id as string;
    }
    catch(error){
        throw new Error;
    }
})