import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    guest: false,
}

export const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setGuest(state, action) {
            state.guest = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        }
    }
})

export const { setUser, setGuest, resetUser } = slice.actions;
export default slice.reducer;