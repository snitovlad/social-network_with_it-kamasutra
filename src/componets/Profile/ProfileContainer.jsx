import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../Redux/profile-reducer';
//import { useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter'; //вынесли в HOC с useParam отдельно
import React from 'react';

class ProfileContainer extends React.Component {

   componentDidMount() {
 
      //let userId = this.props.match.params.userId; //было так частный случай
      let userId = this.props.router.params.userId;  //более общий случай

      if (!userId) {  //если вдруг просто /profile без userId
         //userId = 29243;
         userId = this.props.authorizedUserId;
      }
      // if (!userId) {     //так почему то не работает. Сделали через модифицированный withAuthRedirect
      //    this.props.router.navigate('/login');
      // }

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
   status: state.profilePage.status,
   authorizedUserId: state.auth.userId,
   isAuth: state.auth.isAuth
})

export default compose(
   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
   withRouter, //создали отдельный HOC, в общем не нужен, так есть в withAuthRedirect
   withAuthRedirect //тоже hoc
)(ProfileContainer)

