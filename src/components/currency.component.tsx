import { h } from 'preact';

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
        <span>
            {formatter.format(props?.price)}
        </span>
    );
};