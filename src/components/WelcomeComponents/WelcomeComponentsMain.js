import './WelcomeComponentsStyles.css'
import FeederComponentMain from "./FeederComponent/FeederComponentMain";
import FiltersComponentMain from "./FiltersComponent/FiltersComponentMain";
import {useState} from "react";
export default function WelcomeComponentsMain(){

    var [filters, setFilters] = useState({})

    var handleFiltersUpdate = (new_filters) => {
        console.log('New filters:', new_filters)
        setFilters(new_filters);
    }

    return (
        <div id={'welcome_main'}>
            <FiltersComponentMain onFiltersUpdate={handleFiltersUpdate}/>
            <FeederComponentMain receivedFilters={filters}/>
        </div>
    )
}