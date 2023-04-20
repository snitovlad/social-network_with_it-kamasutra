
import s from './Friends.module.css'

const Friends = (props) => {

  return (        
          <div className={s.friendsItem}>
            <div className={s.friendsAvatar}>
            </div>
            <div className={s.friendsName}>
              {props.name}
            </div>
          </div>
  );
}

export default Friends;