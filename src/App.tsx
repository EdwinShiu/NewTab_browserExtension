import React, { useState, useEffect } from 'react';
import Clock from './components/clock/clock';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.quote_container}>

      </div>
      <div className={styles.clock_container}> 
        <Clock />
      </div>
    </div>
  );
}

export default App;
