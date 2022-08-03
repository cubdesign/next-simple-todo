import { render, screen } from "@testing-library/react";
import Todos from "@/pages/index";
import "@testing-library/jest-dom";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
});

jest.mock("@/lib/AuthUser", () => {
  return {
    useAuthUserContext: jest.fn(() => {
      return { user: {} };
    }),
  };
});

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
    orderBy: jest.fn(),
    where: jest.fn(),
    query: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => {
      return {
        forEach: jest.fn(),
      };
    }),
  };
});

describe("Home", () => {
  it("renders a heading", () => {
    render(<Todos />);
    const heading = screen.getByRole("heading", {
      name: /todo/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
