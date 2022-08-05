import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    guest: false,
    editor: false,
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
            state.editor = false;
        },
        setEditor: (state, action) => {
            state.editor = action.payload;
        }
    }
})

export const { setUser, setGuest, resetUser, setEditor } = slice.actions;
export default slice.reducer;