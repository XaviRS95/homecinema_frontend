import {useEffect, useState} from "react";
import axios from "axios";
import './FeederComponentStyles.css'
import CardComponent from "./CardComponent/CardComponent";
export default function FeederComponentMain({receivedFilters}){


    var [numberReceived, setNumberReceived] = useState(0)
    var [totalToReceive, setTotalToReceive] = useState(0)
    var [skip, setSkip] = useState(0);
    var [isLoading, setIsLoading] = useState(false);
    var [receivedData, setReceivedData] = useState([]);



    //Initial useEffect for initial loading
    useEffect(() => {
        getMoreApiRequest();
    }, [skip]);

    useEffect(() => {
        console.log('receivedFilters', receivedFilters)
        if (Object.keys(receivedFilters).length > 0) {
            getFilteredApiRequests(receivedFilters)
        }
    }, [receivedFilters]);

    //Used for calls to the API to initialize the results without filters or to obtain more results after a filtered search.
    var getMoreApiRequest = async () =>{
        console.log('apiRequest')
        setIsLoading(true)
        await axios.post(
            'http://0.0.0.0:8000/api/movies',
            {
                skip: skip,
                filters: receivedFilters,
            },
            {
                headers: {'Content-Type': 'application/json'}
            }).then(function (response){
            setIsLoading(false)
            setReceivedData(receivedData => [...receivedData, ...response.data['documents']]);
            setNumberReceived(response.data['documents'].length + numberReceived)
            setTotalToReceive(response.data['count'])
        }).catch(function (error){
            //console.log(error)
        })
    }

    //First call to the API after having applied filters
    var getFilteredApiRequests = async (filters) =>{
        console.log('getFilteredApiRequests')
        setIsLoading(true)
        await axios.post(
            'http://0.0.0.0:8000/api/movies',
            {
                skip: 0,
                filters: filters,
            },
            {
                headers: {'Content-Type': 'application/json'}
            }).then(function (response){
            setIsLoading(false)
            setReceivedData(response.data['documents']);
            setNumberReceived(response.data['documents'].length)
            setTotalToReceive(response.data['count'])
        }).catch(function (error){
            //console.log(error)
        })
    }



    function renderResults() {
        if (receivedData.length > 0){
            return (
                <div id={'feeder_content'}>
                    {receivedData.map((content, pos) => (
                        <CardComponent content={content} pos={pos}/>
                    ))}
                </div>
            )
        }
    }

    function renderMoreButton(){
        if(!isLoading){
            if(numberReceived < totalToReceive){
                return(
                    <div id="get_more_feeder_button" onClick={() => {
                        setSkip((skip) => skip + 1);
                    }}>
                        <p>+</p>
                    </div>
                )
            }
        }
        return null
    }

    return(
        <div id={'feeder_component_main'}>
            <p>{totalToReceive} Movies</p>
            {renderResults()}
            {renderMoreButton()}
        </div>
    )
}