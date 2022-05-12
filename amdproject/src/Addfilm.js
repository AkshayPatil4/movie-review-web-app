
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "./Redux/actions/selectedUserAction";

function Addfilm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [genre1, setGenre1] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [crew, setCrew] = useState('');
  const [crew1, setCrew1] = useState('');
  const [main, setMain] = useState('true');
  const [role,setRole] = useState('');
  const [role1,setRole1] = useState('');
  const [crew2, setCrew2] = useState('');
  const [role2,setRole2] = useState('');
  const [isPending, setIsPending] = useState(false);
  //const history = useHistory();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const data ={ 
          name: title, 
          year: date, 
          genre:[genre,genre1] ,
          age:age,
          country:country,
          personRelated:[[crew,role],[crew1,role1],[crew2,role2]],
          isMainFilm: main,
      };
      console.log(data);
      setIsPending(true);

    const response = await fetch("http://localhost:8000/addNewFilm",{
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


  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {}, [items]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8000/getallpersons");
    const dataItems = await data.json();
    setItems(dataItems.personData);
  };

  
  

return (
  <div className='create'>
      <h1>Add Film</h1>

      <div conatiner>
      <form onSubmit={ handleSubmit}>
          <label>Name:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required></input><br></br>
          <label>year</label>
          <input type="number" value={date} onChange={(e) => setDate(e.target.value)} required></input><br></br>
          <label>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required ></input>
          <input type="text" value={genre1} onChange={(e) => setGenre1(e.target.value)} required ></input><br></br>
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required ></input><br></br>
          <label>country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required ></input><br></br>
          <label>Crew</label>
          
          <select value={crew} onChange={(e) => setCrew(e.target.value)}><br></br>
              {items?.map((item) => (
                <option value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Actor</option>
                <option>Director</option>
            </select><br></br><label>Crew</label>
          
          <select value={crew1} onChange={(e) => setCrew1(e.target.value)}><br></br>
          <option value={"Select a person", ""} >
                  {"Select a person"}
                </option>
              {items?.map((item) => (
                <option value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select>
            <select value={role1} onChange={(e) => setRole1(e.target.value)}>
            <option value={"Select a role", ""} >
                  {"Select a role"}
                </option>
                <option>Actor</option>
                <option>Director</option>
            </select><br></br>
            <select value={crew2} onChange={(e) => setCrew2(e.target.value)}><br></br>
          <option value={"Select a person", ""} >
                  {"Select a person"}
                </option>
              {items?.map((item) => (
                <option value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select>
            <select value={role2} onChange={(e) => setRole2(e.target.value)}>
            <option value={"Select a role", ""} >
                  {"Select a role"}
                </option>
                <option>Actor</option>
                <option>Director</option>
            </select><br></br>
          
          <input type="checkbox" value={main} onChange={(e) => setMain(e.target.checked)}  ></input><br></br>


          
          
          
          {!isPending && <button>Submit</button>}
          {isPending && <button disabled>Loading</button>}
      </form> 
      </div>
      
  </div>
  
)
}

export default Addfilm;