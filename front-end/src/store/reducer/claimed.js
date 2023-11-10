import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookies from 'react-cookies';
// import jwtDecode from "jwt-decode";
const baseUrl = import.meta.env.VITE_BASE_URL;


const initialState = {
    loading: false,
    error: null,
    claimed: {},
    claimedDeal: []
    // acl
};

const claimedSlice = createSlice({
    name: 'claimed',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },

        setClaimed: (state, action) => {

            state.claimed = action.payload;
        },
        setClaimedDeals: (state, action) => {
            state.claimedDeal = action.payload;
        }
    },
});

export const { setLoading, setError, setClaimed, setClaimedDeals } = claimedSlice.actions;


export const getClaimedDeals = () => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));

        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };

        const response = await axios.get(`${baseUrl}/dealClaimed`, config);
        if (response.status === 200) {
            dispatch(setLoading(false));
            dispatch(setClaimedDeals(response.data));
        } else {
            dispatch(setError('Get data failed'));
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};



export const setClaimedDeal = (dealId, currency, amount) => async (dispatch) => {
    try {
        const userSession = cookies.load('user_session');
        dispatch(setLoading(true));
        const config = {
            headers: {
                'Authorization': `Bearer ${userSession}`
            }
        };
        const body = {
            Deal_ID: dealId,
            Currency: currency,
            Amount: amount
        }

        const response = await axios.post(`${baseUrl}/claimed`, body, config);
        if (response.status === 201) {
            dispatch(setLoading(false));
            console.log(response);
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

export default claimedSlice.reducer;
