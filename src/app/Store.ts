import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "../features/BookingSlice/bookingSlice";
import { contactSlice } from "../features/ContactSlice/contactSlice";
import { roomSlice } from "../features/RoomSlice/roomSlice";
import { userSlice } from "../features/UserSlice/userSlice";

export const store = configureStore({
    reducer: {
        "bookingSlice": bookingSlice.reducer,
        "contactSlice": contactSlice.reducer,
        "roomSlice": roomSlice.reducer,
        "userSlice": userSlice.reducer,
    }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']