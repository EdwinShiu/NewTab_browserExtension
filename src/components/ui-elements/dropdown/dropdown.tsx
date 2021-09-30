import styles from './dropdown.module.scss';
import { ExpandMore } from '@material-ui/icons';

export type DropDownType = {
  list: string[],
  value: number,
  onChange: Function,
}

const Dropdown = ({list, value, onChange}: DropDownType) => {
  

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div>{list[value]}</div>
        <ExpandMore />
      </div>
      <div className={styles.list_container}>

      </div>
    </div>

  );
}


export default Dropdown