import { useEffect, useRef } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

videojs.registerPlugin('qualityLevels', videojs.getPlugin('qualityLevels'));
videojs.registerPlugin('hlsQualitySelector', videojs.getPlugin('hlsQualitySelector'));

export default function Visualizer(props) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { id, options, onReady } = props;

    useEffect(() => {
        if (!playerRef.current) {
            // Create a new video.js element and player
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-fill');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {

                videojs.log('player is ready');
                onReady && onReady(player);
            });

            // Set sources after player creation to avoid loading issues
            player.src([
                {
                    src: `http://localhost:8000/api/movie_stream/${id}/${id}_480p.m3u8`,
                    type: 'application/x-mpegURL',
                    label: "480p",
                    res: 480,
                },
                {
                    src: `http://localhost:8000/api/movie_stream/${id}/${id}_720p.m3u8`,
                    type: 'application/x-mpegURL',
                    label: "720p",
                    res: 720,
                },
            ]);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [id, options, onReady]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}
