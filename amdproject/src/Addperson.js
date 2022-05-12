import React from 'react';
import { useState } from 'react';
import { useHistory} from 'react-router-dom';



function Addperson() {

        const [title, setTitle] = useState('');
        const [dob, setDob] = useState('');
        const [gender, setGender] = useState('');
        const [isPending, setIsPending] = useState(false);
        //const history = useHistory();

        const handleSubmit = async (e) => {
            e.preventDefault();
            const data ={ 
                name: title, 
                dob: dob, 
                gender: gender
            };

            setIsPending(true);

          const response = await fetch("http://localhost:8000/addNewPerson",{
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
           console.log(response.json());
           setIsPending(false);
        }

    return (
        <div className='create'>
            <h1>Add Person</h1>

            <div class="movie_cardfilm" >
            <form onSubmit={ handleSubmit}>
                <label>Name:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required></input><br></br>
                <label>Date of birth</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required></input>
                <label>Gender</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required ></input><br></br><br></br>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Loading</button>}
            </form> 
            </div>
            
        </div>
        
    )
}

export default Addperson;