import React, { useState, useEffect } from "react";
import BackgroundIconButton from "../ui-elements/buttons/background-button";
import styles from "./vertical-navbar.module.scss";
import { Menu } from "@material-ui/icons";
import { BACKGROUND_ICON_BUTTON_SIZE } from "../../types/constants/component_constants";

/**
 * This is the vertical navigation bar on the left.
 *
 * @returns a vertical navigation bar
 */
const VerticalNavBar = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  // For animation
  const [isNavMenuButtonOpen, setIsNavMenuButtonOpen] = useState<boolean>(false);

  /**
   * This function open/close the vertical navigation bar.
   */
  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setIsNavMenuButtonOpen(!isNavMenuButtonOpen);
  };

  return (
    <div className={`${styles.container} ${isNavMenuOpen ? styles.open : ""}`}>
      <div className={styles.navbar_main_container}>
        <BackgroundIconButton
          size={BACKGROUND_ICON_BUTTON_SIZE}
          onClick={toggleNavMenu}
          className={styles.nav_button_container}
        >
          <Menu className={`${styles.nav_button} ${isNavMenuButtonOpen ? styles.pressed : ""}`} />
        </BackgroundIconButton>
      </div>
    </div>
  );
};

export default VerticalNavBar;
