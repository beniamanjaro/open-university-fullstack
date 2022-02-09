import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
import { store } from "../store";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    console.log(store.getState());
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      filter: <input onChange={handleChange}></input>
    </div>
  );
};

export default Filter;
