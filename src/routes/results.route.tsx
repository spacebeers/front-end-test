import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import { useEffect, useState } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { HolidayCardComponent } from '../components/holiday-card.component';
import { doRequest } from '../services/http';
import { BookingRequest, BookingResponse, Holiday } from '../types/booking';
import * as styles from './results.module.less'
import { DateTime } from 'luxon';

export default function ResultsRoute(): JSX.Element {
    const [ searchParams ] = useRouter();
    const [ results, setResults ] = useState<BookingResponse| null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": searchParams?.matches?.location,
            "departureDate": departureDate,
            "duration": searchParams?.matches?.duration,
            "gateway" :"LHR",
            "direct": false,
            "partyCompositions": [
                {
                    "adults": searchParams?.matches?.adults,
                    "childAges": [],
                    "infants": 0
                }
            ]
        }

        doRequest('POST', '/cjs-search-api/search', requestBody)
          .then((response: BookingResponse) => {
              setResults(response);
              setLoading(false)
          })
          .catch(e => console.error(e))
          .finally(() => console.info('results'))
      }, [searchParams])

      useEffect(() => {
        setLoading(true)
      }, [searchParams])

    return (
        <section>
            <SearchComponent />

            <section>
                {
                    loading ?
                        <h1>Loading</h1>
                    :
                        <section>
                            <h1>Showing [{results?.holidays?.length}] Holidays</h1>

                            <section className={styles['holiday-grid']}>
                                {
                                    results?.holidays?.map((holiday: Holiday) => <HolidayCardComponent holiday={holiday} />)
                                }
                            </section>
                        </section>
                }
            </section>
        </section>
    )
}