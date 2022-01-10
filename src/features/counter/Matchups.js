import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.module.css';

import {
  getPlayers,
  switchToStandings,
  selectPage,
  getMatchups
} from './tournaSlice';


export function Matchups() {
  const matchups = useSelector(getMatchups);

  debugger
  return (
    <div>
      <h1> This is the Matchups Page </h1>

      {
        matchups.map((team, i) => <MatchupBox team={team} key={i} />)
      }
    </div>
  );
}

const MatchupBox = ({ team }) => {
  const [team1Score, setTeam1Score] = React.useState(0);
  const [team2Score, setTeam2Score] = React.useState(0);
  const dispatch = useDispatch();

  const handleScore = (event) => {
    event.preventDefault();

    // setFormCount(+playerCount)
  }

  return (
    <div>
        <form onSubmit={handleScore} className={styles.initFormContainer}>
          <label className={styles.label}>{team.team1.name}
            <input
              name="team1Score"
              value={team1Score}
              onChange={e => setTeam1Score(e.target.value)}
              required />
          </label>
          <label className={styles.label}>
            <input
              name="team2Score"
              value={team2Score}
              onChange={e => setTeam2Score(e.target.value)}
              required />
            {team.team2.name}
          </label>

        <button className={styles.button}>Set</button>
      </form>
    </div>
  )
}
