import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import {useDispatch} from "react-redux";
// import {setSelectedUser} from ".//Redux/actions/selectedUserAction";

import "./Person.css";
function Person() {
  const [items, setItems] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState();
  let navigate = useNavigate();

  // const [selectedValue, setSelectedValue] = useState(items[0]?.username);
  // const [selectedValueId, setSelectedValueId] = useState();
  // const dispatch = useDispatch();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {}, [items]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8000/getallpersons");
    const dataItems = await data.json();
    setItems(dataItems.personData);
    
  };
  


  const onDeleteData = async (item) => {

    const data = {
      id: item.personid,
      name: item.personname,
    }
    console.log(data);
    const response = await fetch("http://localhost:8000/deletePersonDetails",{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      body: JSON.stringify(data)
  });

  console.log(response.json());
  };


  return (
    <div>
      <h1>Person</h1>
      {items?.map((item) => (
        <div class="card movie_card">
          <h4>Crew Members</h4>
          <div class="container">
            <form>
              <label>{item.personname}</label>
              <br></br>
              <label>{item.dob}</label>
              <br></br>
              <label>{item.gend}</label>
              <br></br>
              {item.filmnames?.map((filname) =>  
              <label>{filname}</label>
              )}
              <div>
               <button class="btn btn-small" onClick={() => {
                    navigate('/edit-person',
                    {state: { detail: item}}
              );
                }}>Edit</button>
                <button onClick={() => onDeleteData(item)}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      ))}

      <div class="container">
        <button class="btn btn-large btn-primary"><Link to="/add-person" >Add a Person</Link></button>
      </div>
    </div>
  );
}

export default Person;
