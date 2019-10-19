import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Button from "./button"

it("Clicking on a button calls onClick", () => {
  const spy = jest.fn()
  const { getByText } = render(
    <Button buttonText="Test Button" onClick={spy} />
  )

  fireEvent.click(getByText("Test Button"))

  expect(spy).toBeCalled()
})
