import React, { useState } from "react";
import { initializeReactContainer, render, element, form, labelFor, click, clickAndWait, container, elements, renderLoggedInComponent, renderLoggedOutComponent, mockSubmit} from "./reactTestExtensions";
import { UserContext, UserProvider, } from "../src/UserContext";
import { Home } from "../src/home";
import '@testing-library/jest-dom';
import { mockCurrentUser, manualQuestionsSet } from "../src/sampleData";
import {screen} from '@testing-library/react';
import {MemoryRouter, BrowserRouter as Router} from 'react-router-dom';
// jest.mock('../src/UserContext');

describe("Home page behaviour", () => {

    beforeEach(() => {
        initializeReactContainer();
      })
      afterEach(() => {
        document.body.removeChild(container); 
        jest.resetAllMocks();
      });
const itRendersALabel = (fieldName) => {
        it("renders a label for the field", () => {
          render(
          <MemoryRouter>
          <UserContext.Provider value={{ currentUser: null }}>
            <Home onSubmit={mockSubmit}/>
          </UserContext.Provider>
        </MemoryRouter>
          );
          expect(labelFor(fieldName)).not.toBeNull();
        });
    }
      describe("Logged out behaviour", () => {
        itRendersALabel("username")
        itRendersALabel("password")

        it("doesn't log the user in on initial load", () => {
            renderLoggedOutComponent(Home)
            const loginButton = element("button")
            expect(loginButton.textContent).toEqual("Log In")
         })
         it("renders a login form when not logged in", () => {
            renderLoggedOutComponent(Home)
            expect(form()).not.toBeNull();
         })
         it("renders a register form on selecting register", () => {
            renderLoggedOutComponent(Home)
            click(element(".toggle-button"));
            const registerButton = element("button[type='submit']");
            expect(registerButton.textContent).toEqual("Register");
         })
    })
    describe("logged in behaviour", () => {

  it("renders a welcome message to the user", async () => {
  
  const expectedText = `Welcome back, ${mockCurrentUser.name}!`;
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
        <Home onSubmit={mockSubmit}/>
      </UserContext.Provider>
    </MemoryRouter>
  );
  const message = screen.getByText(expectedText);
  expect(message).toBeInTheDocument();

});
        it("renders links to other components", () => {
          render(
          <MemoryRouter>
          <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
            <Home onSubmit={mockSubmit}/>
          </UserContext.Provider>
        </MemoryRouter>
    );
            const questionFormLink = screen.getByRole('link', {name: /Make a quiz/i})
            const questionsDisplayLink = screen.getByRole('link', {name: /Take a quiz/i})
            
            expect(questionFormLink).toBeInTheDocument();
            expect(questionFormLink).toHaveAttribute('href', '/question-form');

            expect(questionsDisplayLink).toBeInTheDocument();
            expect(questionsDisplayLink).toHaveAttribute('href', '/questions-display')
        })
        it("allows the user to log out", async () => {
          const setCurrentUser = jest.fn();
          render(
            <MemoryRouter>
              <UserContext.Provider value={{ currentUser: mockCurrentUser, questionSet: manualQuestionsSet, setCurrentUser }}>
                <Home onSubmit={mockSubmit}/>
              </UserContext.Provider>
            </MemoryRouter>
          );
          
          const logoutButton = element(".logout-button")
          logoutButton.dispatchEvent(new Event("click", {bubbles: true}))
          const form = element(".form")
          expect(form).toBeNull();
        })
    })
})