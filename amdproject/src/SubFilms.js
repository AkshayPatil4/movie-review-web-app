import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SubFilms() {
 
    const [items, setItems] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState();
    let navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
      fetchItems();
    }, []);

    useEffect(() => {
      console.log(location.state.detail); 
   }, [location]);
  
    useEffect(() => {}, [items]);
  
    const fetchItems = async () => {
      const data = await fetch(`http://localhost:8000/getallsubfilmsbyId?id=${location.state.detail}`);
      const dataItems = await data.json();
      setItems(dataItems.subFilmsData);
      console.log(dataItems.subFilmsData);
      
    };
    
    const onDeleteData = async (item) => {

    //   const data = {
    //     id: item.personid,
        
    //   }
    //   console.log(data);
    //   const response = await fetch("http://localhost:8000/deleteFilmOnId",{
    //     method: 'GET',
    //     headers: {"Content-Type": "application/json"},
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     body: JSON.stringify(data)
    // });
  
    // console.log(response.json());
     };
  
    const onEditData = (item) => {
      // e.preventDefault();
      //navigate('/add-Film',
           // {state: { detail: item}}
      //);
    };
  

    return (
        <div>
          
            <h1>Subordinate Films</h1>
            {items?.map((item) => (
            <div class="card">
  
  <div class="container">
    <form>
      <label>name :</label>
    <label>{item.filmname}</label><br></br>
    <label>{item.releaseyear}</label><br></br>
    <label>{item.genres}</label><br></br>
    <label>{item.minage}</label><br></br>
    <label>{item.country}</label><br></br>
    <label>{item.personrelated}</label><br></br>
    <label>{item.ismain}</label><br></br>
    
    <div>
    <button class="btn btn-small" onClick={() => {
                    navigate('/edit-sub',
                    {state: { detail: item}}
              );
                }}>Edit</button>
                <button onClick={onDeleteData}>Delete</button>
                
    </div>
    </form>
  </div>
  </div>
  ))}
  <div class="container">
    <button class="btn btn-large btn-primary">Add a Film</button>
  </div>
        </div>
        
    )
}

export default SubFilms;