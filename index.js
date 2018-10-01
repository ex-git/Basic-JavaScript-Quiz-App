'use strict'

const STORE = {
  questions: [
   {question:'Inside which HTML element do we put the JavaScript?',
   choices: ['&lt;javascript&gt;','&lt;code&gt;','&lt;script&gt;','&lt;div&gt;'],
   answer: 1},
   {question:'What is the correct syntax for referring to an external script called "xxx.js"',
   choices: ['&lt;script src="xxx.js"&gt;','&lt;script ref="xxx.js"&gt;','&lt;script rel="xxx.js"&gt;','&lt;script url="xxx.js"&gt;'],
   answer: 0},
   {question:'How to write an IF statement in JavaScript?',
   choices: ['if (i === 5) {}','if i == 5 {}','if i = 5 {}','if i eq 5 {}'],
   answer: 0},
   {question:'How to write an FOR statement in JavaScript?',
   choices: ['for (let i =0, i <10, i++) {}','for (let i =0; i <10; i++) {}','for (let i =0 i <10 i++) {}','for i =0 i <10 i++'],
   answer: 1},
   {question:'How to write an WHILE statement in JavaScript?',
   choices: ['while i <= 10 {}','while < 10 {}','while (i <= 10) {}','while {<1=10}'],
   answer: 2},
   {question:'What are the Truthy values in JS',
   choices: ['false, 0, "", null, undefined, and NaN','true','1','All values are truthy unless they are defined as falsy'],
   answer: 3},
   {question:'How do you create a function in JavaScript?',
   choices: ['function = myFunction()','function myFunction()','myFunction()','function : myFunction()'],
   answer: 1},
   {question:'How do you call a function named "myFunction"',
   choices: ['myFunction()','myFunction','call myFunction()','run myFunction()'],
   answer: 0},
   {question:'Where is the correct place to insert a JavaScript?',
   choices: ['Anywhere except the &lt;head&gt; and &lt;body&gt; section','Only the &lt;head&gt; section','Only the &lt;body&gt;','Both the &lt;head&gt; and the &lt;body&gt; section'],
   answer: 3},
   {question:'What will code console.log(0.1 + 0.2 === 0.3); output?',
   choices: ['0.1 + 0.2 == 0.3','0.1 0.2 0.3','0.3','false'],
   answer: 3}],
   currentQuestion: -1,
   currentScore: 0
  }

// render page and catch submit event
function start() {
  renderCurrentDisplay();
  $('.main').on('submit', event => {
    event.preventDefault();
    setScore();
    });
  $('.main').on('click', '.next', event => {
    if (STORE.currentQuestion <= STORE.questions.length) {
    updateNavBar();
    renderCurrentDisplay();
    }});
  $('.main').on('click', '.reset', event => location.reload())
  }

function setScore() {
  // get selected answer from question and convert to number
  let selected = parseInt($('input[name="choices"]:checked').val());
  // get the correct answer for the question
  // compare user selected answer and setScore
  if (STORE.currentQuestion === -1) {
    updateNavBar();
    renderCurrentDisplay();
  }
  else if (STORE.currentQuestion > STORE.questions.length) {
    STORE.currentQuestion = 0;
    STORE.currentScore = 0;
    renderCurrentDisplay();
  }
  else if (isNaN(selected)) {
    renderCurrentDisplay();
    }
  else if (selected === STORE.questions[STORE.currentQuestion].answer) {
    feedBack(1)
    }
  else if (selected !== STORE.questions[STORE.currentQuestion].answer) {
    feedBack(0)
    }
}
//render feedback page
function feedBack(result) {
  if (result === 1) {
    $('.main').html(`<div class="quiz js-feedBack">
        <h2>Yes! That is correct.</h2>
        <button type="button" class="next">Next Question</button>
      </div>`);
  STORE.currentScore+=1;
  updateNavBarScore(1);
  }
  else if (result === 0) {
    $('.main').html(`
    <div class="quiz js-feedBack">
        <h2>Oops! That is incorrect!</h2>
        <p>The correct answer is: <span class="answer">${STORE.questions[STORE.currentQuestion].choices[STORE.questions[STORE.currentQuestion].answer]}</strong></span></p>
        <button type="button" class="next">Next Question</button>
      </div>`);
  }
    STORE.currentQuestion +=1;
}

//render info bar with current question and score
function updateNavBar() {
  if (STORE.currentQuestion < STORE.questions.length) {$('.js-bar').html(`Question <span class="current">${STORE.currentQuestion+1}</span> /10, Score <span class="score">${STORE.currentScore}</span>`)};
}

//update info bar's question# and score only
function updateNavBarScore(effect) {
  if (STORE.currentQuestion < STORE.questions.length) {
    $('.current').text(STORE.currentQuestion+1)
  };

  if (effect===1)
  {$('.score').text(STORE.currentScore).slideUp(100).slideDown(80).slideUp(50).slideDown(20);}
  else {$('.score').text(STORE.currentScore)}
}

//render current display page
function renderCurrentDisplay() {
   if (STORE.currentQuestion === -1) {
    $('.main').html(`<div class="quiz js-intro">
        <h2>Are you ready to test your Javascript skills level?</h2>
        <button type="button" class="next">Lets Go</button>
      </div>`);
    STORE.currentQuestion +=1;
   }
   else if (STORE.currentQuestion === 10) {
    $('.main').html(`<div class="quiz js-result">
        <h2>Your total test score is ${STORE.currentScore} / 10!</h2>
        <p>Happy coding !!!</p>
        <button type="button" class="reset">Start Over</button>
      </div>`);
   }
   else {
     let choices = STORE.questions[STORE.currentQuestion].choices.map((choice,idx) =>
      `<input type="radio" name="choices" required id="answer${idx}" value="${idx}">
       <label for="answer${idx}">${choice}</label>`
    );
    $('.main').html(`<form class='quiz'><fieldset name="questions" class="js-questions">
        <legend><span class="question">Question ${STORE.currentQuestion+1}:</span> ${STORE.questions[STORE.currentQuestion].question}</legend>
        ${choices.join('')}
        <button type="submit">Check my answer</button>
        <div class="js-image"><a href="/" title="Basic JavaScript Quiz"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="image of JavaScript" width="50px"></a></div>
      </fieldset></form>`);
      updateNavBarScore(0);
   }
}

// when the page loads, call start
$(start);