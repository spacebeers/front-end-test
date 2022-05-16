/** @jsx h */
import { h, options } from 'preact';
import { Holiday, HolidayFilters } from '../types/booking';
import { cleanFacilityFilter } from '../services/filter.service';
import { CurrencyComponent } from './currency.component';
import * as styles from './holiday-card.module.less'
import ImageComponent from './image.component';
import { RatingComponent } from './rating.component';

type HolidayCardProps = {
  holiday: Holiday
  filters: HolidayFilters
}

export const HolidayCardComponent = (props: HolidayCardProps) => {
  const facilities = props?.filters?.map(item => cleanFacilityFilter(item))

  return (
    <div className={styles['card-component']}>
      <div className={styles["image"]}>
        <h2>{ props?.holiday?.hotel?.name } </h2>
        <ImageComponent image={props?.holiday?.hotel?.content?.images[0]} />
      </div>
      <div className={styles["content"]}>
        <ul>
          <li><CurrencyComponent price={props?.holiday?.totalPrice} /></li>
          <li><RatingComponent rating={props?.holiday?.hotel?.content?.starRating} /></li>
        </ul>
      </div>
      <div className={styles["footer"]}>
        {
          props?.holiday?.hotel?.content?.hotelFacilities?.map((facility: string) => <span className={`${styles['tag']} ${facilities.includes(facility) ? styles['filtered'] : ""}`}>{facility}</span>)
        }
      </div>      
    </div>
  );
};