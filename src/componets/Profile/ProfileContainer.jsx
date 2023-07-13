import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../Redux/profile-reducer';
//import { useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter'; //вынесли в HOC с useParam отдельно

/*export function withRouter(Component) {  //добавили вместо withRouter т.к. в 2023 уже не работает
   return (props) => {
      const match = {params: useParams()};
      return <Component {...props} match={match} />
   }
}
*/

class ProfileContainer extends React.Component {
   
   componentDidMount() {
      let userId = this.props.match.params.userId;
      if (!userId) {  //если вдруг просто /profile без userId
         userId = 29243;
      }     
         this.props.getUserProfile(userId);
         //setTimeout (() => {this.props.getStatus(userId);}, 1000)
         this.props.getStatus(userId);
   }

   render() {
      return (
         <Profile {...this.props} profile={this.props.profile} 
                  status={this.props.status} updateStatus={this.props.updateStatus} />
      );
   }

}


let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status
})

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)  //делаем редирект страницы если нет авторизации
//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //обернули ProfileContainer в withRouter
//export default connect( mapStateToProps, {getUserProfile} )(WithUrlDataContainerComponent);  //все обернули в connect

export default compose(
   connect( mapStateToProps, {getUserProfile, getStatus, updateStatus} ),
   withRouter, //создали отдельный HOC
   //withAuthRedirect //тоже hoc
)(ProfileContainer)

