import React, { useEffect, useState } from 'react';
import './Styles.css'; // Import your CSS file
import axios from 'axios';
import {  TextField, Box, IconButton } from '@mui/material';
import wheel from '../Assets/spinIcon.png'
import { useLocation } from 'wouter';
const GameWithZoom = () => {
    const [location, setLocation] = useLocation();
    const [paragraph, setParagraph] = useState(`Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.`)
    const [questions, setQuestions] = useState([]);
    const [game, setGame] = useState(false); // Flag to track if questions are ready
    const [id, setID] = useState();
    const inputText = `AI-generated questions: parts {
  text: "## Paragraph Questions:\n\n**Question 1:** What is the primary function of a topic sentence in a paragraph?\n(A1) To state the main idea of the paragraph. \n(A2) To provide examples to support the main idea.\n(A3) To create a smooth transition between paragraphs.\n(A4) To introduce a new topic or idea.\n\n**Question 2:** What is NOT a common type of information found within a paragraph?\n(A1) A detailed explanation of a concept.\n(A2) A description of a person\'s physical appearance.\n(A3) A list of unrelated facts.\n(A4) A comparison of two different things.\n\n**Question 3:** What is one characteristic that ALL paragraphs share?\n(A1) They all include a topic sentence.\n(A2) They all contain a series of examples.\n(A3) They all describe a place or event.\n(A4) They all follow a chronological order.\n\n**Question 4:** Which of the following is NOT an example of information that could be included in a paragraph?\n(A1) A step-by-step guide on how to bake a cake.\n(A2) A description of the bustling city streets.\n(A3) A list of the different types of trees in a forest.\n(A4) A detailed analysis of a poem\'s symbolism.\n\n**Question 5:** What is the main idea of the provided paragraph?\n(A1) Paragraphs can contain various types of information.\n(A2) All paragraphs must have a clear topic sentence.\n(A3) Paragraphs are essential for effective writing.\n(A4) There are many different ways to structure a paragraph. \n"
}
role: "model"`;

const text = "parts {\n text: \"## Paragraph Comprehension Quiz\\n\\n**Question 1:**\\n\\nWhat is one of the most important characteristics shared by all paragraphs?\\n\\n**Answer:** A topic sentence\\n\\n**Wrong Answers:**\\n\\n* A conclusion sentence\\n* Multiple illustrations\\n* A series of events\\n\\n**Question 2:**\\n\\nWhat type of information can a paragraph NOT contain?\\n\\n**Answer:** None of the above. Paragraphs can contain a wide range of information.\\n\\n**Wrong Answers:**\\n\\n* A series of brief examples\\n* A description of a place\\n* A narrative of events\\n\\n**Question 3:**\\n\\nWhat is a paragraph that compares or contrasts two things called?\\n\\n**Answer:** Comparative/Contrastive Paragraph\\n\\n**Wrong Answers:**\\n\\n* Narrative Paragraph\\n* Descriptive Paragraph\\n* Expository Paragraph\\n\\n**Question 4:**\\n\\nWhat is the purpose of a topic sentence in a paragraph?\\n\\n**Answer:** To state the main idea of the paragraph.\\n\\n**Wrong Answers:**\\n\\n* To provide a concluding statement.\\n* To introduce a new topic.\\n* To offer supporting details.\\n\\n**Question 5:**\\n\\nWhich of the following is NOT an example of information a paragraph could contain?\\n\\n**Answer:** A mathematical equation\\n\\n**Wrong Answers:**\\n\\n* A description of a process\\n* A classification of items into categories\\n* A series of events \\n\"\n}\nrole: \"model\"\n";
const inputTextArabic = `AI-generated questions: parts {
  text: "## أسئلة وأجوبة عن الفقرة:\n\n**السؤال 1:** ما هي العلامة التي تدل على أن الجملة اسمية؟\n\n**الاختيارات:**\n(أ) وجود فعل.\n(ب) وجود حرف نصب.\n(ج) وجود اسم مرفوع. \n(د) وجود حرف جر.\n\n**الإجابة الصحيحة:** (ج) وجود اسم مرفوع.\n\n**الاختيارات الخاطئة:**\n(أ) وجود فعل - هذا يدل على أن الجملة فعلية.\n(ب) وجود حرف نصب - هذا يدل على أن الجملة خبرية.\n(د) وجود حرف جر - هذا يدل على أن الجملة جار ومجرور.\n\n**السؤال 2:** ما هي الحروف التي تدخل على الجمل الاسمية؟\n\n**الاختيارات:**\n(أ) إن، ليت، لكن، لعل\n(ب) أنّ، إنّ، أنّي، إنّما\n(ج) ليت، لكن، لعل، أن\n(د) إن، أنّ، أنّي، إنّما\n\n**الإجابة الصحيحة:** (أ) إن، ليت، لكن، لعل\n\n**الاختيارات الخاطئة:**\n(ب) أنّ، إنّ، أنّي، إنّما - هذه الحروف تدخل على الجمل الخبرية.\n(ج) ليت، لكن، لعل، أن - أن حرف عطف وليس حرفًا يدخل على الجمل الاسمية.\n(د) إن، أنّ، أنّي، إنّما -  أنّ، أنّي، إنّما تدخل على الجمل الخبرية.\n\n**السؤال 3:** ما هو معنى حرف \"لكن\" في الجمل الاسمية؟\n\n**الاختيارات:**\n(أ) التمني.\n(ب) الاستدراك.\n(ج) القسم.\n(د) الاستفهام.\n\n**الإجابة الصحيحة:** (ب) الاستدراك.\n\n**الاختيارات الخاطئة:**\n(أ) التمني - هذا هو معنى حرف \"ليت\".\n(ج) القسم - هذا هو معنى حرف \"إن\".\n(د) الاستفهام - هذا هو معنى حرف \"هل\". \n"`;

// Function to parse Arabic questions
const parseQuestionsArabic = (input) => {
    const questionsPattern = /(?<=\*\*السؤال\s\d:\*\* )(.+?)\n\n\*\*الاختيارات:\*\*\n((?:\([أ-د]\).+\n)+)\n\*\*الإجابة الصحيحة:\*\*\s\(([أ-د])\)\s(.+?)\n\n\*\*الاختيارات الخاطئة:\*\*\n((?:\([أ-د]\).+\n)+)/g;
    const answersPattern = /\(([أ-د])\)\s(.+)/g;
    
    const matches = [...input.matchAll(questionsPattern)];
    const output = matches.map((match) => {
        const questionTitle = match[1].trim();
        const choicesText = match[2];
        const correctAnswerLetter = match[3];
        const correctAnswerText = match[4].trim();
        const wrongAnswersText = match[5];
        
        // Parse choices
        const answers = [];
        let correctAnswerIndex = -1;
        [...choicesText.matchAll(answersPattern)].forEach((choiceMatch, index) => {
            const choiceLetter = choiceMatch[1];
            const choiceText = choiceMatch[2].trim();
            answers.push({ text: choiceText, image: null });
            
            if (choiceLetter === correctAnswerLetter) {
                correctAnswerIndex = index;
            }
        });
        
        // Return structured question object
        return {
            title: questionTitle,
            answers,
            correctAnswerIndex
        };
    });
    
    return output;
};

// Parse and log the output
const parsedQuestionsAR = parseQuestionsArabic(inputTextArabic);
//console.log(JSON.stringify(parsedQuestionsAR , null, 2));

const parseAllQuestionsAndAnswers = (rawText) => {
    // Define regex pattern to capture each question block
    const questionPattern = /(\*\*Question \d+:\*\*.*?)(?=\*\*Question \d+:|$)/gs;
    // Define regex pattern to capture each answer choice until the next question
    const answerPattern = /\(A[1-4]\) (.*?)(?=\(A[1-4]\)|\*\*Question|\n$|$)/gs;

    const questionsWithAnswers = [];
    let questionMatch;

    // Execute regex to find all question blocks
    while ((questionMatch = questionPattern.exec(rawText)) !== null) {
        const questionBlock = questionMatch[1].trim();

        // Extract only the question text until the first question mark
        const questionText = questionBlock.split('?')[0] + '?'; // Retain the question mark

        // Initialize an object to store the current question and its answers
        const questionData = {
            title: questionText.trim(),
            answers: []
        };

        // Use lastIndex to find where to start looking for answers
        const startIndex = questionMatch.index + questionMatch[0].length;
        const nextQuestionMatch = questionPattern.exec(rawText); // Get the next question to determine the end of the current question's answers

        // Extract answers for this question using a regex search
        let answerMatch;
        while ((answerMatch = answerPattern.exec(rawText)) !== null) {
            // If we reached the next question, break the loop
            if (nextQuestionMatch && answerMatch.index >= nextQuestionMatch.index) {
                break;
            }

            // Clean each answer by removing unwanted characters
            const answerText = answerMatch[1]
                .replace(/\\n/g, '')              // Remove all instances of `\n`
                .replace(/\\+/g, '')              // Remove any remaining backslashes
                .replace(/\n/g, '')               // Remove newline characters
                .replace(/}role:.*/, '')          // Remove unwanted trailing parts like `}role:`
                .trim();

            if (answerText) { // Only add non-empty answers
                questionData.answers.push({ text: answerText, image: null });
            }
        }

        // Add the question and its answers to the array
        questionsWithAnswers.push(questionData);
    }

    return questionsWithAnswers;
};
// Function to parse the input 
const parseAllQuestions = (rawText) => {
    // Use regex to match each question block from "Question" to the next "Question" or end
    const questionPattern = /(\*\*Question \d+:\*\*.*?)(?=\*\*Question \d+:|$)/gs;

    const questions = [];
    let match;

    // Execute the regex to get all question blocks
    while ((match = questionPattern.exec(rawText)) !== null) {
        const questionBlock = match[1].trim();

        // Extract only the question text until the first question mark
        const questionText = questionBlock.split('?')[0] + '?'; // Retain the question mark

        // Add the extracted question text with asterisks to the questions array
        questions.push({ title: questionText.trim() });
    }

    return questions;
};
const extractTitles = (questions) => {
    return questions.map((questionBlock) => {
        // Remove the '**Question x:**' part and keep the rest of the question
        const title = questionBlock.title.replace(/\*\*Question \d+\:\*\*\s*/, '').split('?')[0] + '?';
        return { title: title.trim() }; // Return as an object
    });
};

