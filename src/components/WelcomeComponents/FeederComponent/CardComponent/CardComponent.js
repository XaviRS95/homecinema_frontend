import './CardComponentStyles.css'
import {Link} from "react-router-dom";
import genre_ids from '../../../../utils/genres.json'
export default function CardComponent(props){

    var content = props.content
    var pos = props.pos

    var image = 'data:image/jpg;base64,' + content['thumbnail']

    function getGenreNames(){

        console.log(genre_ids)

        var genres = ''

        for(var i=0; i< content.genre_ids.length; i++){
            genres += genre_ids[content.genre_ids[i]]
            if (i < (content.genre_ids.length - 1)){
                genres += ', '
            }
        }

        return (
            <p>{genres}</p>
        )

    }

    console.log(content.id, content.title)

    return (
        <div className={'content_card'} key={pos}>
            <Link to={{pathname: '/content/' + content.id}} state={content}>
                <div className={'content_card_image_div'}>
                        <img className={'content_card_image'} src={image} alt={'404'}/>
                    <div className={'content_info_div'}>
                        <p>{content.title}</p>
                        <p>{content.release_date}</p>
                        {getGenreNames()}
                    </div>
                    <div className={'content_card_descr'}></div>
                </div>
            </Link>
        </div>
    )

}