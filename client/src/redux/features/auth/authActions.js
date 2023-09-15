import { createAsyncThunk } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import API from '../../../services/API';

//login
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            //store token
            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success(data.message);
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const userRegister = createAsyncThunk(
    'auth/register',
    async ({email, password, role, organisationName, hospitalName, website, address, phone, name}, {rejectWithValue})=>{
        try {
            const {data} = await API.post('/auth/register', {email, password, role, organisationName, hospitalName, website, address, phone, name});
            if(data.success)
            {
                toast.success(data.message);
                window.location.replace('/login');
            }
            return data;
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message)
            {
                return rejectWithValue(error.response.data.message);
            }
            else{
                return rejectWithValue(error.message);
            }
        }
    }
);


export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({rejectWithValue}) => {
        try {
            const res = await API.get('/auth/current-user');
            if(res?.data)//if(res && res.data)
            {
                return res?.data;
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message)
            {
                return rejectWithValue(error.response.data.message);
            }
            else{
                return rejectWithValue(error.message);
            }
        }
    }
)