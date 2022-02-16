import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { classNames, useTheme } from 'ureng-ui';

import styles from './app.module.scss';

export function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.app, styles[`app--${theme}`])} id="app">
      <main className={styles.app__main}>
        <Routes></Routes>
      </main>
    </div>
  );
}
