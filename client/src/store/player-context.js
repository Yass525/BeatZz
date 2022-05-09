import {createContext, useState} from "react";
import axios from "axios";

const PlayerContext = createContext({
    song: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    songImage: '',
    nextSong: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    prevSong: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    playing: false,
    playSong: (song, songImage, prevSong, nextSong)=>{},
});

export function PlayerContextProvider (props)  {
    const [songCtx, setSongCtx] = useState({
        title: "",
        release: "",
        genre: "",
        artists: [],
    });
    const [playingCtx,setPlayingCtx] = useState(false);
    const [prevSongCtx, setPrevSongCtx] = useState(null);
    const [nextSongCtx, setNextSongCtx] = useState(null);
    const [songTrackCtx , setSongTrackCtx] = useState('');
    const [songImageCtx, setSongImageCtx] = useState('');

    const playSongHandler = async (song, songImage, prevSong, nextSong) => {
        setSongCtx(song)
        setSongImageCtx(songImage)
        setPrevSongCtx(prevSong)
        setNextSongCtx(nextSong)
        setPlayingCtx(true)        
        await axios.get('http://www.beatzz.tech:3002/songs/get-track/' + song._id, {
            responseType: 'arraybuffer',
        }).then(response => {
            const arrayBuffer = response.data;
            const blob = new Blob([arrayBuffer], {type: "audio/mpeg"});
            const url = window.URL.createObjectURL(blob);
            const audio = document.getElementById('audio')
            setSongTrackCtx(url)
            audio.play();
        })

    }
    const context = {
        song: songCtx,
        songTrack: songTrackCtx,
        songImage: songImageCtx,
        prevSong : prevSongCtx,
        nextSong: nextSongCtx,
        playing: playingCtx,
        playSong: playSongHandler,
    }
    return(
        <PlayerContext.Provider value={context}>
            {props.children}
        </PlayerContext.Provider>
    );
}
export default PlayerContext;
