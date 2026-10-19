import { useState } from "react";

const demoQuestions = [
  {
    id: 1,
    question: "Which data structure follows the FIFO principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    id: 2,
    question: "Which protocol is used to securely browse websites?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2
  },
  {
    id: 3,
    question: "Which of these is a JavaScript library for user interfaces?",
    options: ["React", "MongoDB", "Express", "Nginx"],
    correct: 0
  },
  {
    id: 4,
    question: "Which SQL command retrieves data from a table?",
    options: ["DELETE", "SELECT", "UPDATE", "DROP"],
    correct: 1
  },
  {
    id: 5,
    question: "Which component should enforce the official exam deadline?",
    options: [
      "A browser animation",
      "A CSS rule",
      "The backend server",
      "A button label"
    ],
    correct: 2
  }
];

const initialExams = [
  {
    id: 1,
    title: "Computer Science Fundamentals",
    category: "COMPUTER SCIENCE",
    duration: 30,
    questions: 20,
    difficulty: "Intermediate",
    color: "purple"
  },
  {
    id: 2,
    title: "Web Development Essentials",
    category: "WEB TECHNOLOGY",
    duration: 20,
    questions: 15,
    difficulty: "Beginner",
    color: "blue"
  },
  {
    id: 3,
    title: "Database Management Systems",
    category: "DATABASES",
    duration: 45,
    questions: 30,
    difficulty: "Advanced",
    color: "orange"
  }
];

