/** @jsx h */
import { h, options } from 'preact';
import { Holiday } from '../types/booking';
import { CurrencyComponent } from './currency.component';
import * as styles from './holiday-card.module.less'
import ImageComponent from './image.component';
import { RatingComponent } from './rating.component';


type HolidayCardProps = {
  holiday: Holiday
}

export const HolidayCardComponent = (props: HolidayCardProps) => {
  return (
    <div className={styles['card-component']}>
      <div className={styles["image"]}>
        <ImageComponent image={props?.holiday?.hotel?.content?.images[0]} />
      </div>
      <h2>{ props?.holiday?.hotel?.name } </h2>

      <ul>
        <li>Rating: <RatingComponent rating={props?.holiday?.hotel?.content?.starRating} /></li>
        <li>Price: <CurrencyComponent price={props?.holiday?.totalPrice} /></li>
      </ul>
    </div>
  );
};