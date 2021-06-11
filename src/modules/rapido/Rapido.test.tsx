import React from "react";
import { render } from "@testing-library/react";
import Rapido from "./Rapido";

test("renders ticke label", () => {
  const { getByText } = render(<Rapido />);
  const ticketLabel = getByText(/ticket 1/i);
  expect(ticketLabel).toBeInTheDocument();
});
