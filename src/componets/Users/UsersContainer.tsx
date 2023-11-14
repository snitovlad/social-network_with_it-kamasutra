import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../Redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/redux-store';

type MapStatePropsType = {
   currentPage: number
   pageSize: number
   isFetching: boolean
   totalUsersCount: number
   users: Array<UserType> //<UserType> импортировали из '../../types/types'
   followingInProgress: Array<number>
}

type MapDispatchPropsType = {
   requestUsers: (currentPage: number, pageSize: number) => void
   follow: (userId: number) => void
   unfollow: (userId: number) => void
}

type OwnPropsType = {
   pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
   // constructor(props) {
   //    super(props);
   // }
   // componentDidMount() {
   //    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
   // }

   //локальная деструктуризация параметров в классовых компонентах внутри метода
   componentDidMount() {
      let { currentPage, pageSize } = this.props;
      this.props.requestUsers(currentPage, pageSize);
   }

   // onPageChanged = (pageNumber) => {
   //    this.props.requestUsers(pageNumber, this.props.pageSize);
   // }

   //локальная деструктуризация параметров в классовых компонентах внутри метода
   onPageChanged = (pageNumber: number) => {
      let { pageSize } = this.props;
      this.props.requestUsers(pageNumber, pageSize);
   }

   render() {
      return <>
         <h2>{this.props.pageTitle}</h2>
         {this.props.isFetching ? <Preloader /> : null}
         <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
         />
      </>
   }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {  //сделали дополнительную проверку MapStatePropsType
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state)
   }
}


export default compose(
   //withAuthRedirect,
   connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
      { follow, unfollow, requestUsers }) )(UsersContainer)


