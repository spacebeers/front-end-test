import { h } from 'preact';
import * as styles from './currency.module.less'

type CurrencyProps = {
    price: number
}

export const CurrencyComponent = (props: CurrencyProps) => {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    })

    return (
        <span className={styles['currency']}>
            {formatter.format(props?.price)}
        </span>
    );
};