import React from "react"
import { render, fireEvent } from "@testing-library/react"
import InputField from "./input-field"

it("Correctly handles changes", () => {
  const spy = jest.fn(e => e.persist())
  const {getByRole} = render(<InputField onChange={spy}/>)

  fireEvent.change(getByRole('textbox'), { target: { value: 'new value'}})

  expect(spy.mock.calls[0][0]).toMatchObject({
      target: {value: 'new value'}
  })
})


it("Allows the input's value to be controlled", () => {
    const {getByRole} = render(<InputField value="current value"/>)
    expect(getByRole('textbox').value).toBe('current value')
})