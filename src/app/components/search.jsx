import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => {
    return (
        <div className="input-group has-validation">
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Поиск"
                className="form-control me-2"
                onChange={({ target }) => onChange(target.value)}
            />
        </div>
    );
};

Search.propTypes = {
    onChange: PropTypes.func
};

export default Search;
