import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Tourna.module.css';

import {
  addToPlayersList,
  switchToMatchups,
} from './tournaSlice';

export function InputForm() {
  const [playerCount, setPlayerCount] = React.useState(0);
  const [formCount, setFormCount] = React.useState(0);
  const dispatch = useDispatch();

  const players = {};

  const handleSubmit = dispatch => event => {
    event.preventDefault();
    const playersArr = Object.values(players);

    dispatch(addToPlayersList(playersArr))
    dispatch(switchToMatchups())
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
