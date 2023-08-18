import { NavLink } from 'react-router-dom';
import s from './Header.module.css'

const Header = (props) => {
   return <header className={s.header}>
          <div>
            <img src="https://fikiwiki.com/uploads/posts/2022-02/1645039762_1-fikiwiki-com-p-kartinki-logotipov-1.jpg" alt="logo"/>
            <div className={s.loginBlock}>
              {props.isAuth 
              ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> 
              : <NavLink to={'/login'}>Login</NavLink>}
            </div>
          </div>
        </header>
}

export default Header;