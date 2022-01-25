import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.createAnecdoteInput.value));
  };
  return (
    <form onSubmit={create}>
      <div>
        <input name="createAnecdoteInput" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
