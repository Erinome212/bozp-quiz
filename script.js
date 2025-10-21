let currentIndex = 0;
let score = 0;
let quizData = [];

async function loadQuiz() {
  const response = await fetch("quiz_data.json");
  quizData = await response.json();

  // Shuffle questions randomly
  quizData = quizData.sort(() => Math.random() - 0.5);

  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("next-btn");
  const scoreEl = document.getElementById("score");

  container.innerHTML = "";
  scoreEl.classList.add("hidden");

  if (currentIndex >= quizData.length) {
    container.innerHTML = `
      <p class="text-xl font-semibold text-center mb-4">🎉 Kvíz ukončený!</p>
      <p class="text-lg text-center">Tvoj výsledok: <strong>${score} / ${quizData.length}</strong></p>
      <button onclick="restartQuiz()" class="bg-blue-600 text-white px-4 py-2 rounded mt-4 block mx-auto">Opakovať kvíz</button>
    `;
    nextBtn.classList.add("hidden");
    return;
  }

  const q = quizData[currentIndex];
  const question = document.createElement("h2");
  question.className = "text-lg font-semibold";
  question.textContent = q.question;
  container.appendChild(question);

  // Progress
  const progress = document.createElement("p");
  progress.className = "text-sm text-gray-500 mb-3";
  progress.textContent = `Otázka ${currentIndex + 1} z ${quizData.length}`;
  container.appendChild(progress);

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "block w-full text-left bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 mt-2";
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer, q.correct, btn);
    container.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function checkAnswer(selected, correct, btn) {
  const buttons = document.querySelectorAll("#quiz-container button");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add("bg-green-300");
    score++;
  } else {
    btn.classList.add("bg-red-300");
    const correctBtn = Array.from(buttons).find(b => b.textContent === correct);
    if (correctBtn) correctBtn.classList.add("bg-green-300");
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  quizData = quizData.sort(() => Math.random() - 0.5);
  showQuestion();
}

loadQuiz();
