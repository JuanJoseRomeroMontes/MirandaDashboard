import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUser, fetchUserList, updateUser } from './userThunk';
import {EmployeeInterface} from "../../types"

// Define a type for the slice state
interface UserState {
    status:string,
    items:EmployeeInterface[],
    single:EmployeeInterface | null,
    error:any,
}

// Define the initial state using that type
const initialState: UserState = {
    status: 'idle',
    items: [],
    single: null,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserList.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchUserList.fulfilled, (state, action:PayloadAction<EmployeeInterface[]>) => {
            state.status = 'fulfilled'
            state.items = action.payload
        })
        .addCase(fetchUserList.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(fetchUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchUser.fulfilled, (state, action:PayloadAction<EmployeeInterface>) => {
            state.status = 'fulfilled'
            state.single =action.payload
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(createUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createUser.fulfilled, (state, action:PayloadAction<EmployeeInterface>) => {
            state.status = 'fulfilled'
            state.items = [...state.items, action.payload];
        })
        .addCase(createUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(updateUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(updateUser.fulfilled, (state, action:PayloadAction<EmployeeInterface>) => {
            state.status = 'fulfilled'
            console.log(action.payload)
            state.items = state.items.map(i => i.id === action.payload.id ? action.payload : i);
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
        .addCase(deleteUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(deleteUser.fulfilled, (state, action:PayloadAction<number>) => {
            state.status = 'fulfilled'
            state.items = state.items.filter(i => i.id !== action.payload);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})