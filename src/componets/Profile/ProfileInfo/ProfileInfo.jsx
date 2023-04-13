import s from './ProfileInfo.module.css'

function ProfileInfo() {
   return (
      <div>
         <div className={s.imageProfile}>
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' />
         </div>
         <div className={s.descriptionBlock}>
            Ava + description
         </div>
         
      </div>
   );
}

export default ProfileInfo;