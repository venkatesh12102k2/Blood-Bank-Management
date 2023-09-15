import React, { useState } from 'react'
import InputType from './InputType';
import { Link } from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/authServices';

const Form = ({ formType, submitBtn, formTitle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donar");
    const [organisationName, setOrganisationName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    return (
        <div>
            <form className='form' onSubmit={(e) => {
                if (formType === 'login') {
                    return handleLogin(e, email, password, role);
                }
                else if (formType === 'register') {
                    return handleRegister(e, email, password, role, organisationName, hospitalName, website, address, phone, name);
                }
            }}>
                <h1 className='text-center'>{formTitle}</h1>
                <hr />

                <div className='d-flex mb-3'>
                    <div className='form-check'>
                        <input type='radio' className='form-check-input' name='role' id='donarRadio' value={'donar'} defaultChecked onChange={(e) => { setRole(e.target.value) }} />
                        <label htmlFor='donarRadio' className='form-check-label'>Donar</label>
                    </div>

                    {(formType == "login") && (
                        <>
                            <div className='form-check ms-2'>
                                <input type='radio' className='form-check-input' name='role' id='adminRadio' value={'admin'} onChange={(e) => { setRole(e.target.value) }} />
                                <label htmlFor='adminRadio' className='form-check-label'>Admin</label>
                            </div>
                        </>
                    )}



                    <div className='form-check ms-2'>
                        <input type='radio' className='form-check-input' name='role' id='hospitalRadio' value={'hospital'} onChange={(e) => { setRole(e.target.value) }} />
                        <label htmlFor='hospitalRadio' className='form-check-label'>Hospital</label>
                    </div>

                    <div className='form-check ms-2'>
                        <input type='radio' className='form-check-input' name='role' id='organisationRadio' value={'organisation'} onChange={(e) => { setRole(e.target.value) }} />
                        <label htmlFor='organisationRadio' className='form-check-label'>Organisation</label>
                    </div>
                </div>

                {(() => {
                    switch (formType) {
                        case "login": {
                            return (<>
                                <InputType
                                    labelFor={'forEmail'}
                                    lableText={'Email'}
                                    name={'email'}
                                    inputType={'email'}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <InputType
                                    labelFor={'forPassword'}
                                    lableText={'Password'}
                                    name={'password'}
                                    inputType={'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </>)
                        }
                        case "register": {
                            return (<>

                                {(role === 'admin' || role === 'donar') && (
                                    <InputType
                                        labelFor={'forName'}
                                        lableText={'Name'}
                                        name={'name'}
                                        inputType={'text'}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                )}



                                {(role === 'organisation') && (
                                    <InputType
                                        labelFor={'forOrganisationName'}
                                        lableText={'Organisation Name'}
                                        name={'organisationName'}
                                        inputType={'text'}
                                        value={organisationName}
                                        onChange={(e) => { setOrganisationName(e.target.value) }}
                                    />
                                )}

                                {(role === 'hospital') && (
                                    <InputType
                                        labelFor={'forHospitalName'}
                                        lableText={'Hospital Name'}
                                        name={'hospitalName'}
                                        inputType={'text'}
                                        value={hospitalName}
                                        onChange={(e) => { setHospitalName(e.target.value) }}
                                    />
                                )}

                                <InputType
                                    labelFor={'forEmail'}
                                    lableText={'Email'}
                                    name={'email'}
                                    inputType={'email'}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <InputType
                                    labelFor={'forPassword'}
                                    lableText={'Password'}
                                    name={'password'}
                                    inputType={'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <InputType
                                    labelFor={'forWebsite'}
                                    lableText={'Website'}
                                    name={'website'}
                                    inputType={'text'}
                                    value={website}
                                    onChange={(e) => { setWebsite(e.target.value) }}
                                />
                                <InputType
                                    labelFor={'forAddress'}
                                    lableText={'Address'}
                                    name={'address'}
                                    inputType={'text'}
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                                <InputType
                                    labelFor={'forPhone'}
                                    lableText={'Phone'}
                                    name={'phone'}
                                    inputType={'text'}
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                />
                            </>)
                        }
                        default: { }
                    }
                })()}


                <div className='d-flex justify-content-between'>
                    {(formType === 'login') ? (
                        <p>Not Registered yet ?
                            <Link to='/register'>   Register Here !</Link>
                        </p>
                    ) : (
                        <p>Already Registered ?
                            <Link to='/login'>   Login Here !</Link>
                        </p>
                    )}
                    <button type='submit' className='btn btn-primary'>
                        {submitBtn}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form;
