import React, { useContext, useEffect, useState } from 'react'
import { complaintContext } from '../complaint/context'


const AdminTool = props => {
  const compContext = useContext(complaintContext);
  const [complaints, setComplaints] = useState([])
  const API = 'http://localhost:3030';

  const getAll = (name, email, contactNum,description ) => {
    fetch(`${API}/api/v1/complaints`,{
      method:'POST',
      mode:'cors',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email:email, contactNum:contactNum,description:description  })
    })
    .then(response => response.json())
    .then(data => setComplaints(data))
    console.log("dddddddd",data)
  }

//   useEffect(()=>{
//     getAll(compContext.);
//   },[])
  let i =0
  return(
    <div >
        <table>
        <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Contact Num</th>
      <th>Description</th>

    </tr>
  </thead>
  <tbody>
      {complaints.map(oneComplaint => (
          <tr>
       <td>{i++}</td>
       <td>{oneComplaint.name}</td>
       <td>{oneComplaint.email}</td>
       <td>{oneComplaint.contactNum}</td>
       <td>{oneComplaint.description}</td>

       </tr>
      ))}
      </tbody>
      </table>
    </div>
  )
}

export default AdminTool;