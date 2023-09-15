import React, { useState, useEffect } from 'react'
import Header from '../../components/shared/Layout/Header'
import API from '../../services/API'
import moment from 'moment'

const Analytics = () => {
    const colors = [
        "#45FFCA",
        "#FEFFAC",
        "#FFB6D9",
        "#D67BFF",
        "#A6FF96",
        "#8DDFCB",
        "#82A0D8",
        "#EDB7ED",
    ]

    const [data, setData] = useState([])
    const [inventoryData, setInventoryData] = useState([])

    const getBloodGrpDetails = async () => {
        try {
            const { data } = await API.get('/analytics/get-bloodGroup-details');
            if (data?.success) {
                setData(data?.bloodGroupDetails);
                // console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodGrpDetails();
    }, [])

    const getBloodData = async () => {
        try {
            const { data } = await API.get('/inventory/get-recent-inventory');
            if (data?.success) {
                setInventoryData(data?.inventory)
                // console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodData();
    }, [])

    return (
        <>
            <Header />
            <div className='d-flex flex-row flex-wrap'>
                {data?.map((record, i) => (
                    <div key={i} className="card m-2 p-1" style={{ width: '18rem', backgroundColor: `${colors[i]}` }}>
                        <div className="card-body">
                            <h1 className="card-title bg-light text-dark  text-center mb-3">{record.bloodGroup}</h1>
                            <p className="card-text">
                                Total In : <b>{record.totalIn}</b>
                            </p>
                            <p className="card-text">
                                Total Out : <b>{record.totalOut}</b>
                            </p>
                        </div>
                        <div className='card-footer bg-dark text-light text-center'>
                            Available : <b>{record.availableQuantity}</b>
                        </div>

                    </div>

                ))}
            </div>
            <div className='container my-3'>
                <h1 className='my-3'>Recent Transaction Record</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Inventory Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Donar Email</th>
                            <th scope="col">Time and Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.bloodGroup}</td>
                                <td>{record.inventoryType}</td>
                                <td>{record.quantity} (ML)</td>
                                <td>{record.email}</td>
                                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Analytics
