import React from 'react';
// This imports the functional component from the previous sample.
import './MoviesComponentsStyles.css'
import MovieVisualizerComponent from "./MovieVisualizerComponent.tsx";
import {useLocation} from "react-router-dom";

export default function MoviesComponentsMain(props){

    const id = props.id
    const location = useLocation()
    const content = location.state

    console.log(content)

    return (
        <div id={'visualizer_root'}>
            <div id={'visualizer_movie_header'}>
            </div>
            <div id={'visualizer_movie_video'}>
                <MovieVisualizerComponent id={id} content={content}/>
            </div>
            <div>Rest of app here</div>
        </div>
    );
}