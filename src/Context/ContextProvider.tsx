import React, { useReducer, useEffect } from "react";

// Context store and reducer
import Context, { initialState } from "./store";
import reducer from "./reducer";

// Types
import {
  ADD_COLUMN,
  EDIT_COLUMN,
  REMOVE_COLUMN,
  ADD_CARD,
  EDIT_CARD,
  REMOVE_CARD,
} from "./type";
import { ContextInitialStateType } from "../Model";

type Props = {
  children: React.ReactNode;
};

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // sync state with localStorage
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(state.columns));
    localStorage.setItem("cards", JSON.stringify(state.cards));
  }, [state]);

  const value: ContextInitialStateType = {
    columns: state.columns,
    cards: state.cards,
    addColumn: (name) => {
      dispatch({ type: ADD_COLUMN, payload: name });
    },
    editColumn: ({ id, name }) => {
      dispatch({ type: EDIT_COLUMN, payload: { id, name } });
    },
    removeColumn: (id) => {
      dispatch({ type: REMOVE_COLUMN, payload: id });
    },
    addCard: ({ title, description, columnId }) => {
      dispatch({ type: ADD_CARD, payload: { title, description, columnId } });
    },
    editCard: ({ id, title, description, columnId }) => {
      dispatch({
        type: EDIT_CARD,
        payload: { id, title, description, columnId },
      });
    },
    removeCard: (id) => {
      dispatch({
        type: REMOVE_CARD,
        payload: id,
      });
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
