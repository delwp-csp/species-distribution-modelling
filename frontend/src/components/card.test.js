import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Card } from "./card"

it("Renders correctly", () => {
  const { queryByText } = render(
    <Card
      specie={{
        scientific_name: "SName",
        common_name: "CName",
        description: "This is a description"
      }}
    />
  )

  expect(queryByText("SNAME")).not.toBeNull()
  expect(queryByText("This is a description")).not.toBeNull()
})

it("Calls onClick when clicked", () => {
  const spy = jest.fn()
  const { getByText } = render(
    <Card
      specie={{
        scientific_name: "SName",
        common_name: "CName",
        description: "This is a description"
      }}
      onClick={spy}
    />
  )
  fireEvent.click(getByText("SNAME"))

  expect(spy).toBeCalled()
})
