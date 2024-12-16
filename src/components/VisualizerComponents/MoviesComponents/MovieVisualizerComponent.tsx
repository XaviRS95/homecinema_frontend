import './MovieVisualizerStyles.css'
import { useEffect, useRef, useState } from 'react';

import {
    isHLSProvider,
    MediaPlayer,
    MediaProvider,
    Poster,
    Track,
    type MediaCanPlayDetail,
    type MediaCanPlayEvent,
    type MediaPlayerInstance,
    type MediaProviderAdapter,
    type MediaProviderChangeEvent,
} from '@vidstack/react';
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

interface ComponentProps{
    id: string
    content: Object
}

const MovieVisualizerComponent: React.FC<ComponentProps> = ({id, content}) => {

    console.log(id)
    var content = content
    console.log('Component content:', content)

    let player = useRef<MediaPlayerInstance>(null),
        [src, setSrc] = useState('');

    useEffect(() => {
        // Initialize src.
        changeSource('480');

        // Subscribe to state updates.
        return player.current!.subscribe(({ paused, viewType }) => {
            // console.log('is paused?', '->', paused);
            // console.log('is audio view?', '->', viewType === 'audio');
        });
    }, []);

    function onProviderChange(
        provider: MediaProviderAdapter | null,
        nativeEvent: MediaProviderChangeEvent,
    ) {
        // We can configure provider's here.
        if (isHLSProvider(provider)) {
            provider.config = {};
        }
    }

    // We can listen for the `can-play` event to be notified when the player is ready.
    function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
        // ...
    }

    function changeSource(type: string) {
        switch (type) {
            case '480':
                setSrc('http://localhost:8000/api/movie_stream/'+id+'/'+id+'_480p.m3u8');
                break;
            case '720':
                setSrc('http://localhost:8000/api/movie_stream/'+id+'/'+id+'_720p.m3u8');
                break;
        }
    }

    return (
        <>
            <MediaPlayer
                className="player"
                src={src}
                title={content['title']}
                crossOrigin
                playsInline
                onProviderChange={onProviderChange}
                onCanPlay={onCanPlay}
                ref={player}
            >
                <MediaProvider>
                </MediaProvider>

                {/* Layouts */}
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                />
            </MediaPlayer>

            <div className="src-buttons">
                <div onClick={() => changeSource('480')}>480</div>
                <div onClick={() => changeSource('720')}>720</div>
            </div>
        </>
    );
}

export default MovieVisualizerComponent;
