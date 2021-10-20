import ReactDOM from 'react-dom';
import { PopupMenuType } from '../../../types/types/components/ui-elements/popup-menu';
import styles from './popup-menu.module.scss';

/**
 * This function creates a custom pop-up modal.
 * 
 * 
 * @param parentTop is the top position of the modal
 * @param parentLeft is the left position of the modal
 * @param open is the open flag
 * @param children is the child components 
 * @returns a positioned modal component
 */
const PopupMenu = ({parentTop, parentLeft, open, children}: PopupMenuType) => {

  const HEIGHT: number = 240;
  const WIDTH: number = 160;
  
  return open ? ReactDOM.createPortal((
    <div 
      className={styles.container}
      style={{
        height: HEIGHT,
        width: WIDTH,
        top: (parentTop ?? 0) - HEIGHT,
        left: (parentLeft ?? 0) - WIDTH,
      }}
    >
      {children}
    </div>),
    document.body
  ) : null;
}

export default PopupMenu;