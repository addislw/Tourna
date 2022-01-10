import { createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  page: 'initialForm',
  players: [],
  matchups: [],
  status: 'idle',
};

export const tournaSlice = createSlice({
  name: 'tourna',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    switchToMatchups: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.page = 'Matchups';
    },
    switchToStandings: (state) => {
      state.page = 'Standings';
    },
    setPlayersList: (state, action) => {
      state.players = action.payload;
    },
    setMatchupsList: (state, action) => {
      state.matchups = action.payload;
    },
    updatePlayerInfo: (state, action) => {
      const payload = action.payload;
    }
  },
});

// Q: tournaSlice.actions === state.tourna.actions ?
export const { switchToMatchups, setPlayersList, switchToStandings, setMatchupsList, updatePlayerInfo } = tournaSlice.actions;

export const selectPage = (state) => state.tourna.page;
export const getPlayers = (state) => state.tourna.players;
export const getMatchups = (state) => state.tourna.matchups;

export default tournaSlice.reducer;
