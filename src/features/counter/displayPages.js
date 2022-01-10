import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  switchToMatchups,
  switchToStandings,
  selectPage
} from './tournaSlice';

import { InputForm } from './InputForm.js';
import { Matchups } from './Matchups.js';
import { Standings } from './Standings.js';
import styles from './Counter.module.css';

export function Page() {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  return (
    <div>
        {
          page === 'initialForm' && <InputForm />
        }
        {
          page !== 'initialForm' &&
            <div className={styles.Page}>
              <div>
                <button
                  className={styles.button}
                  aria-label="Matchups"
                  onClick={() => dispatch(switchToMatchups())}
                >
                  Matchups
                </button>

                <button
                  className={styles.button}
                  aria-label="Standings"
                  onClick={() => dispatch(switchToStandings())}
                >
                  Standings
                </button>
              </div>

              <div>
                {
                  page === 'Matchups' && <Matchups />
                }
                {
                  page === 'Standings' && <Standings />
                }
              </div>
            </div>
        }

    </div>
  );
}
