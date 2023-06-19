import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'

let ProfileInfo = (props) => {

   if (!props.profile) {  //если нету profile, то вернуть крутилку
      return <Preloader />
   }

   return (
      <div>

         <div className={s.imageProfile}>
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' alt="img"/>
         </div>

         <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large} alt="photo" />
            <div>Полное имя: {props.profile.fullName}</div>
            <div>Обо мне: {props.profile.aboutMe}</div>
            <div>Контакты: {props.profile.contacts.facebook}</div>
            <div>Контакты: {props.profile.contacts.vk}</div>
            <div>Поиск работы: {props.profile.lookingForAJobDescription}</div>
            Ava + description
         </div>
         
      </div>
   );
}

export default ProfileInfo;