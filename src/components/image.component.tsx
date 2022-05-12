import { h, JSX } from 'preact'
import { HotelImage } from '../types/booking';

export interface ImageProps {
  image: HotelImage
}

export default function ImageComponent(props: ImageProps): JSX.Element {
  return (
    <picture>
      <source srcset={props?.image?.RESULTS_CAROUSEL?.url} media="(min-width: 768px)" />
      <img src={props?.image?.MOBILE_MAIN?.url} alt={props?.image?.IMAGE_DESCRIPTION} loading="lazy" />
    </picture>
  )
}