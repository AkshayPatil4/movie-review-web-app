
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

function EditSub() {

  
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [crew, setCrew] = useState('');
  const [main, setMain] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
      console.log(location.state.detail); 
   }, [location]);
  useEffect(() => {
      
  },[title, date, genre, age, country,crew, main]);

  

  const handleSubmit = async (e) => {
      e.preventDefault();
      const data ={ 
          id: location.state.detail.filmid,
          name: location.state.detail.filmname, 
          year: location.state.detail.releaseyear, 
          genre:[location.state.detail.genres[0],location.state.detail.genres[1]] ,
          age: location.state.detail.minage, 
          country: location.state.detail.country, 
          personRelated:[ [location.state.detail.personrelated[0]],[location.state.detail.personrelated[1]],[location.state.detail.personrelated[2]]], 
          parentFilmId: location.state.detail.ismain, 
      };

      setIsPending(true);

    const response = await fetch("http://localhost:8000/updateSubFilmDetails",{
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

  const [itemss, setItemss] = useState([]);
  
   useEffect(() => {
     fetchItemss();
   }, []);

   useEffect(() => {}, [itemss]);

   const fetchItemss = async () => {
     const dataf = await fetch("http://localhost:8000/getallfilms");
   const datafItemss = await dataf.json();
     setItemss(datafItemss.filmsData);
   };

  return (
      <div>
          <h1>Edit Subordinate Films</h1>

          <div conatiner>
          <form onSubmit={ handleSubmit}>
              <label>Name:</label>
              <input type="text" value={location.state.detail.filmname} onChange={(e) => setTitle(location.state.detail.filmname)} required></input><br></br>
              <label>releaseyearr</label>
              <input type="number" value={location.state.detail.releaseyear} onChange={(e) => setDate(location.state.detail.releaseyear)} required></input><br></br>
              <label>Genre</label>
              <input type="text" value={location.state.detail.genres[0]} onChange={(e) => setGenre(location.state.detail.genres[0])} required></input>
              <input type="text" value={location.state.detail.genres[1]} onChange={(e) => setGenre(location.state.detail.genres[1])} required></input><br></br>
              <label>minage</label>
              <input type="number" value={ location.state.detail.minage} onChange={(e) => setAge( location.state.detail.minage)} required></input><br></br>
              <label>personrelated</label>
              
              <select value={location.state.detail.personrelated[0]} onChange={(e) => setCrew(location.state.detail.personrelated[0])}>
              {items?.map((item) => (
                <option selected value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select> 
            <select value={location.state.detail.personrelated[0]} onChange={(e) => setCrew(location.state.detail.personrelated[0])}>
            
                <option>Actor</option>
                <option>Director</option>
            </select><br></br>
            <select value={location.state.detail.personrelated[1]} onChange={(e) => setCrew(location.state.detail.personrelated[1])}>
              {items?.map((item) => (
                <option selected value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select> 
            <select value={location.state.detail.personrelated[1]} onChange={(e) => setCrew(location.state.detail.personrelated[1])}>
            
                <option>Actor</option>
                <option>Director</option>
            </select><br></br>
            <select value={location.state.detail.personrelated[2]} onChange={(e) => setCrew(location.state.detail.personrelated[2])}>
              {items?.map((item) => (
                <option selected value={item.personname} >
                  {item.personname}
                </option>
              ))}
            </select> 
            <select value={location.state.detail.personrelated[2]} onChange={(e) => setCrew(location.state.detail.personrelated[2])}>
            
                <option>Actor</option>
                <option>Director</option>
            </select><br></br>
              <label>country</label>
              <input type="text" value={location.state.detail.country} onChange={(e) => setCountry(location.state.detail.country)} required></input><br></br>
              <label>Select Film</label>
              <select value={location.state.detail.main} onChange={(e) => setMain(location.state.detail.main)}><br></br>
              {itemss?.map((item) => (
                <option selected value={item.filmname} >
                  {item.filmname} 
                </option>
              ))}
            </select><br></br>
              {!isPending && <button type='submit'>Submit</button>}
              {isPending && <button disabled>Loading</button>}
          </form> 
          </div>
      </div>
        
    )
  }
    export default EditSub;