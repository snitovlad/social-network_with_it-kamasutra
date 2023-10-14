import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto } from '../../Redux/profile-reducer';
//import { useParams } from 'react-router-dom'; //import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter'; //вынесли в HOC с useParam отдельно
import React from 'react';

class ProfileContainer extends React.Component {

   refreshProfile() { //создали вспомогательный метод, чтобы не было дублирования кода
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

   componentDidMount() {
      this.refreshProfile();
   }

   //устраняем баг, чтобы показывало наш профиль при клике на Profile после перехода от клика по юзеру
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.router.params.userId != prevProps.router.params.userId) { //условие чтобы не было зацикленности
         this.refreshProfile();
      }
   }

   render() {
      return (
         <Profile {...this.props}
            isOwner={!this.props.router.params.userId} //если нет id то я собственник - булево значение (для фото аватарки)
            savePhoto={this.props.savePhoto}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus} />
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
   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
   withRouter, //создали отдельный HOC, в общем не нужен, так есть в withAuthRedirect
   withAuthRedirect //тоже hoc
)(ProfileContainer)

