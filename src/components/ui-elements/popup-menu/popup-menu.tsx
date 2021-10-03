import ReactDOM from 'react-dom';
import styles from './popup-menu.module.scss';

type PopupMenuType = {
  parentTop: number | undefined,
  parentLeft: number | undefined,
  open: boolean,
  children: any,
}

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