import { h, JSX } from 'preact'
import { HotelImage } from '../types/booking'
import * as style from './image.module.less'

export interface ImageProps {
  image: HotelImage
}

export default function ImageComponent(props: ImageProps): JSX.Element {
  return (
    <picture>
      <source srcset={props?.image?.RESULTS_CAROUSEL?.url} media="(min-width: 768px)" />
      <img src={props?.image?.MOBILE_MAIN?.url} alt={props?.image?.IMAGE_DESCRIPTION} />
    </picture>
  )
}