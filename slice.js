import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        }
    }
})

export const { setUser, resetUser } = slice.actions;
export default slice.reducer;