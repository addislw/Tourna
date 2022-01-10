import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Tourna.module.css';

import {
  setPlayersList,
  switchToMatchups,
  setMatchupsList,
} from './tournaSlice';

export function InputForm() {
  const [playerCount, setPlayerCount] = React.useState(0);
  const [formCount, setFormCount] = React.useState(0);
  const dispatch = useDispatch();

  const players = {};

  const handleSubmit = dispatch => event => {
    event.preventDefault();
    const playersArr = Object.values(players);
    const matchups = matchupAlgo(playersArr);

    dispatch(setPlayersList(playersArr))
    dispatch(setMatchupsList(matchups))
    dispatch(switchToMatchups())
  }

  const matchupAlgo = players => {
    const matchups = [];

    players.forEach((player1, idx1) => {
      players.forEach((player2, idx2) => {
        if (player1.name !== player2.name && idx2 > idx1) {
          matchups.push({
            team1: player1,
            team2: player2
          })
        }
      })
    });

    return shuffle(matchups);
  }

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const handlePlayerCountSubmit = (event) => {
    event.preventDefault();
    setFormCount(+playerCount)
  }

  return (
    <div>
      <form onSubmit={handlePlayerCountSubmit} className={styles.initFormContainer}>
          <label className={styles.label}>
            Number of Players:&nbsp;&nbsp;
            <input
              name="playerCount"
              value={playerCount}
              onChange={e => setPlayerCount(e.target.value)}
              required />
          </label>

        <button className={styles.button}>Set</button>
      </form>

      <form onSubmit={handleSubmit(dispatch)} className={styles.initFormContainer}>
        <h1 >Create Player(s)</h1>

        {
          [...Array(formCount)].map((el, i) => (
            <InputFormItem key={i} index={i} players={players} />
          ))
        }
        <button className={styles.button}>Create Tournament</button>
      </form>
    </div>

  );
}


export function InputFormItem({ index, players }) {
  const [name, setName] = React.useState("");
  const [team, setTeam] = React.useState("");

  return (
    <div className={styles.initFormDiv} key={index}>
      <label className={styles.label}>
        Name:&nbsp;&nbsp;
        <input
          name="name"
          value={name}
          onChange={e => {
            if (players[index]) {
              players[index]['name'] = e.target.value;
            } else {
              players[index] = {'name': e.target.value}
            }
            setName(e.target.value)
          }}
          required />
      </label>

      <label>
        Team:&nbsp;&nbsp;
        <input
          name="team"
          value={team}
          onChange={e => {
            if (players[index]) {
              players[index]['team'] = e.target.value;
            } else {
              players[index] = {
                'team': e.target.value,
              }
            }
            setTeam(e.target.value)
          }}
          required />
      </label>
    </div>
  );
}
