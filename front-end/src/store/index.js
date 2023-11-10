import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './reducer/signup';
import dealSlice from './reducer/deals';
import signinSlice from './reducer/signin';
import claimedSlice from './reducer/claimed'
import userListSlice from './reducer/usersList'
const store = configureStore({
    reducer: {
        signup: signupSlice,
        deals: dealSlice,
        signin: signinSlice,
        claimed: claimedSlice,
        userList:userListSlice
    }
});

export default store;
