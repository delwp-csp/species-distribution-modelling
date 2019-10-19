import React from "react"
import { render, fireEvent } from "@testing-library/react"
import MultilineInput from "./multiline-input"

it("Correctly handles changes", () => {
  const spy = jest.fn(e => e.persist())
  const {getByRole} = render(<MultilineInput onChange={spy}/>)

  fireEvent.change(getByRole('textbox'), { target: { value: 'new value'}})

  expect(spy.mock.calls[0][0]).toMatchObject({
      target: {value: 'new value'}
  })
})


it("Allows the input's value to be controlled", () => {
    const {getByRole} = render(<MultilineInput value="current value"/>)
    expect(getByRole('textbox').value).toBe('current value')
})