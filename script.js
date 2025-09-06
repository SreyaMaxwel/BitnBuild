// Financial questions (Shadha will add more here)
const questions = [
  {
    question: "You just got your first salary. What should you do first?",
    options: ["Spend it all on shopping", "Make a budget and set aside savings", "Take a loan for luxuries"],
    correct: 1,
    tip: "Budgeting ensures you save before spending."
  },
  {
    question: "Your credit card bill is due, but you also want a new gadget. What’s smarter?",
    options: ["Pay credit card bill first", "Buy gadget on EMI", "Ignore bill this month"],
    correct: 0,
    tip: "Paying bills on time avoids high interest and improves credit score."
  },
  {
    question: "What’s a better long-term financial habit?",
    options: ["Build an emergency fund", "Rely only on credit", "Spend whenever you feel like"],
    correct: 0,
    tip: "Emergency funds protect you in uncertain situations."
  }
];

// State variables
let currentQuestion = 0;
let score = 0;

// Load saved score if user refreshes
if (localStorage.getItem("score")) {
  score = parseInt(localStorage.getItem("score"));
}

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.correct) {
    feedbackEl.textContent = "✅ Correct! +" + 10 + " points. " + q.tip;
    score += 10;
  } else {
    feedbackEl.textContent = "❌ Wrong. " + q.tip;
  }

  // Save score
  localStorage.setItem("score", score);

  // Unlock badge
  if (score >= 20) {
    localStorage.setItem("badge", "Smart Saver");
  } else if (score >= 10) {
    localStorage.setItem("badge", "Budget Beginner");
  }

  // Show Next button
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "Your final score: " + score + " points.";
    nextBtn.style.display = "none";
  }
});

// Start quiz
loadQuestion();
