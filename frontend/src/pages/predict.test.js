import React from 'react'

import { render, fireEvent, wait } from "@testing-library/react"
import {MemoryRouter, Route} from 'react-router-dom'
import Predict from './predict'
import nock from 'nock'


it('renders correctly', () => {
    const { queryByText, queryByLabelText } = render(
        <MemoryRouter>
            <Predict />
        </MemoryRouter>
    )

    expect(queryByText('Predict new data')).not.toBeNull()
    expect(queryByText('Details for this set of predictions')).not.toBeNull()
    expect(queryByText('Save')).not.toBeNull()
    expect(queryByText('Drag and drop a csv file here or click to upload')).not.toBeNull()
    expect(queryByLabelText('Name')).not.toBeNull()

})

it('Can upload predictions', async () => {
    const { getByLabelText, getByText, queryByText } = render(
        <MemoryRouter initialEntries={['/predict/SNAME/bal/modelol']}>
            <Route path="/predict/:specie_name/:balancer/:model" component={Predict} />
        </MemoryRouter>
    )
    fireEvent.change(getByLabelText('Name'), {target: {value: 'prediction name'}})

    const dropZone = getByText('Drag and drop a csv file here or click to upload')
    const file = new File(['Hello world'], 'file.csv', {type: 'text/csv'})
    
    /* Fake a Node.JS file stream */
    file.on = () => {}
    file.pause = () => {}
    file.resume = () => { file.emit('data', 'Hello world'); file.emit('end')}
    file.emit = () => {}

    fireEvent.drop(dropZone, {
        target: { 
            files: [file]
        }
    })

    await wait(() => queryByText('successfully added'))
    
    await wait(() => {
        expect(getByText('Save').parentElement.disabled).toBe(false)
    })
    const uploadScope = nock('http://localhost')
        .post('/predict', /Hello world/)
        .matchHeader('name', 'prediction name')
        .matchHeader('specieName', 'SNAME')
        .matchHeader('balancer', 'bal')
        .matchHeader('model', 'modelol')
        .reply(200, {})
    fireEvent.click(getByText('Save'))

    await wait(() => uploadScope.done())
})