import React from "react";
import './RatingComponent.css'

export default function RatingComponent({ selected, setSelected }) {
    return(
        <div id="options-container-rating">
        <p id="subheading-rating">Least</p>
        <div id="stars-container">
            {[1, 2, 3, 4, 5].map((num) => (
                <button
                    key={num}
                    className={selected === num ? 'star selected' : 'star'}
                    onClick={() => setSelected(num)}
                >
                {num}
                </button>
            ))}  
        </div>
        <p id="subheading-rating">Most</p>
    </div>
    )   
}