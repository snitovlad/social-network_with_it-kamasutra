import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {  //наш примитивный селектор
   return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => { //наш реселектор с фейковой функцией
   return users.filter(u => true);  //реселектор сделан для знакомства с библиотекой
});

export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
   return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
   return state.usersPage.followingInProgress;
}


