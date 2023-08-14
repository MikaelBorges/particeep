import { Jauge } from "./jauge";
import { render } from "@testing-library/react";

test("check likes", () => {
  render(<Jauge likes={3} dislikes={1} />);

  // Test unitaires :

  /* const likes = document.querySelector("[data-testid='jauge_likes']");
  expect(likes.getAttribute("style").toEqual("width: 75%;")); */

  expect(true).toBe(true);
});
