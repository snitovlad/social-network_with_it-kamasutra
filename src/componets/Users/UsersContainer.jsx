import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class UsersContainer extends React.Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
   }

   onPageChanged = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize);


      /* this.props.setCurrentPage(pageNumber);
       this.props.toggleIsFetching(true);
       usersAPI.getUsers(pageNumber, this.props.pageSize)  //здесь отдельный экземпляр axios для .get
          .then(data => {      //просто data вместо response, т.к. в promise вернули response.data (в api.js)
             this.props.toggleIsFetching(false);
             this.props.setUsers(data.items)
          })*/
   }

   render() {
      return <>
         {this.props.isFetching ? <Preloader /> : null}
         <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            //toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
         />
      </>
   }
}

let mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress
   }
}
/*let mapDispatchToProps = (dispatch) => {
   return {
      follow: (userId) => {
         dispatch(followAC(userId))
      },
      unfollow: (userId) => {
         dispatch(unfollowAC(userId))
      },
      setUsers: (users) => {
         dispatch(setUsersAC(users))
      },
      setCurrentPage: (pageNumber) => {
         dispatch(setCurrentPageAC(pageNumber))
      },
      setUsersTotalCount: (totalCount) => {
         dispatch(setUsersTotalCountAC(totalCount))
      },
      toggleIsFetching: (isFetching) => {
         dispatch(toggleIsFetchingAC(isFetching))
      }
   }
}*/

//let withRedirect = withAuthRedirect(UsersContainer);  //делаем редирект страницы если нет авторизации

//export default connect(mapStateToProps, {follow, unfollow, getUsers})(withRedirect);

export default compose(
   withAuthRedirect,
   connect(mapStateToProps, { follow, unfollow, getUsers })
)(UsersContainer)


