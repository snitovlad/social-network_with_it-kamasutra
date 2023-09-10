import { createSelector } from "reselect";

export const getUsersSelector = (state) => {  //наш примитивный селектор
   return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => { //наш реселектор с фейковой функцией
   return users.filter(u => true);  //реселектор сделан для знакомства с библиотекой
});

export const getPageSize = (state) => {
   return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state) => {
   return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
   return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
   return state.usersPage.followingInProgress;
}


