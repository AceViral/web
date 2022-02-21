import s from "./NewNavbar.module.css";
import "boxicons";
import { NavLink } from "react-router-dom";

const NewNavbar = () => {
   const list = document.querySelectorAll("li");
   function activeLink() {
      list.forEach((item) => item.classList.remove(s.active));
      this.classList.add(s.active);
   }
   list.forEach((item) => item.addEventListener("click", activeLink));
   return (
      <div className={s.navigation}>
         <ul>
            <li className={(s.list, s.active)}>
               <NavLink to="/home" activeClassName={s.active}>
                  <span className={s.icon}>
                     <box-icon name="home"></box-icon>
                  </span>
                  <span className={s.text}>Home</span>
               </NavLink>
            </li>
            <li className={(s.list, s.active)}>
               <NavLink to="/profile" activeClassName={s.active}>
                  <span className={s.icon}>
                     <box-icon type="solid" name="face"></box-icon>
                  </span>
                  <span className={s.text}>Profile</span>
               </NavLink>
            </li>
            <li className={(s.list, s.active)}>
               <NavLink to="/dialogs" activeClassName={s.active}>
                  <span className={s.icon}>
                     <box-icon name="message-square" type="solid"></box-icon>
                  </span>
                  <span className={s.text}>Messages</span>
               </NavLink>
            </li>
            <li className={(s.list, s.active)}>
               <NavLink to="/users" activeClassName={s.active}>
                  <span className={s.icon}>
                     <box-icon type="solid" name="user-account"></box-icon>
                  </span>
                  <span className={s.text}>Users</span>
               </NavLink>
            </li>
            <li className={(s.list, s.active)}>
               <NavLink to="/login" activeClassName={s.active}>
                  <span className={s.icon}>
                     <box-icon name="category-alt"></box-icon>
                  </span>
                  <span className={s.text}>Login</span>
               </NavLink>
            </li>
            {/* <div className={s.indicator}></div> */}
         </ul>
      </div>
   );
};

export default NewNavbar;
