import { act } from "react-dom/test-utils";
import ReactDOM  from "react-dom/client";
import React from "react";
import { manualQuestionsSet, mockCurrentUser } from "../src/sampleData";
import { UserContext } from "../src/UserContext";
export let container;
let reactRoot;
export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
  reactRoot = ReactDOM.createRoot(container);
};

const mockSubmit = jest.fn();

export const render = (component) =>
  act(() => reactRoot.render(component));

export const click = (element) =>
  act(() => element.click());


export const clickAndWait = async (element) => 
act(async () => click(element));

export const element = (selector) =>
  document.querySelector(selector);

  export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

  export const submitButton = () =>
  element("input[type=submit]");

export const form = (id) => element("form");

export const waitForComponentToUpdate = async () => {
    return new Promise(resolve => setTimeout(resolve, 0)); 
};
export const change = (target, value) => {
  originalValueProperty(target).set.call(
    target,
    value
  );
}
export const labelFor = (formElement) =>
element(`label[for=${formElement}]`)

export const renderLoggedOutComponent = (Component) => {
  render(
  <UserContext.Provider value={{ currentUser: null }}>
              <Component />
          </UserContext.Provider>
  )
}
export const renderLoggedInComponent = (Component) => {
  render(
  <UserContext.Provider value={{ currentUser: mockCurrentUser, questionSet: manualQuestionsSet }}>
              <Component onSubmit={mockSubmit}/>
          </UserContext.Provider>       
  )
}