/** @jsx h */
import { h } from 'preact';
import * as styles from './button.module.less'

type ButtonType = "BUTTON" | "SUBMIT" | "RESET"

type ButtonProps = {
  text: string
  disabled?: boolean
  type?: ButtonType
}

export const ButtonComponent = (props: ButtonProps) => {
  return (
    <button
      type={(props?.type || 'button').toLowerCase()}
      className={styles['button']}
      disabled={props?.disabled || false}
    >   
      { props?.text }
    </button>
  );
};