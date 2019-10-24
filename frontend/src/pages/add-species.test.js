import React from 'react'

import { render, fireEvent, wait } from "@testing-library/react"
import {MemoryRouter} from 'react-router-dom'
import AddSpecies from './add-species'
import nock from 'nock'


it('renders correctly', () => {
    const { queryByText, queryByLabelText } = render(
        <MemoryRouter>
            <AddSpecies/>
        </MemoryRouter>
    )

    expect(queryByText('Add New Species')).not.toBeNull()
    expect(queryByText('Specie Details')).not.toBeNull()
    expect(queryByText('Save')).not.toBeNull()
    expect(queryByLabelText('Scientific Name')).not.toBeNull()
    expect(queryByLabelText('Common Name')).not.toBeNull()
    expect(queryByLabelText('Description')).not.toBeNull()

})

it('Can create specie', async () => {
    const { getByLabelText, getByText, queryByText } = render(
        <MemoryRouter>
            <AddSpecies/>
        </MemoryRouter>
    )
    fireEvent.change(getByLabelText('Scientific Name'), {target: {value: 'specie name with space'}})
    fireEvent.change(getByLabelText('Common Name'), {target: {value: 'CName'}})
    fireEvent.change(getByLabelText('Description'), {target: {value: 'The Description'}})

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
    const createScope = nock('http://localhost').post('/', { scientific_name: 'specie_name_with_space', common_name: 'CName', description: 'The Description'}).reply(200, {})
    const uploadScope = nock('http://localhost').post('/upload', /Hello world/).matchHeader('specieName', 'specie_name_with_space').reply(200, {})
    fireEvent.click(getByText('Save'))

    await wait(() => createScope.done())
    await wait(() => uploadScope.done())
})