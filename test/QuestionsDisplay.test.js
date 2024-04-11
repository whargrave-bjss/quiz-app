import React from "react";
import { ReactDOM } from "react";
import { act } from "react-dom/test-utils";
import { QuestionsDisplay } from "../src/QuestionsDisplay";
import { render, initializeReactContainer, container, element, form, elements, submitButton, change, click, renderLoggedOutComponent, renderLoggedInComponent, mockSubmit } from "./reactTestExtensions";
import { manualQuestionsSet, mockCurrentUser, mockOtherUser } from "../src/sampleData";
import { waitFor } from "@testing-library/react";
import { UserContext } from "../src/UserContext";
describe ("Questions-Display", () => {



    beforeEach(() => {
        initializeReactContainer();
      });
     
    it("renders a form", () => {
        renderLoggedInComponent(QuestionsDisplay);
        expect(form).not.toBeNull();
    })
    it("the form renders a question", () => {
          renderLoggedInComponent(QuestionsDisplay);
            expect(
                element(".question").textContent).toContain
                ("What fruit fell on Isaac Newton's head which led to the discovery of gravity?");
    })
    it("renders multiple choice questions with 4 radio buttons", () => {
          renderLoggedInComponent(QuestionsDisplay);
        const radioButtons = elements(".choices input[type='radio']")
        expect(radioButtons.length).toBe(4)
    })
    it("renders a text box for a text-based question", () => {
          renderLoggedInComponent(QuestionsDisplay);
       const textBox = element(".choices input[type='text'");
       expect(textBox).not.toBeNull();
    })
    it("renders multiple questions", () => {
          renderLoggedInComponent(QuestionsDisplay);
        const questionElements = elements(".question");
        expect(questionElements.length).toBe(manualQuestionsSet.questions.length);
      });

    it("renders a submit button", () => {
          renderLoggedInComponent(QuestionsDisplay);
        expect(submitButton()).not.toBeNull();
    });
    
    it("submits the value chosen by the user on submit", async () => {
      const mockSubmit = jest.fn();
      render(
        <UserContext.Provider value={{ currentUser: mockCurrentUser, questionSet: manualQuestionsSet }}>
          <QuestionsDisplay onSubmit={mockSubmit} />
        </UserContext.Provider>
      );
      
        const selectedQuestion = manualQuestionsSet.questions[0];
        const selectedAnswer = selectedQuestion.choices[2]; 
      
        const radioInput = element(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true; 
            const changeEvent = new Event('change', { bubbles: true });
            radioInput.dispatchEvent(changeEvent);
          }
        const form = element('form');
        if (form) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
          }
          await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith(expect.anything(), expect.any(Number));
          });
      });

      it("correctly adds a point to the user if they select the correct answer", async () => {
        const mockSubmit = jest.fn();
        render(
          <UserContext.Provider value={{ currentUser: mockCurrentUser, questionSet: manualQuestionsSet }}>
            <QuestionsDisplay onSubmit={mockSubmit} />
          </UserContext.Provider>
        );
        const selectedQuestion = manualQuestionsSet.questions[0];
        const selectedAnswer = selectedQuestion.choices[2]; 
      
        const radioInput = element(`input[value="${selectedAnswer}"]`);
        radioInput.checked = true;
        radioInput.dispatchEvent(new Event('change', { bubbles: true }));
    
        const form = document.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    
      
        expect(mockSubmit).toHaveBeenCalledWith(expect.anything(), 1); 
    });
    it("doesn't load the form if user is not signed in", () => {
      renderLoggedOutComponent(QuestionsDisplay);
      expect(form()).toBeNull();
    })
    it("only renders the display if the quiz is assigned to the currentUser", () => {
      render(
        <UserContext.Provider value={{ currentUser: mockOtherUser, questionSet: manualQuestionsSet }}>
                    <QuestionsDisplay onSubmit={mockSubmit}/>
                </UserContext.Provider>       
        )
     expect(element("p").textContent).toContain("You don't have any assigned tests")
    })
})