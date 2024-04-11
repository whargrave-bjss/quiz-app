const testMultipleChoiceQuestion = {
    question: "What fruit fell on Isaac Newton's head which led to the discovery of gravity?",
    type: "multiple-choice",
    choices: ["Banana", "Tomato", "Apple", "Grapefruit"],
    answer: "Apple"
   }
const testTextQuestion = {
       question: "What fruit fell on Isaac Newton's head which led to the discovery of gravity?",
       type: "text",
       choices: "",
       answer: "Apple"
      }
export const manualQuestionsSet = {
questions: [testMultipleChoiceQuestion, testTextQuestion],
name: "science",
set_id: 1,
made_by: "Annie",
assigned_to: "Will"
}

export const mockCurrentUser = {
    id: 'user1',
    name: 'Will'
}

export const mockOtherUser = {
    id: "user2",
    name: "Annie"
}

