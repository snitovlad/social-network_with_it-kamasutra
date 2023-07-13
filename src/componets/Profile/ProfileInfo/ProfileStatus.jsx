import React from "react";


class ProfileStatus extends React.Component {

   state = {
      editMode: false,
      status: this.props.status
   }

   activateEditMode = () => {
      this.setState({  //это асинхронный метод, внутрь к-рого передаем объект, к-рый перезапишет св-ва в локальном state
         editMode: true
      })
   }
   //получается, что срабатывает и олдскульный метод с bind выше, и стрелочная ф-ция без bind ниже

   deactivateEditMode = () => {  //человек перестал редактировать
      this.setState({  //это асинхронный метод, внутрь к-рого передаем объект, к-рый перезапишет св-ва в локальном state
         editMode: false
      });
      this.props.updateStatus(this.state.status);
   }

   onStatusChange = (event) => {
      this.setState ({     //в state меняем только св-во status
         status: event.currentTarget.value  //получили новое значение value
      });
   }

   render() {
      return (
         <div>
            {!this.state.editMode &&
               <div>
                   <span  onClick={this.activateEditMode}>{this.props.status || '--статус отсутствует--'}</span>  {/*ставили onDoubleClick */}
               </div>
            }
            {this.state.editMode &&
               <div>
                  <input onChange={this.onStatusChange} autoFocus={true} 
                  onBlur={this.deactivateEditMode} value={this.state.status} />
            {/* onBlur - срабатывает когда уходит фокус с элемента    */}
            {/* autoFocus={true} - автоматически помещает фокус в input */}
               </div>
            }
         </div>
      )
   }
}

export default ProfileStatus;