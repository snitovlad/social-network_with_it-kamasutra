import React from "react";


class ProfileStatus extends React.Component {

   state = {
      editMode: false
   }

   activateEditMode = () => {
      this.setState({  //это асинхронный метод, внутрь к-рого передаем объект, к-рый перезапишет св-ва в локальном state
         editMode: true
      })
   }
   //получается, что срабатывает и олдскульный метод с bind выше, и стрелочная ф-ция без bind ниже

   deactivateEditMode() {
      this.setState({  //это асинхронный метод, внутрь к-рого передаем объект, к-рый перезапишет св-ва в локальном state
         editMode: false
      })
   }

   render() {
      return (
         <div>
            {!this.state.editMode &&
               <div>
                  <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
               </div>
            }
            {this.state.editMode &&
               <div>
                  <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} />
            {/* onBlur - срабатывает когда уходит фокус с элемента    */}
            {/* autoFocus={true} - автоматически помещает фокус в input */}
               </div>
            }
         </div>
      )
   }
}

export default ProfileStatus;