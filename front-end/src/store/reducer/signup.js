import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
    loading: false,
    error: null,
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setError } = signupSlice.actions;

export const signupUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const requestBody = {
            Name: userData.name,
            Username: userData.username,
            Password: userData.password,
            Birthday: userData.birthday,
            Img: userData.imageUrl,
            Gender: userData.gender,
            email: userData.email,
        };
        console.log(requestBody);
        const response = await axios.post(`${baseUrl}/signup`, requestBody);

        if (response.status === 201) {
            dispatch(setLoading(false));
            return true;
        } else {
            dispatch(setError('Signup failed'));
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default signupSlice.reducer;
