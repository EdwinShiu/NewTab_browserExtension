import { BackgroundIconButtonProps } from '../../../types/types/components/ui-elements/buttons';
import styles from './background-button.module.scss';


/**
 * This function is a boilerplate of the icon button
 * 
 * @param props is the properties of the component
 * @returns a icon button component
 */
export default function BackgroundIconButton(props: BackgroundIconButtonProps) {
  return (
    <button
      className={styles.button + ' ' + (props.className ?? '')}
      onClick={props.onClick}
      type={props.type ?? 'button'}
      style={props.size ? {
        height: props.size,
        width: props.size,
      } : {}}
    >
      {props.children}
    </button>
  )
}