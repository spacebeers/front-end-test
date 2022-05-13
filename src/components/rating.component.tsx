import { h } from 'preact';
import * as styles from './rating.module.less'

type RatingProps = {
    rating: string
}

export const stringToNumber = (value: string): number => parseInt(value, 10)

export const RatingComponent = (props: RatingProps) => {
    const cleaned: number = stringToNumber(props?.rating);
    const isRating: number = isNaN(cleaned) ? 0 : cleaned
    const rating: Array<undefined> = Array.apply(null, Array(isRating));
    return (
        <span className={styles['rating']} aria-label={`This hotel has a rating of ${isRating}`}>
            {
                rating?.map(rating => <RatingIcon />)
            }
        </span>
    );
};

const RatingIcon = () => {
    return (
        <svg width="18" height="17" role="presentation" xmlns="http://www.w3.org/2000/svg"><path d="m9 13.5-5.29 2.781 1.01-5.89L.44 6.219l5.915-.86L9 0l2.645 5.359 5.915.86-4.28 4.172 1.01 5.89z" fill="currentColor" fill-rule="evenodd"/></svg>
    )
}