export default function App() {
  const [page, setPage] = useState("student");
  const [activeExam, setActiveExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [exams, setExams] = useState(initialExams);
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("20");

  function startExam(exam) {
    setActiveExam(exam);
    setAnswers({});
    setQuestionIndex(0);
    setResult(null);
    setPage("taking");
  }

  function finishExam() {
    const correct = demoQuestions.filter(
      (question) => answers[question.id] === question.correct
    ).length;

    const attempted = Object.keys(answers).length;

    setResult({
      correct,
      attempted,
      total: demoQuestions.length,
      score: Math.round((correct / demoQuestions.length) * 100)
    });

    setActiveExam(null);
    setPage("results");
  }

  function createDemoExam(event) {
    event.preventDefault();

    if (!newTitle.trim()) return;

    setExams((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTitle.trim(),
        category: "TEACHER CREATED",
        duration: Number(newDuration),
        questions: 5,
        difficulty: "Custom",
        color: "green"
      }
    ]);

    setNewTitle("");
    setPage("teacher");
  }

  const question = demoQuestions[questionIndex];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage("student")}>
          <span className="brand-icon">E</span>
          <span>ExamPilot<span className="brand-dot">.</span></span>
        </button>

        <div className="side-label">WORKSPACE</div>

        <button
          className={`nav-link ${page !== "teacher" ? "selected" : ""}`}
          onClick={() => setPage("student")}
        >
          <span>▦</span> Student dashboard
        </button>

        <button
          className={`nav-link ${page === "teacher" ? "selected" : ""}`}
          onClick={() => setPage("teacher")}
        >
          <span>▤</span> Teacher studio
        </button>

        <div className="sidebar-bottom">
          <div className="secure-card">
            <span className="secure-icon">✦</span>
            <strong>Built for better exams</strong>
            <p>Simple, focused and accessible assessment design.</p>
          </div>
          <div className="profile-row">
            <div className="avatar">D</div>
            <div>
              <strong>Demo User</strong>
              <p>Prototype account</p>
            </div>
            <span className="profile-more">···</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> ExamPilot</div>
          <div className="topbar-right">
            <span className="demo-badge">DEMO MODE</span>
            <div className="avatar small-avatar">D</div>
          </div>
        </header>

        {page === "student" && (
          <section className="page-content">
            <div className="welcome-row">
              <div>
                <div className="eyebrow">YOUR LEARNING SPACE</div>
                <h1>Ready to ace your exams?</h1>
                <p className="muted">
                  Practice, track your progress, and prepare with confidence.
                </p>
              </div>
              <div className="welcome-art" aria-hidden="true">
                <div className="art-sheet">✓</div>
                <div className="art-star">✦</div>
              </div>
            </div>

            <div className="stat-grid">
              <Stat label="Available exams" value={exams.length} icon="▤" />
              <Stat label="Questions in demo" value="5" icon="◎" />
              <Stat label="Your last score" value={result ? `${result.score}%` : "—"} icon="↗" />
            </div>

            <div className="section-heading">
              <div>
                <h2>Explore examinations</h2>
                <p className="muted">Choose a test to try the demo experience.</p>
              </div>
              <span className="count-pill">{exams.length} exams</span>
            </div>

            <div className="exam-grid">
              {exams.map((exam) => (
                <article className="exam-card" key={exam.id}>
                  <div className={`exam-art ${exam.color}`}>
                    <span className="exam-category">{exam.category}</span>
                    <div className="exam-symbol">
                      {exam.color === "blue" ? "⌘" :
                        exam.color === "orange" ? "▧" :
                        exam.color === "green" ? "✎" : "⌬"}
                    </div>
                  </div>

                  <div className="exam-body">
                    <span className="difficulty">{exam.difficulty}</span>
                    <h3>{exam.title}</h3>
                    <div className="exam-meta">
                      <span>◷ {exam.duration} min</span>
                      <span>▤ {exam.questions} questions</span>
                    </div>
                    <button className="primary-button full-button"
                      onClick={() => startExam(exam)}>
                      Try demo exam <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="notice">
              <span>ⓘ</span>
              <p>
                This is a demonstration. The quiz uses sample questions and
                local browser state, not a real account or secure exam session.
              </p>
            </div>
          </section>
        )}

        {page === "taking" && activeExam && (
          <section className="page-content exam-page">
            <button className="back-link" onClick={() => setPage("student")}>
              ← Back to dashboard
            </button>

            <div className="exam-header">
              <div>
                <div className="eyebrow">PRACTICE SESSION</div>
                <h1>{activeExam.title}</h1>
                <p className="muted">Sample quiz · No official score is recorded</p>
              </div>
              <div className="timer-box">
                <span>DEMO TIMER</span>
                <strong>{activeExam.duration}:00</strong>
              </div>
            </div>

            <div className="progress-track">
              <div style={{
                width: `${((questionIndex + 1) / demoQuestions.length) * 100}%`
              }} />
            </div>

            <div className="question-layout">
              <article className="question-card">
                <div className="question-top">
                  <span className="question-count">
                    QUESTION {questionIndex + 1} OF {demoQuestions.length}
                  </span>
                  <span className="marks-label">1 mark</span>
                </div>

                <h2>{question.question}</h2>

                <div className="option-list">
                  {question.options.map((option, index) => (
                    <button
                      key={option}
                      className={`option-button ${
                        answers[question.id] === index ? "option-selected" : ""
                      }`}
                      onClick={() => setAnswers((current) => ({
                        ...current,
                        [question.id]: index
                      }))}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      <span className="option-check">
                        {answers[question.id] === index ? "✓" : ""}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="question-actions">
                  <button
                    className="secondary-button"
                    disabled={questionIndex === 0}
                    onClick={() => setQuestionIndex((index) => index - 1)}
                  >
                    ← Previous
                  </button>

                  {questionIndex < demoQuestions.length - 1 ? (
                    <button className="primary-button"
                      onClick={() => setQuestionIndex((index) => index + 1)}>
                      Next question →
                    </button>
                  ) : (
                    <button className="primary-button"
                      onClick={finishExam}>
                      Finish demo
                    </button>
                  )}
                </div>
              </article>

              <aside className="question-nav-card">
                <h3>Question navigator</h3>
                <p className="muted">Select a question to visit it.</p>
                <div className="number-grid">
                  {demoQuestions.map((item, index) => (
                    <button key={item.id}
                      className={`number-button ${
                        index === questionIndex ? "number-current" : ""
                      } ${answers[item.id] !== undefined ? "number-answered" : ""}`}
                      onClick={() => setQuestionIndex(index)}>
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="legend">
                  <span><i className="legend-current" /> Current</span>
                  <span><i className="legend-answered" /> Answered</span>
                </div>
                <div className="answer-summary">
                  <strong>{Object.keys(answers).length} of {demoQuestions.length}</strong>
                  <span>questions answered</span>
                </div>
              </aside>
            </div>
          </section>
        )}

        {page === "results" && (
          <section className="page-content results-page">
            <div className="result-icon">✓</div>
            <div className="eyebrow">DEMO SESSION COMPLETE</div>
            <h1>Your practice result</h1>
            <p className="muted">
              This result is calculated from the sample questions in your browser.
            </p>

            {result && (
              <div className="result-card">
                <div className="score-circle">
                  <strong>{result.score}%</strong>
                  <span>Demo score</span>
                </div>
                <div className="result-stats">
                  <div><span>Correct</span><strong>{result.correct}</strong></div>
                  <div><span>Attempted</span><strong>{result.attempted}</strong></div>
                  <div><span>Total questions</span><strong>{result.total}</strong></div>
                </div>
              </div>
            )}

            <button className="primary-button"
              onClick={() => setPage("student")}>
              Return to dashboard →
            </button>
          </section>
        )}

        {page === "teacher" && (
          <section className="page-content">
            <div className="eyebrow">TEACHER WORKSPACE</div>
            <h1>Teacher studio</h1>
            <p className="muted">
              Preview the exam creation workflow. Exams created here are demo-only.
            </p>

            <div className="teacher-layout">
              <form className="create-card" onSubmit={createDemoExam}>
                <div className="form-icon">＋</div>
                <h2>Create a practice exam</h2>
                <p className="muted">
                  Add an exam card to your local demonstration dashboard.
                </p>

                <label htmlFor="exam-title">Examination title</label>
                <input id="exam-title" value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. Operating Systems" required maxLength={100}/>

                <label htmlFor="exam-duration">Duration in minutes</label>
                <select id="exam-duration" value={newDuration}
                  onChange={(event) => setNewDuration(event.target.value)}>
                  <option value="10">10 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>

                <button className="primary-button full-button" type="submit">
                  Create demo exam →
                </button>
              </form>

              <div className="teacher-info">
                <div className="info-icon">✦</div>
                <h2>Coming in the secure backend</h2>
                <ul>
                  <li>Question bank and MCQ editor</li>
                  <li>Descriptive questions and manual evaluation</li>
                  <li>Configurable negative marking</li>
                  <li>Randomized question selection</li>
                  <li>Secure publication and scheduled exams</li>
                  <li>Student results and reports</li>
                </ul>
              </div>
            </div>

            <div className="notice">
              <span>ⓘ</span>
              <p>
                This prototype has no teacher authentication or database.
                Do not enter real student data or publish real examinations yet.
              </p>
            </div>
          </section>
        )}

        <footer className="footer">
          <span>© 2026 ExamPilot · Development prototype</span>
          <span>Built for a better examination experience</span>
        </footer>
      </main>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
    </article>
  );
}
