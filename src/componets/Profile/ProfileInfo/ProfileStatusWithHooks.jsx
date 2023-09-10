import { useEffect, useState } from "react"

const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(props.status);

   useEffect( () => {
      setStatus(props.status)
   }, [props.status]);  //зависимость вызова useEffect


   const activateEditMode = () => {
      setEditMode(true);
   }

   const deactivateEditMode = () => {
      setEditMode(false);
      props.updateStatus(status); //отправили статус на сервер
   }

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
