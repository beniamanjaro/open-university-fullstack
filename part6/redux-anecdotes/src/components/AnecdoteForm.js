import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const create = async (e) => {
    e.preventDefault();
    const content = e.target.createAnecdoteInput.value;
    e.target.createAnecdoteInput.value = "";
    props.setNotification(content, 5);
    props.createAnecdote(content);
  };
  return (
    <>
      <h2>create anecdote</h2>
      <form onSubmit={create}>
        <div>
          <input name="createAnecdoteInput" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
