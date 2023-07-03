import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../Redux/profile-reducer';
import { Navigate, useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';


export function withRouter(Component) {  //добавили вместо withRouter т.к. в 2023 уже не работает
   return (props) => {
      const match = {params: useParams()};
      return <Component {...props} match={match} />
   }
}

/* function withRouter(Component) {  //добавили вместо withRouter т.к. в 2023 уже не работает. Общий случай
      function ComponentWithRouterProp(props) {
         let location = useLocation();
         let navigate = useNavigate();
         let params = useParams();
         return ( 
            <Component {...props} router={{location, navigate, params}} />
         )
         return ComponentWithRouterProp;
   }
   export default connect( mapStateToProps, {setUserProfile} )(ComponentWithRouterProp(ProfileContainer)); 
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

      if (!this.props.isAuth) return <Navigate to='/login' />  //делаем редирект страницы при отсутствии аутентификации

      return (
         <Profile {...this.props} profile={this.props.profile} />
      );
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer) //обернули ProfileContainer в withRouter

export default connect( mapStateToProps, {getUserProfile} )(WithUrlDataContainerComponent);  //все обернули в connect

