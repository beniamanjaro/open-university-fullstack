import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "VOTE": {
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      console.log(changedAnecdote);
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const voteAnecdote = (id, anecdote) => {
  return async (dispatch) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdotesService.voteAnecdote(id, newAnecdote);
    dispatch({
      type: "VOTE",
      data: { id },
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
