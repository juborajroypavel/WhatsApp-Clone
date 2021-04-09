import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );

};

export const useStateValue = () => {
  return useContext(StateContext);
};




// import React, { createContext, useContext, useReducer } from "react";

// export const StateContext = createContext();

// export const StateProvider = (props) => {
//   <StateContext.Provider value={useReducer(props.reducer, props.intialState)}>
//     {props.children}
//   </StateContext.Provider>
// }

// export const useStateValue = useContext(StateContext);