import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = async (e) => {
    e.preventDefault();
    const content = e.target.createAnecdoteInput.value;
    e.target.createAnecdoteInput.value = "";
    dispatch(setNotification(content, 5));
    dispatch(createAnecdote(content));
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
