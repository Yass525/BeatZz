import styles from "./styles.module.scss";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Button from "../../components/Button";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";


const scopes = [
    {name: "Private", value: "PRIVATE"},
    {name: "Public", value: "PUBLIC"},
    {name: "Friends Only", value: "FRIENDS_ONLY"},
];
const AddPlaylist = () => {
    const { user } = useSelector((state) => state.user);
    const [data, setData] = useState({
        title: "",
        scope: "",
        songs: [],
    });
    const handleInputState = (name, value) => {
        setData((data) => ({...data, [name]: value}));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3002/playlists/post', data)
            .then((response) => {
                toast.success('Upload Success');
                console.log(response.data)
            })
            .catch((e) => {
                toast.error('Upload Error')
                console.log(e)
            })
        console.log(data)
    };
    return (
        <div className={styles.container}>
            <h1>Create Your Playlist</h1>
            <div className={styles.scroll__container}>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <div className={styles.input_container}>
                        <TextField
                            label="Playlist Name"
                            placeholder="What do you want to name your playlist"
                            name="title"
                            handleInputState={handleInputState}
                            value={data.title}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <Select
                            name="scope"
                            handleInputState={handleInputState}
                            label="Type"
                            placeholder="What type of playlists do you want"
                            options={scopes}
                            value={data.scope}
                            required={true}
                        />
                    </div>
                    <Button label="Create"
                            style={{width: "18rem", marginBottom: "150px", marginTop: "20px", marginLeft: '130px'}}/>
                </form>
            </div>
        </div>
    );
};

export default AddPlaylist;
