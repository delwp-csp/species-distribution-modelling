import React from 'react'

import { render, wait} from "@testing-library/react"
import {MemoryRouter} from 'react-router-dom'
import Home from './home'
import nock from 'nock'

it('Renders correctly with no species', async () => {
    const scope = nock('http://localhost').get('/get_data').reply(200, [])

    const { getByText, queryByText } = render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )
    
    await wait(() => getByText('DELWP Species Modelling'))
    
    expect(queryByText("No specie has been added")).not.toBeNull()

    scope.done()
})

it('Renders correctly with a species species', async () => {
    const scope = nock('http://localhost').get('/get_data').reply(200, [
        {
            scientific_name: "SName",
            common_name: "CName",
            description: "This is a description"
        }
    ])

    const { getByText, queryByText } = render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )
    
    await wait(() => getByText('DELWP Species Modelling'))
    
    expect(queryByText("SNAME")).not.toBeNull()
    expect(queryByText("This is a description")).not.toBeNull()

    scope.done()
})


it('Renders correctly when the server errors', async () => {
    const scope = nock('http://localhost').get('/get_data').reply(500)

    const { getByText, queryByText } = render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )
    
    await wait(() => getByText('The server is not responding'))
    
    expect(queryByText("The server is not responding")).not.toBeNull()

    scope.done()
})