/** @jsx h */
import { h } from 'preact';
import * as styles from './checkbox.module.less'
import { RatingComponent } from './rating.component';

type CheckboxProps = {
  label: string
  name: string
  checked: boolean
  type: "TEXT" | "RATING"
}

export const CheckboxComponent = (props: CheckboxProps) => {
  if (props?.label) {
    return (
      <div className={styles['checkbox-component']}>
        <input type="checkbox" id={props?.name} name={props?.name} checked={props.checked} />
        <label for={props?.name}>
          {
            props?.type === 'RATING' ?
              <RatingComponent rating={props?.label} />
            :
              props?.label
          }
        </label>
      </div>
    );
  }
};