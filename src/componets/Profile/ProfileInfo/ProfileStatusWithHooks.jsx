import { useState } from "react"

const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState(false);
   const activateEditMode = () => {
      setEditMode(true);
   }
   const deactivateEditMode = () => {
      setEditMode(false);
      props.updateStatus(status); //отправили статус на сервер
   }

   let [status, setStatus] = useState(props.status);
   const onStatusChange = (event) => {
      setStatus (event.currentTarget.value);
   }


   return (
      <div>
         {!editMode &&
            <div>
                <span  onClick={activateEditMode}>{props.status || '--статус отсутствует--'}</span>  
            </div>
         }
         {editMode &&
            <div>
               <input  onChange={onStatusChange} onBlur={deactivateEditMode} value={status} autoFocus={true} 
                 />
            </div>
         }
      </div>
   )
}

   export default ProfileStatusWithHooks;
