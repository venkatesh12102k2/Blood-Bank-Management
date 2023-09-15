import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {Navigate} from 'react-router-dom';
import { getCurrentUser } from '../../redux/features/auth/authActions'
import API from '../../services/API';
const ProtectedRoutes = ({children}) => {
  const dispatch = useDispatch()

    const getUser = async()=>{
        try {
            const {data} = await API.get('/auth/current-user')
            if(data?.success){
                dispatch(getCurrentUser(data));
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }
    useEffect(()=>{
        getUser()
    })
    if(localStorage.getItem('token')){
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes
