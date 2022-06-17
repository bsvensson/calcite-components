import { visualDiff } from "@web/test-runner-visual-regression";

it("can diff an element", async () => {
  const element = document.createElement("p");
  element.textContent = "Hello world";
  element.style.color = "blue";
  document.body.appendChild(element);

  await visualDiff(element, "sample");
});
