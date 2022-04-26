import styles from "./styles.module.scss";
import TextField from "../../components/Inputs/TextField";
import {useRef, useState} from "react";
import Select from "../../components/Inputs/Select";
import Button from "../../components/Button";
import axios from 'axios';
import {toast} from "react-toastify";

const genres = [
    {name: "HipHop", value: "HipHop"},
    {name: "Pop", value: "Pop"},
    {name: "Funk", value: "Funk"},
    {name: "Jazz", value: "Jazz"},
    {name: "Trap", value: "Trap"},
    {name: "Country", value: "Country"},
    {name: "Blues", value: "Blues"},
    {name: "KPop", value: "KPop"},
    {name: "Instrumental", value: "Instrumental"}
];

const UploadSong = () => {
    const songRef = useRef();
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const onInputFileChange = (event) => {
        setFile(event.target.files[0].type === 'audio/mpeg' ? event.target.files[0] : null);
    };
    const onInputImageChange = (event) => {
        setImage(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' ? event.target.files[0] : null);
    };
    const [data, setData] = useState({
        title: "",
        release: "",
        genre: "",
    });
    const handleInputState = (name, value) => {
        setData((data) => ({...data, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('song', file)
        formData.append('image', image)
        formData.append('title', data.title)
        formData.append('genre', data.genre)
        formData.append('release', data.release)
        if (file && image) {
            await axios.post('http://localhost:3002/songs/post/', formData)
                .then((response) => {
                    toast.success('Upload Success');
                    console.log(response.data)
                })
                .catch((e) => {
                    toast.error('Upload Error')
                    console.log(e)
                })

        } else if (!file) {
            toast.error('Please select a proper audio file !')
        } else if (!image) {
            toast.error('Please select a proper image file !')
        }

    };
    return (
        <div className={styles.container}>
            <h1>Upload Your Music</h1>
            <div className={styles.scroll__container}>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <div className={styles.input_container}>
                        <TextField
                            label="Title"
                            placeholder="Enter the song title"
                            name="title"
                            handleInputState={handleInputState}
                            value={data.title}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            label="Album Name"
                            placeholder="Enter the song's album "
                            name="release"
                            handleInputState={handleInputState}
                            value={data.release}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <Select
                            name="genre"
                            handleInputState={handleInputState}
                            label="Genre"
                            placeholder="Select your music type"
                            options={genres}
                            value={data.genre}
                            required={true}
                        />
                    </div>
                    <div>
                        <input
                            accept={".mp3,.wav"}
                            ref={songRef}
                            type="file"
                            onChange={onInputFileChange}
                            style={{display: "none"}}/>
                        <input
                            type={"button"}
                            className={styles.primary_btn}
                            // isFetching={}
                            onClick={() => songRef.current.click()}
                            value={"Upload Song"}
                        />

                        <input
                            accept={".png,.jpg,.jpeg"}
                            ref={imageRef}
                            type="file"
                            onChange={onInputImageChange}
                            style={{display: "none"}}/>
                        <input
                            type={"button"}
                            className={styles.primary_btn}
                            // isFetching={}
                            onClick={() => imageRef.current.click()}
                            value={"Upload Cover"}/>
                    </div>
                    <div className={styles.custom}>
                        {file && (
                            <audio
                                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                controls

                            />
                        )}
                    </div>
                    <Button label="Upload Your Song"
                            style={{width: "18rem", marginBottom: "150px", marginTop: "20px", marginLeft: '130px'}}/>
                </form>
                <div className={styles.custom}>
                    {image && (
                        <img
                            src={typeof image === "string" ? image : URL.createObjectURL(image)}
                            alt="file"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadSong;
