import { render, screen } from "@testing-library/react";
import Todos from "@/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Todos />);

    const heading = screen.getByRole("heading", {
      name: /todo/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
