import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import { useEffect, useState } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { HolidayCardComponent } from '../components/holiday-card.component';
import { doRequest } from '../services/http.service';
import { filterResults } from '../services/filter.service';
import { BookingRequest, BookingResponse, Holiday, HolidayFilters } from '../types/booking';
import * as styles from './results.module.less'
import { DateTime } from 'luxon';
import { FilterComponent } from '../components/filter.component';

export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [results, setResults] = useState<BookingResponse | null>(null)
    const [resultSet, setResultSet] = useState<BookingResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<HolidayFilters>([])

    useEffect(() => {
        const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": searchParams?.matches?.location,
            "departureDate": departureDate,
            "duration": searchParams?.matches?.duration,
            "gateway": "LHR",
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
                setResultSet(response);
                setResults(response);
                setLoading(false)
            })
            .catch(e => console.error(e))
            .finally(() => console.info(results))
    }, [searchParams])

    useEffect(() => {
        setLoading(true)
    }, [searchParams])

    useEffect(() => {
        const filtered = filterResults(resultSet, filters)    
        setResults(filtered)
    }, [filters])

    return (
        <section>
            <SearchComponent />

            <section>
                {
                    loading ?
                            <LoadingIcon />
                        :
                            <section>
                                <h1>Showing [{results?.holidays?.length}] Holidays</h1>

                                <section className={styles['holiday-results']}>
                                    <aside>
                                        <FilterComponent holidays={resultSet?.holidays} filters={filters} onChange={(data) => setFilters(data)} />
                                    </aside>
                                    <section className={styles['holiday-grid']}>
                                        {
                                            results?.holidays?.map((holiday: Holiday) => <HolidayCardComponent holiday={holiday} />)
                                        }
                                    </section>
                                </section>
                            </section>
                }
            </section>
        </section>
    )
}

const LoadingIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style="margin:auto;background:#f4f5f9;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <rect x="17.5" y="30" width="15" height="40" fill="#da0530">
                <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
            </rect>
            <rect x="42.5" y="30" width="15" height="40" fill="#4f145b">
                <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
            </rect>
            <rect x="67.5" y="30" width="15" height="40" fill="#2465cf">
                <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
                <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
            </rect>
        </svg>
    )
}