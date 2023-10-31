import { type } from "os"

type FriendsType = {
   id: number
   name: string
}

type InitialStateType = typeof initialState;

let initialState = {
   friends: [
      { id: 1, name: "Andrey" },
      { id: 2, name: "Sasha" },
      { id: 3, name: "Sveta" }
   ] as Array<FriendsType>
}

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
   return state;
}

export default sidebarReducer;