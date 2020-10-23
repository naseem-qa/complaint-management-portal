import React ,{useContext, useState} from 'react';
import {Else, If,Then} from '../if/index.js';
import { complaintContext } from './context.js';

import './complaints.scss'
import { LoginContext } from '../auth/context.js';
import { Link, Redirect } from 'react-router-dom';

const Complaints =(props)=> {
    const context = useContext(complaintContext );
    const authContext = useContext(LoginContext);
    const [submitted, setSubmitted] = useState(false);
    const API = 'http://localhost:3030'
    
    const handleChange = e => {
    //   this.setState({ [e.target.name]: e.target.value });
    }
  
    const handleSubmit = e => {
      e.preventDefault();

      let payload = {
          name: e.target.name.value,
          email: e.target.email.value,
          contactNum: e.target.contactNum.value,
          description: e.target.description.value,
          username: authContext.user.username,
          status: 'pending'
      }

      fetch(`${API}/api/v1/complaints`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(()=>setSubmitted(true))
        .catch(e=> console.error(e.message))
    }
    
        return(
            <>
              <If condition={submitted}>
                <Then>
                    <Redirect to='/' />
                </Then>
                <Else>
             <form className='new-complaint' onSubmit={handleSubmit}>
                      <label >Name</label>
                        <input type="text" name="name" required  onChange={handleChange} />
                      
                      <label>Email </label>
                        <input type="email" name="email" required  onChange={handleChange} />
    
                     <label >Contact Number</label>
                        <input type="text" name="contactNum" required onChange={handleChange} />
                      
                      <label>Description </label>
                        <input type="text" name="description" required onChange={handleChange} />
        
                        <button type="submit" >Submit Complaint</button>
                      
                    </form>
                    </Else>
            </If>
    
            </>
            
        )
 
  }
  
  export default Complaints;
  

  

