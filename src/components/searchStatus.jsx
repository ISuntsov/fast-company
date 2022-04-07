import React from "react";

const SearchStatus = ({length}) => {
    let phrase
    let classes = "badge m-2 bg-primary"
    const lastDigitNumber = Number(length.toString().slice(-1))
    switch (lastDigitNumber) {
        case 0:
            if (length === 0) {
                phrase = 'Никто с тобой не тусанет'
                classes = "badge m-2 bg-danger"
            } else
                phrase = length + ' человек тусанет с тобой сегодня'
            break
        case 2:
        case 3:
        case 4:
            phrase = length + ' человека тусанут с тобой сегодня'
            break
        default:
            phrase = length + ' человек тусанет с тобой сегодня'
            break
    }
    
    return (
        <h3 className="text-center">
                <span className={classes}>
                {phrase}
                </span>
        </h3>
    )
}

export default SearchStatus