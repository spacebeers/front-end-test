/** @jsx h */
import { h, options } from 'preact';
import { Holiday, HolidayFilters } from '../types/booking';
import { ButtonComponent } from './button.component';
import { CheckboxComponent } from './checkbox.component';
import * as styles from './filter.module.less'

type FilterProps = {
  holidays: Holiday[]
  filters: HolidayFilters
  onChange: (data: HolidayFilters) => HolidayFilters
}

export const FilterComponent = (props: FilterProps) => {
  const dedupe = (big_array: Array<string>) => {
    return big_array.filter(function (item, pos) {
      return big_array.indexOf(item) == pos;
    })
  }

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: HolidayFilters = Array.from(formData.entries())?.map(entry => entry[0])
    props?.onChange(data)
  }

  const all_facilities = props?.holidays?.flatMap((holiday: Holiday) => holiday.hotel.content.hotelFacilities)
  const all_ratings = props?.holidays?.flatMap((holiday: Holiday) => holiday.hotel.content.starRating)
  const factilities_filters = dedupe(all_facilities)
  const rating_filters = dedupe(all_ratings)

  return (
    <div className={styles['filter-component']}>
      <form onSubmit={onSubmit}>
        <h2>Filters</h2>

        <h3>Facilities</h3>
        {
          factilities_filters.sort().map(i => {
            return (
              <CheckboxComponent type="TEXT" name={`FACILITY_${i}`} label={i} checked={props?.filters.includes(`FACILITY_${i}`)} />
            )
          })
        }

        <h3>Ratings</h3>
        {
          rating_filters.sort().reverse().map(i => {
            return (
              <CheckboxComponent type="RATING" name={`RATING_${i}`} label={i} checked={props?.filters.includes(`RATING_${i}`)} />
            )
          })
        }

        <ButtonComponent text="Filter" type="SUBMIT" />
        <ButtonComponent text="Reset" type="RESET" skin="SECONDARY" />
      </form>
    </div>
  );
};