import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders ticke label", () => {
  const { getByText } = render(<App />);
  const ticketLabel = getByText(/ticket 1/i);
  expect(ticketLabel).toBeInTheDocument();
});
