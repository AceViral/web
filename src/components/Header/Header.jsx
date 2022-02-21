import { NavLink } from "react-router-dom";
import logo from "../../logo.svg";
import s from "./Header.module.css";
import NewNavbar from "../NewNavbar/NewNavbar";
import userPhoto from "../../assets/images/person.png";
import { connect } from "react-redux";

const Header = (props) => {
   return (
      <header className={s.header}>
         <span className={s.logo}>
            <img src={logo} alt="logo" />
            <span className={s.text}>Social Network</span>
         </span>
         <NewNavbar />
         <span className={s.loginBlock}>
            {props.isAuth ? (
               <div className={s.userBlock}>
                  <div className={s.userName}>{props.login}</div>
                  <img src={userPhoto} />
                  <span className={s.userButton}>
                     <a onClick={props.logout}>Log out</a>
                  </span>
               </div>
            ) : (
               <div className={s.userBlock}>
                  <div className={s.userName}>{props.login}</div>
                  <NavLink to={"login"}>Login</NavLink>
                  <img src={userPhoto} />
               </div>
            )}
         </span>
      </header>
   );
};
let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
});
export default connect(mapStateToProps, {})(Header);
