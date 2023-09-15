import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'
const OrgList = () => {
  const [donarList, setDonarList] = useState([])

  const getDonarsList = async () => {
    try {
      const { data } = await API.get('/admin/org-list');
      if (data?.success) setDonarList(data?.orgList);
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getDonarsList();
  }, [])

  const deleteDonar = async (id, name) => {
    try {
      let isItSure = window.prompt(`Are you sure want to delete the Organisation named ${name}`, "YES")
      if (!isItSure) return;
      await API.delete(`admin/delete-org/${id}`)
      window.alert("Organisation Record deleted successfully");

      window.location.reload();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Organisation Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Time and Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {donarList?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.address}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteDonar(record._id, record.organisationName)}>Delete</button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    </Layout>
  )
}

export default OrgList
