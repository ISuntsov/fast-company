import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    let phrase;
    let classes = 'badge m-2 bg-primary';
    const lastDigitNumber = Number(length.toString().slice(-1));
    if (lastDigitNumber === 0) {
        if (length === 0) {
            phrase = 'Никто с тобой не тусанет';
            classes = 'badge m-2 bg-danger';
        } else phrase = length + ' человек тусанет с тобой сегодня';
    } else if (lastDigitNumber === 2 || lastDigitNumber === 3 || lastDigitNumber === 4) {
        phrase = length + ' человека тусанут с тобой сегодня';
    } else {
        phrase = length + ' человек тусанет с тобой сегодня';
    }

    return (
        <h3 className="text-center">
            <span className={classes}>{phrase}</span>
        </h3>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
