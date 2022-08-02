import Login from "@/pages/login";
import { render, screen } from "@testing-library/react";
describe("Login", () => {
  it("render a heading", () => {
    render(<Login />);
    const heading = screen.getByRole("heading", { name: /ログイン/i });
    expect(heading).toBeInTheDocument();
  });
});
