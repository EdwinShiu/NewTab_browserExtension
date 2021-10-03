import React, { useState, useEffect } from 'react';
import Clock from './components/clock/clock';
import styles from './app.module.scss';
import QuickAccessButtons from './components/buttons/quick-access-button';
import VerticalNavBar from './components/navbar/vertical-navbar';
import Weather from './components/weather/weather-info'
import Timer from './components/timer/timer';

function App() {

  return (
    <div className={styles.base}>
      <VerticalNavBar 
      />
      <div className={styles.container}>
        <Weather />
        <div className={styles.quote_container}>

        </div>
        <div className={styles.top_right_container}>
          <div className={styles.quick_access_buttons}>
            <QuickAccessButtons />  
          </div>
          <div className={styles.clock_container}> 
            <Clock />
          </div>
        </div>
        <div className={styles.bottom_right_container}>
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
