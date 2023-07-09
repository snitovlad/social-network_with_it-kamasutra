import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../Redux/profile-reducer';
//import { useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';

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
   }

   render() {
      return (
         <Profile {...this.props} profile={this.props.profile} />
      );
   }

}


let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
})

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)  //делаем редирект страницы если нет авторизации
//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //обернули ProfileContainer в withRouter
//export default connect( mapStateToProps, {getUserProfile} )(WithUrlDataContainerComponent);  //все обернули в connect

export default compose(
   connect( mapStateToProps, {getUserProfile} ),
   withRouter, //создали отдельный HOC
   withAuthRedirect //тоже hoc
)(ProfileContainer)

