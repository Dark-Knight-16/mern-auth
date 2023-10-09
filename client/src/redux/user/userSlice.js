import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        signOut:(state, action) => {
            state.currentUser = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { signInSuccess, signOut } = userSlice.actions

export default userSlice.reducer