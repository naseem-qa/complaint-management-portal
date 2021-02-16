import React, { useContext, useEffect, useState } from 'react'
import { complaintContext } from '../complaint/context'
import './admin.scss'

const AdminTool = props => {
  const compContext = useContext(complaintContext);
  const [complaints, setComplaints] = useState([])
  const API = 'http://localhost:3030';

  const getAll = () => {
    fetch(`${API}/api/v1/complaints`)
    .then(response => response.json())
    .then(data =>{
        setComplaints(data.data)
        console.log("ddddd",data)
    })
  }

  const handleStatusChange = e => {
    e.preventDefault();  
    console.log(e.target.options[e.target.selectedIndex].value)
    let status = e.target.options[e.target.selectedIndex].value
    let id = e.target.name
    fetch(`${API}/api/v1/complaints/${id}`,{
        method:'PUT',
        mode:'cors',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: status})
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  useEffect(()=>{
    getAll();
  },[])
  
  return(
    <div className="section" >
        <table className="customers">
        <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Contact Num</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
      {complaints.map((oneComplaint,idx) => (
    <tr key={idx}>
       <td>{idx + 1}</td>
       <td>{oneComplaint.name}</td>
       <td>{oneComplaint.email}</td>
       <td>{oneComplaint.contactNum}</td>
       <td>{oneComplaint.description}</td>
       <td>
           <select name={oneComplaint._id} defaultValue={oneComplaint.status} onChange={handleStatusChange}>
                <option value='resolved'>Resolved</option>
                <option value='pending'>Pending</option>
                <option value='dismissed'>Dismissed</option>
           </select>
       </td>
    </tr>
      ))}
      </tbody>
      </table>
    </div>
  )
}

export default AdminTool;