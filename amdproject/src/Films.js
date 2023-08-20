import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; 

function Films() {
 
    const [items, setItems] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState();
    let navigate = useNavigate()

    useEffect(() => {
      fetchItems();
    }, []);
  
    useEffect(() => {}, [items]);
  
    const fetchItems = async () => {
      const data = await fetch("http://localhost:8000/getallfilms");
      const dataItems = await data.json();
      setItems(dataItems.filmsData);
      console.log(dataItems.filmsData);
      
    };
    
    const onDeleteData = async (e,item) => {
      e.preventDefault();
       const data = {
         id: item.filmid,
        
       }
       console.log(item);
    const response = await fetch(`http://localhost:8000/deleteFilmOnId?id=${item.filmid}`);
    
    
  
     console.log(response.json());
     };
  
    const onEditData = (item) => {
      // e.preventDefault();
      //navigate('/add-Film',
           // {state: { detail: item}}
      //);
    };
  

    return (
        <div>
          
            <h1>Films</h1>
            {items?.map((item) => (
            <div class="card movie_cardfilm">
  <h4>Movies</h4>
  <div class="container">
    <form>
      
    <label>FILM :{item.filmname}</label><br></br>
    <label>RELEASE YEAR :{item.releaseyear}</label><br></br>
    <label>GENRES :{item.genres}<span> ,</span></label><br></br>
    <label>MINIMUM AGE :{item.minage}</label><br></br>
    <label>COUNTRY :{item.country}</label><br></br>
    <label>CREW MEMBERS:{item.personrelated}</label><br></br>
    <label>{item.ismain}</label><br></br>
    
    <div>
    <button class="btn btn-small" onClick={() => {
                    navigate('/edit-film',
                    {state: { detail: item}}
              );
                }}>Edit</button>
                <button onClick={() => onDeleteData(item.filmid)}>Delete</button>
                <button  onClick={() => {
                    navigate('/sub-films',
                    {state: { detail: item.filmid}}
              );
                }}>Subordinate Films</button>
    </div>
    </form>
  </div>
  </div>
  ))}
  <div class="container">
    <button class="btn btn-large btn-primary"> <Link to="/choose-film" >Add a Film</Link></button>
  </div>
        </div>
        
    )
}

export default Films;