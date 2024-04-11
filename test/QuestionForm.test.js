import React from "react";
import ReactDOM from "react-dom/client";
import { UserContext } from "../src/UserContext";
import { UserProvider } from "../src/UserContext";
import { act } from "react-dom/test-utils";
import { mockCurrentUser, mockQuizName } from "../src/sampleData";
import { QuestionForm } from "../src/QuestionForm";
import { click, clickAndWait, element, waitForComponentToUpdate, render, container, initializeReactContainer, form, elements, renderLoggedInComponent, renderLoggedOutComponent} from "./reactTestExtensions";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
describe ("Question Form", () => {

beforeEach(() => {
    initializeReactContainer();
  });
 
afterEach(() => {
    document.body.removeChild(container); 
    jest.resetAllMocks();
  });

const mockSubmit = jest.fn();
const renderAndCheckLabel = (expectedLabelContent) => {
    renderLoggedInComponent(QuestionForm)
    const labels = elements("label");
    return Array.from(labels).some(label => label.textContent.includes(expectedLabelContent))
}

const renderAndSubmitMockQuestion = async () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
              <QuestionForm onSubmit={mockSubmit} />
            </UserContext.Provider>
          );
      
        fireEvent.change(screen.getByLabelText('Answer'), {
            target: { value: 'Multiple Choice' },
          });
        
        fireEvent.input(screen.getByLabelText('Question'), {
      target: { value: 'What is the capital of France?' },
    });

    const optionsInputs = elements('.answer-box');
    optionsInputs.forEach((optionInput, index) => {
      const city = ['Paris', 'London', 'Berlin', 'Madrid'][index];
      fireEvent.input(optionInput, { target: { value: city } });
    });

    const correctOptionRadios = screen.getAllByRole('radio');
    userEvent.click(correctOptionRadios[0])
    await waitFor(() => {
    expect(correctOptionRadios[0]).toBeChecked();
    });

    fireEvent.submit(form());
}

const testAnswerTypeInput = (answerType, expectedInputType, expectedCount) => {
    act(() => {
        renderLoggedInComponent(QuestionForm)
    });

    const select = element('#answerTypeSelect');
    select.value = answerType;
    select.dispatchEvent(new Event('change', {bubbles: true}));

    let inputs;
    if (expectedInputType === 'radio') {
        inputs = elements(`input[type="${expectedInputType}"]`);
        expect(inputs.length).toBe(expectedCount);
    } else if (expectedInputType === 'text') {
        inputs = elements(`input[type="${expectedInputType}"]`);
        expect(inputs.length).not.toBeNull();
    }
};

    it("renders the question form", () => {
        renderLoggedInComponent(QuestionForm)
        expect(form()).not.toBeNull();
    })
    it("renders a text input", () => {
        renderLoggedInComponent(QuestionForm)         
        expect(element("input[type=text]")).not.toBeNull();
    })
    it("renders a submit button", () => {
        renderLoggedInComponent(QuestionForm)
        expect(element("input[type=submit]")).not.toBeNull();
    })
    it("renders a label for the text box", () => {
        renderLoggedInComponent(QuestionForm)
        expect(element("label")).not.toBeNull();
    })
    it("render a label for the question", () => {
        renderLoggedInComponent(QuestionForm)
        expect(renderAndCheckLabel("Question")).toBe(true)
    })
    it("render a label for the answer", () => {
        renderLoggedInComponent(QuestionForm)
        expect(renderAndCheckLabel("Answer")).toBe(true)
    })
    it("allows the user to set the answer type", () => {
        renderLoggedInComponent(QuestionForm);
        const answerTypeSelect = element("#answerTypeSelect");
        expect(answerTypeSelect).not.toBeNull();
        expect(answerTypeSelect.tagName).toBe("SELECT");

        const options = Array.from(answerTypeSelect.options);
        const optionValues = options.map(option => option.value);
        expect(optionValues).toEqual(["Multiple Choice", "Text", "True/False"]);
    });

    it("correctly renders inputs for each answer type", () => {
        testAnswerTypeInput("Multiple Choice", "text", 4);
        testAnswerTypeInput("True/False", "text", 2)
        testAnswerTypeInput("Text", "text", 1);
    })
    it("Doesn't render answer inputs as a default", () => {
        renderLoggedInComponent(QuestionForm) 
        expect(elements(".answer-box").length).toBe(0);
    })
    it("allows users to edit options for multiple choice questions", () => {
        act(() => {
            renderLoggedInComponent(QuestionForm);
        });

        const select = element("#answerTypeSelect");
        select.value = "Multiple Choice";
        select.dispatchEvent(new Event("change", {bubbles: true}));

        const optionInputs = elements(".answer-box");
        expect(optionInputs.length).toBe(4);

        const firstOption = optionInputs[0];
        const testValue = "Option 1 Edited"
        firstOption.value = testValue
        firstOption.dispatchEvent(new Event("input", {bubbles: true}))

        expect(firstOption.value).toBe(testValue);
    })
    it("doesn't render the form if user is not logged in", () => {
        renderLoggedOutComponent(QuestionForm);
        expect(form()).toBeNull();
    })
    it("Allows the user to assign the correct answer for multiple choices questions", async () => {
       
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser, quizName: mockQuizName }}>
              <QuestionForm onSubmit={mockSubmit} />
            </UserContext.Provider>
          );
      
        fireEvent.change(screen.getByLabelText('Answer'), {
            target: { value: 'Multiple Choice' },
          });
        
        fireEvent.input(screen.getByLabelText('Question'), {
      target: { value: 'What is the capital of France?' },
    });

    const optionsInputs = elements('.answer-box');
    optionsInputs.forEach((optionInput, index) => {
      const city = ['Paris', 'London', 'Berlin', 'Madrid'][index];
      fireEvent.input(optionInput, { target: { value: city } });
    });

    const correctOptionRadios = screen.getAllByRole('radio');
    userEvent.click(correctOptionRadios[0])
    await waitFor(() => {
    expect(correctOptionRadios[0]).toBeChecked();
    });

    fireEvent.submit(form());

    await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      question: 'What is the capital of France?',
      answerType: 'Multiple Choice',
      answers: expect.arrayContaining(['Paris', 'London', 'Berlin', 'Madrid']),
      correctAnswer: 'Paris',
    }));
})
  });
  describe("Quiz-form", () => {
    it("Renders a set-up form", async () => {
        render(
            <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
              <QuestionForm onSubmit={mockSubmit} />
            </UserContext.Provider>
          );
      expect('.quiz-setup').not.toBeNull();
    })
  })
//   it("renders a list of submitted questions", () => {
//     renderLoggedInComponent(QuestionForm)
//     const questionList = element(".question-list")
//   })
});
