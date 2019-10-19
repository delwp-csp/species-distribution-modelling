import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { CardList } from "./card-list"

it("Renders message with no data", () => {
  const { queryByText } = render(<CardList species={[]} />)

  expect(queryByText("No specie has been added")).not.toBeNull()
})

it("Renders properly with a species", () => {
  const { queryByText } = render(
    <CardList
      species={[
        {
          scientific_name: "SName",
          common_name: "CName",
          description: "This is a description"
        }
      ]}
    />
  )

  expect(queryByText("SNAME")).not.toBeNull()
  expect(queryByText("This is a description")).not.toBeNull()
})

it("Clicking on a specie goes to the correct page", () => {
  const push = jest.fn()
  const { getByText } = render(
    <CardList
      species={[
        {
          scientific_name: "SName",
          common_name: "CName",
          description: "This is a description"
        }
      ]}
      history={{ push: push }}
    />
  )

  fireEvent.click(getByText(/SNAME/i))

  expect(push).toBeCalledWith("/report/SName")
})
