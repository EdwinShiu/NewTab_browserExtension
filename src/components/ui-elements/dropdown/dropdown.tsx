import styles from './dropdown.module.scss';
import { ExpandMore } from '@material-ui/icons';
import { DropDownType } from '../../../types/types/components/ui-elements/dropdowns';

/**
 * This function create a custom dropdown component
 * 
 * @param list is the list of options in string
 * @param value is the selected index
 * @param onChange is the callback function when an option is selected 
 * @returns a Dropdown component
 */
export default function Dropdown({list, value, onChange}: DropDownType) {
  
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