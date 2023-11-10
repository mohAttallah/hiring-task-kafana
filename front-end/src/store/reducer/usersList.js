import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { verify } from 'jsonwebtoken';
import cookies from 'react-cookies';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
    loading: false,
    error: null,
    usersList: {},
    previousLink: null,
    nextLink: null
};
const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            console.log(action.payload)
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload;
        },
        setPrevious: (state, action) => {
            state.previousLink = action.payload;
        },
        setNext: (state, action) => {
            state.nextLink = action.payload;
        }
    },
});

export const { setLoading, setError, setUsersList, setPrevious, setNext } = usersListSlice.actions;



export const getUserList = () => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));

        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.get(`${baseUrl}/admin/users`, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setUsersList(response.data));
            dispatch(setPrevious(response.data.previous));
            dispatch(setNext(response.data.next));
        } else {
            dispatch(setError('Signup failed'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const getNextLinkUsers = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const nextLinkState = state.deals.nextLink;

        // Check if there is a nextLink or not
        if (nextLinkState === null) return 'next link is null';



        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));

        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };
        const response = await axios.get(`${nextLinkState}`, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setUsersList(response.data));
            dispatch(setPrevious(response.data.previous));
            dispatch(setNext(response.data.next));
        } else {
            dispatch(setError('Signup failed'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


export const getPreviousLinkUsers = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const nextPreviousState = state.deals.previousLink;

        // Check if there is a nextLink or not
        if (nextPreviousState === null) return 'next link is null';


        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));

        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };
        const response = await axios.get(`${nextPreviousState}`, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setUsersList(response.data));
            dispatch(setPrevious(response.data.previous));
            dispatch(setNext(response.data.next));
        } else {
            dispatch(setError('Signup failed'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


export const changeUserStatus = (status, id) => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };
        const body = {
            Status: status,
        }
        const response = await axios.put(`${baseUrl}/admin/user/${id}`, body, config);
        if (response.status === 201) {
            dispatch(setLoading(false));
            return true;
        } else {
            dispatch(setError('Set Claimed Deals Error'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


export const deleteUser = (id) => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.delete(`${baseUrl}/admin/user/${id}`, config);
        if (response.status === 204) {
            dispatch(setLoading(false));
            return true;
        } else {
            dispatch(setError('Set Claimed Deals Error'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};



export default usersListSlice.reducer;
