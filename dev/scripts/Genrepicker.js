import React from 'react';

const Genrepicker = () => {
    return ( 
        <div className="genre-select">
            <label htmlFor="genrePicker">I feel like reading </label>
            <select name="selectGenre" id="genrePicker">
                <option value="fiction">Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="humor">Humor</option>
            </select>
        </div>
    )
};

export default Genrepicker;