import React, { useState, useEffect } from 'react';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import styles from './vertical-navbar.module.scss';
import { Menu } from '@material-ui/icons';


const VerticalNavBar = () => {

  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [isNavMenuButtonOpen, setIsNavMenuButtonOpen] = useState<boolean>(false);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setIsNavMenuButtonOpen(!isNavMenuButtonOpen);
  }

  return (
    <div className={`${styles.container} ${isNavMenuOpen ? styles.open : ''}` }>
      <div className={styles.navbar_main_container}>
        <BackgroundIconButton
          size={64}
          onClick={toggleNavMenu}
          className={styles.nav_button_container}
        >
          <Menu className={`${styles.nav_button} ${isNavMenuButtonOpen ? styles.pressed : ''}`}  />
        </BackgroundIconButton>
      </div>
    </div>
  );
}


export default VerticalNavBar;