import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GenerateTokenForm from "../components/NexusButton/GenerateFormToken";

test("GenerateFormToken test", async () => {
  const user = userEvent.setup();
  render(<GenerateTokenForm />);

  user.type(document.querySelector("#email"), "nexusTester@nexusTest.ca");
  user.type(document.querySelector("#userType"), "1234567890");
  user.type(document.querySelector("#unit"), "1");
  user.click(document.querySelector("#token"));

  // await waitFor(() => {
  //   const textareaElement = document.querySelector("#TokenTextArea");
  //   expect(textareaElement).toBeInTheDocument();
  // });
});
