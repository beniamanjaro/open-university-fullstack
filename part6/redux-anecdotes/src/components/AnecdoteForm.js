import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.createAnecdoteInput.value));
    dispatch(setNotification(e.target.createAnecdoteInput.value));
    setTimeout(() => dispatch(removeNotification("")), 5000);
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

export default AnecdoteForm;
