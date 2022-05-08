  import { Fragment } from "react";

  import Home from '../../components/Home/Home.jsx'

  import styles from "./styles.module.scss";
  const RoomPage = () => {
  	return (
              <Fragment>
            <div className={styles.container}>
              <Home></Home>
  		</div>
              </Fragment>
  	);
  };

  export default RoomPage;
