import React,{useState} from 'react';

export const complaintContext = React.createContext();

const ComplaintProvider =(props)=>{

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [contactNum,setContactNum] = useState(0)
    const [description,setDescription] = useState('')
    const state = {
        name,
        email,
        contactNum,
        description,
        setName,
        setEmail,
        setContactNum,
        setDescription
    }
        return(
          <complaintContext.Provider value={state}>
            {props.children}
          </complaintContext.Provider>
        );
    

}

export default ComplaintProvider;


