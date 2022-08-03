import Register from "@/pages/register";
import { render, screen } from "@testing-library/react";
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
  };
});
describe("Register", () => {
  it("renders s heading", () => {
    render(<Register />);
    const heading = screen.getByRole("heading", { name: /新規登録/i });
    expect(heading).toBeInTheDocument();
  });
});
