import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

//Это переменная для класса .active для className в NavLink
const activeLink = ({ isActive }) => isActive ? s.active : s.item; //здесь вызов класса className={activeLink}

/*const activeLink = () => {   //здесь вызов класса className={activeLink()}
  return (
    select => select.isActive ? s.active : s.item
  );
}*/

//className={classActive => classActive.isActive ? s.active : s.item}  //или просто так вставить в NavLink

const Navbar = (props) => {

        return (

          <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
              <NavLink to="/profile" className={activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to="/dialogs" className={activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to="/news" className={activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to="/music" className={activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to="/setting" className={activeLink}>Setting</NavLink>
            </div>
            <div className={s.item + ' ' + s.friends}>
              <NavLink to="/friends" className={activeLink}>Friends</NavLink>
              <div className={s.friendsPersons}>
                {props.friendsPerson}
              </div>
            </div>
          </nav>
        );
      }
 

export default Navbar;