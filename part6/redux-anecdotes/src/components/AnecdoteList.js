import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import Notification from "./Notification";
import Filter from "./Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    } else return state.anecdotes;
  });
  const dispatch = useDispatch();

  const vote = (id, anecdote) => {
    dispatch(voteAnecdote(id, anecdote));
    dispatch(setNotification(anecdote.content, 5));
  };

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        ? anecdotes.sort(byLikes).map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote)}>
                  vote
                </button>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default AnecdoteList;
