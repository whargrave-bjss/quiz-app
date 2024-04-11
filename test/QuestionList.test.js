import React from "react";
import { UserContext } from "../src/UserContext";
import { QuestionList } from "../src/QuestionList";
import { element, form} from "./reactTestExtensions";
import { renderLoggedInComponent, initializeReactContainer } from "./reactTestExtensions";
describe("Question list", () => {

beforeEach(() => {
    initializeReactContainer();
  });

    it("renders a form", () => {
       renderLoggedInComponent(QuestionList)
       expect(form()).not.toBeNull();
    })
    it("component returns quiz-name", () => {
        renderLoggedInComponent(QuestionList)
        expect(element("h1").textContent.includes("science"))
    })
    it("maps the questions to a list", () => {
        renderLoggedInComponent(QuestionList);
        expect(element("ul").textContent.includes("What fruit fell on Isaac Newton's head which led to the discovery of gravity?"))     
    })
})