const parseAllAnswers = (rawText) => {
    // Define regex pattern to capture each answer choice until the next question
    const answerPattern = /\(A[1-4]\) (.*?)(?=\(A[1-4]\)|\*\*Question|\n$|$)/gs;

    const allAnswers = [];
    let match;

    // Execute regex to find all answer options until the next question or end of block
    while ((match = answerPattern.exec(rawText)) !== null) {
        // Clean each answer by removing unwanted characters
        const answerText = match[1]
            .replace(/\\n/g, '')              // Remove all instances of \n
            .replace(/\\+/g, '')    
            .replace(/\n/g, '')          // Remove all instances of \\
            .replace(/"}role:.*/, '')          // Remove unwanted trailing parts like }role:
            .trim();

        if (answerText) { // Only add non-empty answers
            allAnswers.push({ text: answerText, image: null });
        }
    }

    return allAnswers;
};

// const parseAllWrongAnswers = (rawText) => {
//     // Use regex to match the block of wrong answers
//     const wrongAnswerPattern = /(\*\*Wrong Answers:\*\*.*?)(?=\\n\\n\*\*Question \d+:|$)/gs;

//     const wrongAnswers = [];
//     let match;

//     // Execute the regex to get all wrong answer blocks
//     while ((match = wrongAnswerPattern.exec(rawText)) !== null) {
//         const wrongAnswerBlock = match[1].trim();

//         // Remove the '**Wrong Answers:**' and the surrounding newlines
//         const answerText = wrongAnswerBlock.split('\n')[0];
//         wrongAnswers.push({ text: answerText.trim(), image: null });
//     }
//     return wrongAnswers;
// }
// const extractCleanedWrongAnswers = (answers) => {
//     return answers.map((answerBlock) => {
//         // Remove the '**Answer:**' part and keep the rest
//         const answerText = answerBlock.text.replace(/\*\*Wrong Answers:\*\*\s*/, '').split('\n')[0];        
//         return { text: answerText.trim().slice(0, -6), image: null };
//     });
// };
// Example usage with your raw text
const rawText = "## Paragraph Comprehension Quiz\n\n**Question 1:**\n\nWhat is one of the most important characteristics shared by all paragraphs?\n\n**Answer:** A topic sentence\n\n**Wrong Answers:**\n\n* A conclusion sentence\n* Multiple illustrations\n* A series of events\n\n**Question 2:**\n\nWhat type of information can a paragraph NOT contain?\n\n**Answer:** None of the above. Paragraphs can contain a wide range of information.\n\n**Wrong Answers:**\n\n* A series of brief examples\n* A description of a place\n* A narrative of events\n\n**Question 3:**\n\nWhat is a paragraph that compares or contrasts two things called?\n\n**Answer:** Comparative/Contrastive Paragraph\n\n**Wrong Answers:**\n\n* Narrative Paragraph\n* Descriptive Paragraph\n* Expository Paragraph\n\n**Question 4:**\n\nWhat is the purpose of a topic sentence in a paragraph?\n\n**Answer:** To state the main idea of the paragraph.\n\n**Wrong Answers:**\n\n* To provide a concluding statement.\n* To introduce a new topic.\n* To offer supporting details.\n\n**Question 5:**\n\nWhich of the following is NOT an example of information a paragraph could contain?\n\n**Answer:** A mathematical equation\n\n**Wrong Answers:**\n\n* A description of a process\n* A classification of items into categories\n* A series of events \n";

const parseAll = (rawText) => {
    // Step 1: Parse questions
    const question = parseAllQuestions(rawText);
    const questions= extractTitles(question)
    // Step 2: Parse answers
    const allAnswers = parseAllAnswers(rawText);
    
    // Step 3: Combine questions and answers
    const combinedData = questions.map((question, index) => {
        // Get 4 answers for each question (you may need to adjust this logic)
        const answers = allAnswers.slice(index * 4, index * 4 + 4);

        // Ensure there's a correct answer index (e.g., 0 for the first answer)
        const correctAnswerIndex = 0; // You can adjust this logic as needed

        return {
            title: question.title,
            answers: answers,
            correctAnswerIndex: correctAnswerIndex
        };
    });

    return combinedData;
};

const parsedQuestions = parseAll(inputText);


console.log(parsedQuestions);
// Execute the parsing function
//const parsedQuestions = parseQuestionsLineByLine(inputText);

// Log the result
//console.log(parsedQuestions);

// Handle when questions are ready and trigger postQuestion calls
// useEffect(() => {
//     if (questionsReady && questions.length > 0) {
//         handleNext();
//         setQuestionsReady(false); // Reset flag after handling
//     }
// }, [questionsReady, questions]);


    const getQuestions = async (paragraph) => {
        try {
            const response = await axios.get("http://localhost:8000/api/generate-questions/", {
                params: {
                    paragraph:encodeURIComponent(`generate 5 questions with 4 answers, ts with "questions n:" and answers are (A1,A2,A3,A4) and A1 is the correct answer from the following paragraph: ${paragraph}`),
                },
            });
    
            if (response.status === 200) {
                console.log('AI-generated questions:', response.data.questions);
                // const formattedQuestions = response.data.questions;
                //const plsYaAllah = changeQuotesToBackticks(formattedQuestions);
                // const parsedQuestions = parseQuestions(plsYaAllah);
                // console.log(parsedQuestions);
                const bismillah = JSON.stringify(response.data.questions)
//where each questions star
                const parsedQuestions = parseAll(bismillah);
                //const extracted = extractCleanedCorrectAnswers(parsedQuestions)
                setQuestions(parsedQuestions);
                //extractQuestions(JSON.stringify(response.data.questions));
                
                
                
                //setQuestions(JSON.stringify(parseQuestionsArabic(response.data.questions)));// Assuming you have a state for questions
                //console.log(questions);
                
              
         } else {
                console.error('Error fetching questions:', response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
   // Original text with double quotes
const originalText = "This is a paragraph with a newline character \\n and more text.";

// Creating a new text wrapped in backticks, preserving the original
const newTextWithBackticks = `\`${originalText}\``;

console.log("Original Text:", originalText);
console.log("New Text with Backticks:", newTextWithBackticks);

    const postGame = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/games/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: 'AI Test', creator: 1}),
          });
          const data = await response.json();
          return data.id; // Return the game ID for creating questions
        } catch (error) {
          console.error('Error posting game:', error);
        }
      };
    
      const postQuestion = async (questionData, gameId) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/questions/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({...questionData, game: gameId }),
          });
    
        } catch (error) {
          console.error('Error posting question:', error);
        }
      };
  
      const handleNext = async () => {
        const gameId = await postGame();
        //postQuestion("hi");
        setID(gameId)
        for (const question of questions) {
            console.log({title: question.title, answers: question.answers, correctAnswerIndex : question.correctAnswerIndex }, 31)
            await postQuestion({ title: question.title, answers: question.answers, correct_answer_index : question.correctAnswerIndex }, gameId);
        }
        setGame(true)
      }

      const handleChange = (event) => {
        const newValue = event.target.value;
        setParagraph(newValue); // Update the paragraph state
    };

    return (
      <div>
        <h2>Question Generator</h2>
        <TextField
                label="Enter Paragraph"
                variant="outlined"
                fullWidth
                multiline
                rows={4} // Adjust the number of visible rows
                value={paragraph}
                onChange={handleChange} // Call setParagraph on value change
                margin="normal" // Adds some margin
            />
          <button onClick={() => getQuestions(paragraph)}>Get Questions</button>
          
{questions.length > 0? (
    <>
    
        <div>
          <h3>الأسئلة </h3>
          <ul>
  {questions.map((q, index) => (
    <li key={index}>
      <strong> {q.title}</strong>
      <ul>
        {q.answers.map((answer, answerIndex) => (
          <li
            key={answerIndex}
            style={{
              color: answerIndex === q.correctAnswerIndex ? 'green' : 'black',
              fontWeight: answerIndex === q.correctAnswerIndex ? 'bold' : 'normal'
            }}
          >
            {answer.text}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>
        </div></>):(<></>)}
        <button onClick={() => handleNext(paragraph)}>اصنع اللعبة!</button>
        <button onClick={() => getQuestions(paragraph)}>إعادة إنتاج الأسئلة</button>
        {game === true?
        <>
        <img src={wheel} onClick={() => setLocation(`/PlayGame/${id}`)}></img>
        </>
        :<></>}
      </div>
    );
  };
export default GameWithZoom;