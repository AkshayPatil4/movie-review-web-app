import React from 'react';
import { Link } from 'react-router-dom'; 



function choosefilm()
{

    return (
        <div>
            <h1>Choose type of film to add</h1>

            <div>
                <button> <Link to="/add-film" >Main Film</Link></button>
                <button> <Link to="/add-sub" > Subordinate Film</Link></button>
            </div>
        </div>

        
    )
}

export default choosefilm;