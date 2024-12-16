import './FiltersComponentStyles.css'
import {useState} from "react";
import Select from 'react-select';
import genre_ids from '../../../utils/genres.json'
export default function FiltersComponentMain({onFiltersUpdate}) {

    var [titleText, setTitleText] = useState('')

    var genreOptions = Object.entries(genre_ids).map(([key, value]) => ({
        value: key,
        label: value,
    }));

    const selectorStyles = {
        control: styles => ({ ...styles, backgroundColor: '#292929', color: '#9d9d9d'}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: '#1976d2',
                color: 'white',
                cursor: 'pointer'
            };
        },
        multiValue: (styles, {data}) => {
            return {
                ...styles,
                backgroundColor: '#1976d2',
                color: 'white'
            }
        }
    };



    const generateFilters = () => {
        var filters = {
            "title": {"$regex": titleText, "$options": "i"}

        };
        console.log('Obtaining '+ titleText)
        onFiltersUpdate(filters);
    };


    const handleChange = (event) => {
        setTitleText(event.target.value);
    };

    const handleKeyPress = (event) => {
        console.log('Event detected', event.key)
        if (event.key === 'Enter'){
            generateFilters()
        }
    };

        return (
            <div id={'filters_main'}>
                <div id={'filters_text'}>
                    <input type={'text'} id={'filter_input_name'} value={titleText} onChange={handleChange} onKeyDown={handleKeyPress}/>
                    <div id={'filter_input_btn'} onClick={generateFilters}>
                        <p>Search</p>
                    </div>
                </div>
                <div id={'filter_selects'}>
                    <Select
                        isMulti
                        name="genres"
                        options={genreOptions}
                        styles={selectorStyles}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            </div>
        )
    }