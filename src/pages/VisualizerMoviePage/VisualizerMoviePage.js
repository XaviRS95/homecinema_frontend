import {useParams} from "react-router-dom";
import MoviesComponentsMain from "../../components/VisualizerComponents/MoviesComponents/MoviesComponentsMain";
export default function VisualizerMoviePage(){

   var content_id = useParams().id

return (
    <MoviesComponentsMain id={content_id}/>
)

}