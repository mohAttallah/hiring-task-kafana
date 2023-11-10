import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookies from 'react-cookies';
const session_user = cookies.load('user_session');
const user_data = cookies.load('user_data');
const baseUrl = import.meta.env.VITE_BASE_URL;

const isAuth = !!session_user;
const initialToken = session_user ? session_user : null;
const initalUserData = user_data ? user_data : null;

const initialState = {
    loading: false,
    error: null,
    token: initialToken,
    userData: initalUserData,
    isAuth,
};

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setToken: (state, action) => {
            cookies.save('user_session', action.payload,);
            state.token = action.payload;
            state.isAuth = true;
        },
        setUserData: (state, action) => {
            cookies.save('user_data', action.payload);
            state.userData = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    },
});

export const { setLoading, setError, setToken, setUserData, setIsAuth } = signinSlice.actions;

export const signinUser = (userData) => async (dispatch) => {
    try {

        dispatch(setLoading(true));
        const basicAuth = btoa(`${userData.username}:${userData.password}`);
        const config = {
            headers: {
                Authorization: `Basic ${basicAuth}`,
            },
        };

        const response = await axios.post(`${baseUrl}/signin`, {}, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setToken(response.data.token));
            dispatch(setUserData(response.data.user));
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


export const signoutUser = () => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.post(`${baseUrl}/signout`, {}, config);
        if (response.status === 201 || response.status === 401) {
            dispatch(setLoading(false));
            dispatch(setToken(null));
            dispatch(setUserData({}));
            dispatch(setIsAuth(false))
            cookies.remove('user_data');
            cookies.remove('user_session');
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

export default signinSlice.reducer;
