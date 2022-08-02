import Register from "@/pages/register";
import { render, screen } from "@testing-library/react";
describe("Register", () => {
  it("renders s heading", () => {
    render(<Register />);
    const heading = screen.getByRole("heading", { name: /新規登録/i });
    expect(heading).toBeInTheDocument();
  });
});
