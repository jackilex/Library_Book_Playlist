import React from 'react';

const Card = (props) => {
    return ( 
    <div className="card text-white bg-primary mb-3 mr-4 mt-5" style={{width: "18rem"}}>
        <img src={props.image} className="card-img-top" alt={props.name}/>
            <div className="card-body">
                <h5 className="card-title">Title: {props.title} <br/> Author: {props.author}</h5>
                <h5 className="card-text">Published: {props.publish} <br/> description: {props.email}</h5>
            </div>
    </div>
     );
}
 
export default Card;