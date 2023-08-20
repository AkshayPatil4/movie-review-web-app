import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

function EditPerson() {

    const location = useLocation();
    const [title, setTitle] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        console.log(location.state.detail); 
     }, [location]);
    useEffect(() => {
        
    },[title, dob, gender]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data ={ 
            id: location.state.detail.personid,
            name: location.state.detail.personname, 
            dob: location.state.detail.dob, 
            gender: location.state.detail.gend,
        };

        setIsPending(true);

      const response = await fetch("http://localhost:8000/updatePersonDetails",{
           method: 'POST',
           headers: {"Content-Type": "application/json"},
           mode: 'cors',
           cache: 'no-cache',
           credentials: 'same-origin',
           body: JSON.stringify(data)
       });
    //    .then(() =>{
    //        console.log(data);
    //        setIsPending(false);
    //        //history.go(-1);
    //    }
    //    )
       setIsPending(false);
       console.log(response.json());
    }


    return (
        <div>
            <h1>Edit Person</h1>

            <div conatiner>
            <form onSubmit={ handleSubmit}>
                <label>Name:</label>
                <input type="text" value={location.state.detail.personname} onChange={(e) => setTitle(location.state.detail.personname)} required></input><br></br>
                <label>Date of birth</label>
                <input type="text" value={location.state.detail.dob} onChange={(e) => setDob(location.state.detail.dob)} required></input>
                <label>Gender</label>
                <input type="text" value={location.state.detail.gend} onChange={(e) => setGender(location.state.detail.gend)} required></input>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Loading</button>}
            </form> 
            </div>
        </div>
    )
}

export default EditPerson;