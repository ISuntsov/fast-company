import React from 'react';
import Select from 'react-select';
// import chroma from 'chroma-js';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            return {
                // backgroundColor: isDisabled
                //     ? undefined
                //     : isSelected
                //     ? data.color
                //     : isFocused
                //     ? color.alpha(0.1).css()
                //     : undefined,
                color: isDisabled ? '#ccc' : isSelected ? 'black' : data.color,
                // ? chroma.contrast(color, 'white') > 2
                //     ? 'white'
                //     : 'black'

                cursor: isDisabled ? 'not-allowed' : 'default'

                // ':active': {
                //     ...styles[':active'],
                //     backgroundColor: !isDisabled
                //         ? isSelected
                //             ? data.color
                //             : color.alpha(0.3).css()
                //         : undefined
                // }
            };
        },
        multiValue: (styles, { data }) => {
            // const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: data.color // color.alpha(0.1).css()
            };
        },
        multiValueLabel: (styles, { data }) => {
            return {
                ...styles,
                color: 'white', // data.color
                backgroundColor: data.color
            };
        }
        // multiValueRemove: (styles, { data }) => ({
        //     ...styles,
        //     color: data.color,
        //     ':hover': {
        //         backgroundColor: data.color,
        //         color: 'white'
        //     }
        // })
    };

    return (
        <div className="mb-4">
            <label htmlFor="" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                name={name}
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                styles={colourStyles}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
