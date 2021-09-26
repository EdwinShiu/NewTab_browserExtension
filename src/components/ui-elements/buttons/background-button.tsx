import styles from './background-button.module.scss';

type BackgroundIconButtonProps = {
  size?: number,
  children?: any
  className?: string,
  onClick?: any,
  type?: 'button' | 'submit' | 'reset' | undefined,
}

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