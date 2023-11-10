import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { verify } from 'jsonwebtoken';
import cookies from 'react-cookies';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
    loading: false,
    error: null,
    deals: {},
    previousLink: null,
    nextLink: null,
    refresh: 0
};
const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            console.log(action.payload)
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setDeals: (state, action) => {
            state.deals = action.payload;
        },
        setPrevious: (state, action) => {
            state.previousLink = action.payload;
        },
        setNext: (state, action) => {
            state.nextLink = action.payload;
        },
        setRefresh: (state, action) => {
            state.refresh += 1;
        }
    },
});

export const { setLoading, setError, setDeals, setPrevious, setNext, setRefresh } = dealsSlice.actions;



export const getDeals = () => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));

        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.get(`${baseUrl}/deal`, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setDeals(response.data));
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

export const getNextLinkDeals = () => async (dispatch, getState) => {
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
            dispatch(setDeals(response.data));
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


export const getPreviousLinkDeals = () => async (dispatch, getState) => {
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
            dispatch(setDeals(response.data));
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



export const addNewDeal = (body) => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.post(`${baseUrl}/deal`, body, config);
        if (response.status === 201) {
            dispatch(setLoading(false));
            return true;
        } else {
            dispatch(setError('Add new Deals Error'));
        }

    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


export const deleteDeal = (id) => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.delete(`${baseUrl}/admin/deal/${id}`, config);
        if (response.status === 204) {
            dispatch(setLoading(false));
            dispatch(setRefresh(false))
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




export default dealsSlice.reducer;
