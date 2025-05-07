import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-dash";
import { useParams } from "react-router-dom";
import { getMovieAPI, getWatchedTimeMovie, setWatchedTimeMovie } from "../api";
import "./VideoPlayer.css";

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { id } = useParams();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const getAndSetMovie = async (id) => {
            const response = await getMovieAPI(id);
            const movieUrl = `http://localhost:80/movies/${encodeURIComponent(response.data.file_path)}`;
            setUrl(movieUrl);

            if (videoRef.current) {
                const time = await getWatchedTimeMovie(response.data.id);
                if (time) {
                    videoRef.current.currentTime = time;
                }
            }
        };
        if (id) {
            getAndSetMovie(id);
        }
    }, [id]);

    useEffect(() => {
        if (url && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                fluid: true,
                techOrder: ["html5"],
                controlBar: {
                    children: [
                        "playToggle",
                        "currentTimeDisplay",
                        "progressControl",
                        "volumePanel",
                        "customControlSpacer",
                        "fullscreenToggle",
                        //"playbackRateMenuButton",
                    ],

                    volumePanel: {
                        inline: false,
                    },

                    //playbackRates: [0.5, 1, 2],

                    progressControl: {
                        seekBar: {
                            children: ["loadProgressBar", "playProgressBar", "seekHandle"],
                        },
                    },
                },

                sources: [
                    {
                        src: url,
                        type: "video/mp4", //"application/dash+xml",
                    },
                ],
            });

            const player = playerRef.current;

            const updateWatchedTime = async () => {
                if (videoRef.current) {
                    if (id) {
                        await setWatchedTimeMovie(id, parseInt(player.currentTime()))
                    }
                }
            };
            const interval = setInterval(updateWatchedTime, 5000);
            return () => clearInterval(interval);
        }
    }, [url, id]);

    return <div className="video-js-container">
        <div className="yolo">
            <video ref={videoRef} className="video-js vjs-default-skin" />
        </div>
    </div>
};

export default VideoPlayer;
