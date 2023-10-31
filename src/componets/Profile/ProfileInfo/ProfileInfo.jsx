import Preloader from '../../common/Preloader/Preloader';
import { photo } from '../../common/UserPhoto/userPhoto';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

   //let [editMode, setEditMode] = useState(false); //добавили локальный state

   if (!props.profile) {  //если нету profile, то вернуть крутилку (работает только с null (profile: null) 
      return <Preloader />  //не работает с (profile: []) будет ошибка при обращении к вложенному объекту)
   }                          // нужно условие ({props.profile&&props.profile.contacts&&props.profile.contacts.facebook})

   const onMainPhotoSelected = (e) => { //обработчик событий при клике по кнопке file
      if (e.target.files.length) {  //можно (e.target.files[0])
         //при клике по кнопке вызываем коллбэк savePhoto. Он передан из ProfileContainer из connect
         props.savePhoto(e.target.files[0]);
      }
   }

   // const handleSubmit = (values, { setSubmitting }) => {
   //    setTimeout(() => {
   //       alert(JSON.stringify(values, null, 2));
   //       setSubmitting(false);
   //    }, 4000);
   // }

   const handleSubmit = (values, { setSubmitting }) => {
      props.saveProfile(values);
      setSubmitting(false);
   }

   return (
      <div>

         {/* <div className={s.imageProfile}>  
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' alt="img"/>
         </div> */}

         <div className={s.descriptionBlock}>
            {photo(props.profile, 'large')}
            {/* <img src={props.profile.photos.large || userPhoto} alt="photo" /> */}

            {/* покажем кнопку выбора файла аватарки, если это наш профиль */}
            <div className={s.addPhotoButton}>
               {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            </div>
            <div >
               {/* покажем режим редактирования если editMode: true */}
               {props.editMode
                  ? <ProfileDataForm profile={props.profile}
                     handleSubmit={handleSubmit} error={props.error} />
                  : <ProfileData goToEditMode={() => { props.setEditMode(true) }}
                     profile={props.profile} isOwner={props.isOwner} />}
            </div>
            {/* <div><ProfileData profile={props.profile}/></div> */}

            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
         </div>

      </div>
   );
}


//компонент для данных в профиле
const ProfileData = ({ profile, isOwner, goToEditMode }) => {

   return <div>
      {/* покажем кнопку режима редактирования если Owner */}
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

      <div>
         <b>Full name</b>: {profile.fullName}
      </div>
      <div>
         <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {
         profile.lookingForAJob &&
         <div>
            <b>My skills</b>: {profile.lookingForAJobDescription}
         </div>
      }
      <div>
         <b>About me</b>: {profile.aboutMe}
      </div>
      {(Object.keys(profile.contacts).filter(key => {
         return profile.contacts[key] != "" && profile.contacts[key] != null
      })) != false        //если нет контактов вообще - скрывает всё вместе с надписью Contacts
         ? <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
               return (
                  profile.contacts[key] //скрываем контакты внутри Contacts, если там ничего нет
                     ? <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                     : null
               )
            })
            }
         </div>
         : null}
   </div>
}

//компонент для контактов
const Contact = ({ contactTitle, contactValue }) => {
   return <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
   </div>
}



export default ProfileInfo;