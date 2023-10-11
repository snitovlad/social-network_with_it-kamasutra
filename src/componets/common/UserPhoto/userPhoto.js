import userPhoto from '../../../assets/images/user.png'
import styles from './userPhoto.module.css'

export const photo = (user, photoSize) => (
   <img src={user.photos[photoSize] != null
      ? user.photos[photoSize]
      : userPhoto}
      className={styles.userPhoto + ' ' + styles[photoSize]} alt="photo" />
)