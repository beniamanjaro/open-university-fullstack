import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <div>
      filter: <input onChange={handleChange}></input>
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
