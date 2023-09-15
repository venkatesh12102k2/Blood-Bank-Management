import React from 'react'
import Form from '../../components/shared/Form/Form';
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner';
import { toast } from 'react-toastify';


const Login = () => {
    const { loading, error } = useSelector(state => state.auth);

    return (
        <>
            {error && <span>{toast.error(error)}</span>}
            {
            (loading)?
            (
                <Spinner></Spinner>
            )
            :
                (<div className='row g-0'>
                    <div className='col-md-8 form-banner'>
                        <img src='./assets/images/loginBanner.png' alt='loginBanner'></img>
                    </div>
                    <div className='col-md-4 form-container'>
                        <Form submitBtn={'Login'} formTitle={'Login Form'} formType={'login'} />
                    </div>
                </div>)
            }
        </>
    )
}

export default Login;