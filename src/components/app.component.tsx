import { h, JSX } from 'preact'
import Router, { Route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { useState } from 'preact/hooks'
import { ApplicationContext } from '../contexts/application.context'
import HeaderComponent from './header.component'
import SearchComponent from './search.component'
import HomeRoute from '../routes/home.route';


export default function App(): JSX.Element {
    const [application, setApplication] = useState({
        loading: true
    });

    return (
        <section>
            <HeaderComponent />
            <SearchComponent />

            <Router>
                <HomeRoute path="/" />
                <AsyncRoute
                    path="/results"
                    getComponent={() => import('../routes/results.route').then(module => module.default)}
                />
            </Router>
        </section>
    )
}