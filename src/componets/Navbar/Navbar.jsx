import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import Friends from './Friends/Friends';
import StoreContext from '../../StoreContext';

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
    <StoreContext.Consumer>{   // >{ должно быть без пробела или { с новой строки
      (store) => {
        let state = store.getState().sidebar;
        let friendsPerson = state.friends.map(fri => <Friends key={fri.id} id={fri.id} name={fri.name} />)
        //let friendsPerson = props.state.friends.map(fri => <Friends key={fri.id} id={fri.id} name={fri.name} />)

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
                {friendsPerson}
              </div>
            </div>
          </nav>
        );
      }
    }
    </StoreContext.Consumer>
  )
}

export default Navbar;