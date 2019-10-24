import React from 'react'

import { render, fireEvent, wait } from "@testing-library/react"
import {MemoryRouter, Route} from 'react-router-dom'
import Report from './report'
import nock from 'nock'


it('Queries server for data until status is DONE', async () => {
    const notDone = nock('http://localhost')
        .get('/progress/specie')
        .reply(200, {status: 'RUNNING'})

    const done = nock('http://localhost')
        .get('/progress/specie')
        .reply(200, {status: 'DONE'})


    render(
        <MemoryRouter initialEntries={['/report/specie']}>
            <Route path="/report/:specie_name" component={Report} />
        </MemoryRouter>
    )

    await wait(() => notDone.done())
    await wait(() => done.done())
    
})



it('Continuously checks state of training until done', async () => {
    const notDone = nock('http://localhost')
        .get('/progress/specie')
        .reply(200, {status: 'RUNNING'})

    const done = nock('http://localhost')
        .get('/progress/specie')
        .reply(200, {status: 'DONE'})


    render(
        <MemoryRouter initialEntries={['/report/specie']}>
            <Route path="/report/:specie_name" component={Report} />
        </MemoryRouter>
    )

    await wait(() => notDone.done())
    await wait(() => done.done())
    
})