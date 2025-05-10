const questions = [ 
  {
    category: "Science", 
    question: "What planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Jupiter"], 
    answer: "Mars" 
  },
  {
    category: "History",
    question: "Who was the first President of the United States?",
    choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
    answer: "George Washington"
  },
  {
    category: "Geography",
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris"],
    answer: "Paris"
  },
  {
    category: "Math",
    question: "What is 7 multiplied by 6?",
    choices: ["42", "36", "48"],
    answer: "42"
  },
  {
    category: "Literature",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Mark Twain", "Charles Dickens"],
    answer: "William Shakespeare"
  }
];
function getRandomQuestion(questionsArray) {
  const index = Math.floor(Math.random() * questionsArray.length);
  return questionsArray[index];
}
function getRandomComputerChoice(choicesArray) {
  const index = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[index];
}
function getResults(questionObj, computerChoice) {
  if (computerChoice === questionObj.answer) {
    return "The computer's choice is correct!"; 
  } else {
    return `The computer's choice is wrong. The correct answer is: ${questionObj.answer}`; 
  }
}

