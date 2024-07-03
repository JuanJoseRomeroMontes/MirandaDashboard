import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styled from "styled-components";

const options = {
    on:"Green",
    off:"Red",
}

export const Button = styled.button`
    background-color:  ${(props) => (props.$status)};
`;

test('Test', () => {
  render( <Button $status={options.on}>tosubmit</Button>)

  expect(screen.getByRole("button", {name: /tosubmit/i})).toHaveStyle({
    backgroundColor: "Green"
  })
})