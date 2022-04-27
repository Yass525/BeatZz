    
    import Song from "../../components/Song";
    import Playlists from "../../components/Playlists";
    import { IconButton } from "@mui/material";
    import peaches from "../../images/peaches.jpg";
    import playlistImg from "../../images/rock.jpg";
    import SearchIcon from "@mui/icons-material/Search";
    import ClearIcon from "@mui/icons-material/Clear";
    import styles from "./styles.module.scss";
    import { track } from "./track";
    import {Table} from "./Table";
    import axios from "axios";
    import { useEffect, useState } from "react";
    import "./app.css";
    import Mic from "./mick.svg";


    function Search() {
        const [query, setQuery] = useState("");
        const [data, setData] = useState(null);

        const clickHandle = async()=>{   
        const res = await axios.get(`http://localhost:3002/scrap/getmusic/${query}`)
        setData(res.data.lyrics);
      };
   
      const speack = async()=>{   
        const res = await axios.get(`http://localhost:3002/search/getmusic`)
        setData(res.data.lyrics);
      };
         
      //console.log(data);
        return (
          <div className="app">
              
              <IconButton type="button" style={{color:"white"}} onClick={clickHandle}
              
              >Search🎼
              <SearchIcon />
              </IconButton>
              <input
              
                className="app"
                placeholder="Search for Lyrics..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />

            
            <div className="app">
            <h3>Click the Mic and Speeck</h3>
            <div>
                <img className="microphone"
                    src={Mic}
                    alt="microphone"
                    onClick={speack}
                />
            </div>
        
      </div>
                    
                    <div onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                
            
            {<Table data={data} />}

          </div>);



          
        

        }
    
export default Search;
