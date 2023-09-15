import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import { useSelector } from 'react-redux'
import moment from 'moment';

const Organisations = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth);
    const getOrgRecord = async () => {
        try {
            if (user?.role === "donar") {
                const { data } = await API.get('/inventory/get-organisations');
                if (data?.success) {
                    setData(data?.organisations);
                    // console.log(data);
                }
            }
            if (user?.role === "hospital") {
                const { data } = await API.get('/inventory/get-organisations-for-hospital');
                if (data?.success) {
                    setData(data?.organisations);
                    // console.log(data);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrgRecord();
    }, [user]);

    return (
        <Layout>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Organisation Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.organisationName}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Organisations
