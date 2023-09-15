import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
const AdminHome = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <Layout>
            <div className='container'>
                <div className='text-center d-flex flex-column mt-4'>
                    <h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
                    <h2>Manage Blood Bank Record</h2>
                    <hr></hr>
                    <p>
                        <h4>You can view and manage the following from the left Sidebar!!!</h4>
                        <ul className='text-danger' style={{ listStyleType: 'none' }}>
                            <li>Donar List</li>
                            <li>Hospital List</li>
                            <li>Organisation List</li>
                        </ul>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default AdminHome
