import React from "react";

const StoreContext = React.createContext(null); //создали контекстную компоненту

export const Provider = (props) => {        //инкапсулировали StoreContext (скрыли детали)
   return <StoreContext.Provider value={props.store}>
      {props.children}
   </StoreContext.Provider>
}

export default StoreContext;