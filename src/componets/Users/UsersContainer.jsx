import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { followAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, unfollowAC } from '../../Redux/users-reducer';
import Users from './Users';

class UsersContainer extends React.Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersTotalCount(response.data.totalCount);
         })
   }

   onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsers(response.data.items)
         })
   }

   render() {
      return <Users
         users={this.props.users}
         currentPage = {this.props.currentPage}
         totalUsersCount={this.props.totalUsersCount}
         pageSize={this.props.pageSize}
         onPageChanged={this.onPageChanged}
         follow = {this.props.follow}
         unfollow = {this.props.unfollow}
      />
   }
}

let mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage
   }
}

let mapDispatchToProps = (dispatch) => {
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
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


