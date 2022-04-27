import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Song from "../../components/Song";
import {assert} from "joi";
import Playlists from "../../components/Playlists";
import playlistImg from "../../images/rock.jpg";

const Songs =  () => {
    const playlists = [
        { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
    ];
    const [songs,setSongs] = useState(null);
    useEffect(async () => {
        await axios.get('http://localhost:3002/songs/get-songs')
            .then((response) => {
                setSongs(response.data)
            })
    }, []);
    if (!songs){
        return (
            <div>
                <h1 style={{textAlign: "center", marginTop: '40px'}}>No songs</h1>
            </div>
        )
    }
    console.log(songs)
    return (
        <div className={styles.container}>
            <h1>My Songs</h1>
            <div className={styles.songs}>
                {songs.song.map((song,index) => (
                    <Song song={song} key={index}/>
                ))}
            </div>
            <h1>My Albums</h1>
            <div className={styles.scroll__container}>
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />

            </div>
            <h1>My Playlists</h1>
            <div className={styles.scroll__container}
                 style={{ marginBottom:"150px" }}
            >
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />
                <Playlists playlists={playlists} />

            </div>
        </div>
    )
}
export default Songs;
