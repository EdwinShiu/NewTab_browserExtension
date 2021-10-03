import ReactDOM from 'react-dom';
import styles from './popup-menu.module.scss';

type PopupMenuType = {
  parentTop: number | undefined,
  parentLeft: number | undefined,
  children: any,
}

const PopupMenu = ({parentTop, parentLeft, children}: PopupMenuType) => {

  const HEIGHT: number = 240;
  const WIDTH: number = 160;
  
  return ReactDOM.createPortal((
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
  );
}

export default PopupMenu;