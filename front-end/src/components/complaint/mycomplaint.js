import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../auth/context'

const MyComplaints = props => {
  const authContext = useContext(LoginContext);
  const [mine, setMine] = useState([])
  const API = 'http://localhost:3030';
  const getMine = (username) => {
    console.log('here')
    fetch(`${API}/api/v1/complaints/mine`,{
      method:'POST',
      mode:'cors',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username})
    })
    .then(response => response.json())
    .then(data => setMine(data))
  }

  useEffect(()=>{
    getMine(authContext.user.username);
  },[])
  return(
    <div className='mine'>
      {mine.map(oneComplaint => (
        <div>
          <h4>{oneComplaint.name}</h4>
          <h4>{oneComplaint.status}</h4>
        </div>
      ))}
    </div>
  )
}

export default MyComplaints