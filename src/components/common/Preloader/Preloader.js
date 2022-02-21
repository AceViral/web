import "boxicons";
import s from "./Preloader.module.scss";

let Preloader = () => {
   return (
      <div className={s.preloader}>
         <box-icon
            name="loader-alt"
            flip="horizontal"
            animation="spin"
            color="#61dbfb"
         ></box-icon>
      </div>
   );
};

export default Preloader;
