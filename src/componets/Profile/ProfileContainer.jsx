import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profile-reducer';
import { useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';


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
      if (!userId) {  //если просто /profile без userId
         userId = 29243;
      }

      axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId  )
         .then(response => {
            this.props.setUserProfile(response.data);
         })
   }
   render() {
      return (
         <Profile {...this.props} profile={this.props.profile} />
      );
   }
}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer) //обернули ProfileCjntainer в withRouter
export default connect( mapStateToProps, {setUserProfile} )(WithUrlDataContainerComponent);  //все обернули в connect

