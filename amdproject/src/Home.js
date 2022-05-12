import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";

const Home = () => {

    // const selectUser = useSelector((state) => state.selectedUser);
    // console.log(selectUser);
    const selectUserId = useSelector((state) => state.selectedUserId);
    console.log(selectUserId);

    const [items, setItems] = useState([]);
    useEffect(() => {
        fetchItems();
      }, []);
    
      useEffect(() => {}, [items]);
    
      const fetchItems = async () => {
        const data = await fetch(`http://localhost:8000/getSuggestedFilmList?id=${selectUserId}`);
        const dataItems = await data.json();
        console.log(dataItems.getData);
        setItems(dataItems.getData);
        
      };
    return (
        <div>
            <h1>Welcome to Movie review Sysytem</h1>

            <div class="Container">
                <h2>Movie Sugestion</h2>
                {items?.map((item) => (
                <div class="card movie_card">
                <h4>Movie</h4>
          <div class="container">
            
              <form>
              <label>Film Name :{item.filmname}</label><br></br>
              <label> Genres :{item.genres}</label> <br></br>
              <label>Country: {item.country}</label><br></br>
              <label>Release year :{item.releaseyear}</label><br></br>
              <label>Minimum Age : {item.minage}</label><br></br>
              
             
              <br></br>
              <div>
               
              </div>
            </form>
          
          
          </div>
          
        </div>
        ))}
            </div>
        </div>

        
    )
}

export default Home;