import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"; 

function FilmRatings() {
    const [items, setItems] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState();
    // let navigate = useNavigate()
    const selectUserId = useSelector((state) => state.selectedUserId);  
    //  const [selectedValue, setSelectedValue] = useState(items[0]?.username);
    //  const [selectedValueId, setSelectedValueId] = useState();
    //  const dispatch = useDispatch();
    useEffect(() => {
      fetchItems();
    }, []);
  
    useEffect(() => {}, [items]);
  
    const fetchItems = async () => {
      const data = await fetch(`http://localhost:8000/getAllRatedFilms?id=${selectUserId}`);
      const dataItems = await data.json();
      console.log(dataItems.getAllRatedData);
      setItems(dataItems.getAllRatedData);
      
    };
    
    return (
        <div>
                <div>
                    <h1>Film ratings</h1>
                </div>

                <div>
                    <h3> All rated films</h3>
                    {items?.map((item) => (         
        <div class="card movie_cardrat">
          <h4>Film Rating</h4>
          <div class="container">
            
              <form>
              <label>Film name :{item.filmname}</label><br></br>
              <label>Rating :{item.rating}</label>
              <br></br>
              <div>
               
              </div>
            </form>
          
          
          </div>
         
        </div>
         ))}
     
                </div>
                <hr></hr>

                <div>
                <button> <Link to="/add-rating" >Add new Ratings</Link></button>
                </div>
                <hr></hr>

                <div>
                <button> <Link to="/edit-rating" >Edit Ratings</Link></button>
                </div>
                <hr></hr>

            </div>
    )
}

export default FilmRatings;