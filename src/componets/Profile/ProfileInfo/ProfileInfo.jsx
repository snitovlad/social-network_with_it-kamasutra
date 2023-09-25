import Preloader from '../../common/Preloader/Preloader';
import { photo } from '../../common/UserPhoto/userPhoto';
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

let ProfileInfo = (props) => {

   if (!props.profile) {  //если нету profile, то вернуть крутилку (работает только с null (profile: null) 
      return <Preloader />  //не работает с (profile: []) будет ошибка при обращении к вложенному объекту)
   }                          // нужно условие ({props.profile&&props.profile.contacts&&props.profile.contacts.facebook})

   return (
      <div>

         {/* <div className={s.imageProfile}>  
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' alt="img"/>
         </div> */}

         <div className={s.descriptionBlock}>
            {photo(props.profile, 'large')}
            {/* <img src={props.profile.photos.large} alt="photo" /> */}
            <div>Полное имя: {props.profile.fullName}</div>
            <div>------</div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            <div>------</div>
            <div>Обо мне: {props.profile.aboutMe}</div>
            <div>Контакты: {props.profile.contacts.facebook}</div>
            <div>Контакты: {props.profile.contacts.vk}</div>
            <div>Поиск работы: {props.profile.lookingForAJobDescription}</div>
         </div>

      </div>
   );
}

export default ProfileInfo;