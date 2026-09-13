import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

import { supabase, supabaseConfigured } from './supabase'
import './styles.css'


/* =========================================================
   EXAM TRACKS
   ========================================================= */

const EXAMS = [
  {
    key: 'upsc',
    title: 'UPSC Civil Services',
    tag: 'Prelims • GS • CSAT',
    icon: 'UP',
    accent: 'navy'
  },
  {
    key: 'clat',
    title: 'CLAT / AILET',
    tag: 'Legal • English • GK',
    icon: 'CL',
    accent: 'violet'
  },
  {
    key: 'neet',
    title: 'NEET UG / PG',
    tag: 'Medical • Science',
    icon: 'NE',
    accent: 'green'
  },
  {
    key: 'ca',
    title: 'CA Exams',
    tag: 'Accounts • Law • Tax',
    icon: 'CA',
    accent: 'amber'
  }
]


/* =========================================================
   FALLBACK SUBJECTS
   ========================================================= */

const fallbackSubjects = [
  {
    id: 1,
    name: 'Indian History',
    slug: 'indian-history'
  },
  {
    id: 2,
    name: 'World History',
    slug: 'world-history'
  },
  {
    id: 3,
    name: 'Indian Geography',
    slug: 'indian-geography'
  },
  {
    id: 4,
    name: 'Indian Economy',
    slug: 'indian-economy'
  },
  {
    id: 5,
    name: 'Indian Polity & Constitution',
    slug: 'indian-polity-constitution'
  },
  {
    id: 6,
    name: 'Science & Technology',
    slug: 'science-technology'
  },
  {
    id: 7,
    name: 'Environment & Ecology',
    slug: 'environment-ecology'
  },
  {
    id: 8,
    name: 'Current Affairs',
    slug: 'current-affairs'
  },
  {
    id: 9,
    name: 'General Knowledge',
    slug: 'general-knowledge'
  },
  {
    id: 10,
    name: 'English Language & Comprehension',
    slug: 'english-language-comprehension'
  }
]


/* =========================================================
   DEMO QUESTIONS
   ========================================================= */

const demoQuestions = [
  {
    id: 'demo-1',
    question_text:
      'Which Article of the Constitution guarantees equality before law?',
    option_a: 'Article 12',
    option_b: 'Article 14',
    option_c: 'Article 19',
    option_d: 'Article 21',
    correct_option: 2,
    explanation:
      'Article 14 guarantees equality before the law and equal protection of laws within the territory of India.'
  },
  {
    id: 'demo-2',
    question_text:
      'The primary sector of an economy is most directly associated with:',
    option_a: 'Banking',
    option_b: 'Manufacturing',
    option_c: 'Agriculture',
    option_d: 'Software services',
    correct_option: 3,
    explanation:
      'The primary sector extracts or produces raw materials directly from nature, with agriculture being a major example.'
  },
  {
    id: 'demo-3',
    question_text:
      'Which gas is the most abundant in Earth’s atmosphere?',
    option_a: 'Oxygen',
    option_b: 'Nitrogen',
    option_c: 'Carbon dioxide',
    option_d: 'Argon',
    correct_option: 2,
    explanation:
      'Nitrogen makes up roughly 78% of Earth’s atmosphere by volume.'
  }
]


/* =========================================================
   APP
   ========================================================= */

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Shell />} />
      </Routes>
    </HashRouter>
  )
}


/* =========================================================
   SHELL
   ========================================================= */

function Shell() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const hideNav = location.pathname.startsWith('/practice')

  return (
    <div className="app-shell">
      {!hideNav && <Header onMenu={() => setOpen(true)} />}

      {open && <MobileMenu onClose={() => setOpen(false)} />}

      <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
            path="/exams"
            element={<ExamSelection />}
        />

        <Route
          path="/exams/:examSlug"
          element={<ExamSubjects />}
        />

        <Route
            path="/subjects"
            element={<Subjects />}
        />

        <Route
            path="/subjects/:slug"
            element={<SubjectDetail />}
        />

      <Route
          path="/subjects/:slug/topic/:topicId"
          element={<TopicDetail />}
      />

      <Route
            path="/practice/:slug"
            element={<Practice />}
      />
</Routes>
      </main>

      {!hideNav && <Footer />}
    </div>
  )
}


/* =========================================================
   HEADER
   ========================================================= */

function Header({ onMenu }) {
  return (
    <header className="site-header">
      <div className="container header-inner">

        <Link to="/" className="brand">
          <div className="brand-mark">M</div>

          <span>
            MCQ <b>Hub</b>
          </span>
        </Link>

        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/subjects">Subjects</Link>
          <a href="#why">Why MCQ Hub</a>
        </nav>

        <div className="header-actions">
          <Link
            className="ghost-btn"
            to="/subjects"
          >
            Explore
          </Link>

          <button
            className="menu-btn"
            onClick={onMenu}
          >
            <Menu size={22} />
          </button>
        </div>

      </div>
    </header>
  )
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function MobileMenu({ onClose }) {
  return (
    <div
      className="mobile-overlay"
      onClick={onClose}
    >
      <aside
        className="mobile-drawer"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="drawer-head">
          <span>MCQ Hub</span>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <Link
          to="/"
          onClick={onClose}
        >
          Home
        </Link>

        <Link
          to="/subjects"
          onClick={onClose}
        >
          Subjects
        </Link>

        <a
          href="#why"
          onClick={onClose}
        >
          Why MCQ Hub
        </a>

      </aside>
    </div>
  )
}


/* =========================================================
   HOME
   ========================================================= */

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">

          <div>
            <div className="eyebrow">
              <Sparkles size={15} />
              One hub. Every competitive exam.
            </div>

            <h1>
              Practice smarter.
              <br />
              <span>Score stronger.</span>
            </h1>

            <p className="hero-copy">
              MCQ Hub is being built as a focused question
              platform for UPSC, CLAT, AILET, NEET, CA and
              beyond — organised by exam, subject and topic.
            </p>

            <div className="hero-cta">
              <Link
                className="primary-btn"
                to="/subjects"
              >
                Explore Question Bank
                <ArrowRight size={18} />
              </Link>

              <a
                className="secondary-link"
                href="#exams"
              >
                Browse exams
              </a>
            </div>

            <div className="trust-row">

              <span>
                <ShieldCheck size={16} />
                Structured syllabus
              </span>

              <span>
                <BookOpen size={16} />
                Topic-wise practice
              </span>

              <span>
                <Target size={16} />
                Exam focused
              </span>

            </div>
          </div>


          <div className="hero-card">

            <div className="hero-card-top">
              <span>Today’s Practice</span>
              <span className="status-dot">
                Live
              </span>
            </div>

            <div className="score-circle">
              <div>
                <strong>82%</strong>
                <small>accuracy</small>
              </div>
            </div>

            <div className="mini-stats">

              <div>
                <b>42</b>
                <span>Attempted</span>
              </div>

              <div>
                <b>35</b>
                <span>Correct</span>
              </div>

              <div>
                <b>07</b>
                <span>To review</span>
              </div>

            </div>

            <div className="progress">
              <span
                style={{
                  width: '82%'
                }}
              />
            </div>

          </div>

        </div>
      </section>


      <section
        className="section"
        id="exams"
      >
        <div className="container">

          <SectionHeading
            eyebrow="EXAM TRACKS"
            title="Built around the exams you care about"
            copy="Choose an exam track to keep your practice relevant. The same question bank can serve different exam patterns."
          />

          <div className="exam-grid">

            {EXAMS.map((exam) => (
              <Link
                key={exam.key}
                to="/exams"
                className={`exam-card ${exam.accent}`}
              >

                <div className="exam-icon">
                  {exam.icon}
                </div>

                <div>
                  <h3>{exam.title}</h3>
                  <p>{exam.tag}</p>
                </div>

                <ArrowRight size={18} />

              </Link>
            ))}

          </div>

        </div>
      </section>


      <section
        className="section soft"
        id="why"
      >
        <div className="container two-col">

          <div>

            <SectionHeading
              eyebrow="WHY MCQ HUB"
              title="Your database is the product moat."
              copy="A deep subject → topic hierarchy makes every question searchable, reusable and measurable."
            />

            <div className="feature-list">

              <Feature
                icon={<LayoutDashboard />}
                title="Clean hierarchy"
                text="Subjects, topics and subtopics stay organised instead of becoming one giant question list."
              />

              <Feature
                icon={<Flame />}
                title="Practice loops"
                text="Move from topic practice to mixed practice to full mock tests without rebuilding your content."
              />

              <Feature
                icon={<Trophy />}
                title="Results that matter"
                text="Accuracy, attempts, score and review lists can sit on top of the same question bank."
              />

            </div>

          </div>


          <div className="architecture-card">

            <div className="arch-title">
              MCQ Hub structure
            </div>

            <div className="arch-node root">
              Exam
            </div>

            <div className="arch-line" />

            <div className="arch-node">
              Subject
            </div>

            <div className="arch-line" />

            <div className="arch-node">
              Topic
            </div>

            <div className="arch-line" />

            <div className="arch-node">
              MCQ + Explanation
            </div>

            <div className="arch-line" />

            <div className="arch-node result">
              Result + Analytics
            </div>

          </div>

        </div>
      </section>


      <section className="section">
        <div className="container callout">

          <div>

            <div className="eyebrow">
              QUESTION BANK
            </div>

            <h2>
              Explore the complete syllabus.
            </h2>

            <p>
              Subjects and topics are connected to
              your Supabase database.
            </p>

          </div>

          <Link
            className="primary-btn"
            to="/subjects"
          >
            Open Subjects
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </>
  )
}


/* =========================================================
   SUBJECTS PAGE
   ========================================================= */

function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubjects(setSubjects)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [subjects, query])

  return (
    <section className="section page">

      <div className="container">

        <SectionHeading
          eyebrow="QUESTION BANK"
          title="Subjects"
          copy="Browse the syllabus hierarchy that powers MCQ Hub."
        />

        <div className="searchbar">

          <Search size={19} />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search subjects..."
          />

        </div>


        {loading ? (
          <Loading />
        ) : (
          <div className="subject-grid">

            {filtered.map((subject, index) => (
              <Link
                key={subject.id}
                to={`/subjects/${subject.slug}`}
                className="subject-card"
              >

                <div className="subject-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3>{subject.name}</h3>
                  <p>
                    Open subject hierarchy
                  </p>
                </div>

                <ArrowRight size={18} />

              </Link>
            ))}

          </div>
        )}


        {!supabaseConfigured && (
          <div className="demo-note">
            Supabase is not connected yet.
          </div>
        )}


        {!loading && filtered.length === 0 && (
          <div className="demo-note">
            No subjects found.
          </div>
        )}

      </div>

    </section>
  )
}





/* =========================================================
   LOAD SUBJECTS
   ========================================================= */

async function loadSubjects(setter) {

  if (
    supabaseConfigured &&
    supabase
  ) {

    const {
      data,
      error
    } = await supabase
      .from('subjects')
      .select('id,name,slug')
      .eq('is_active', true)
      .order(
        'display_order',
        {
          ascending: true
        }
      )

    if (!error && data) {
      setter(data)
      return
    }

    console.error(
      'Subjects error:',
      error
    )
  }

  setter(fallbackSubjects)
}


/* =========================================================
   SUBJECT ROOT PAGE
   ========================================================= */

function SubjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [subject, setSubject] = useState(null)
  const [topics, setTopics] = useState([])
  const [questionCounts, setQuestionCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubject(slug)
      .then(({ subject: loadedSubject, topics: loadedTopics, questionCounts: counts }) => {
        setSubject(loadedSubject)
        setTopics(loadedTopics)
        setQuestionCounts(counts || {})
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <Loading />
  }

  if (!subject) {
    return (
      <section className="section page">
        <div className="container">
          <div className="demo-note">Subject not found.</div>
        </div>
      </section>
    )
  }

  const roots = topics
    .filter((topic) => topic.parent_id === null)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))

  return (
    <section className="section page">
      <div className="container">
        <button className="back-link" onClick={() => navigate('/subjects')}>
          ← All subjects
        </button>

        <SectionHeading
          eyebrow="SUBJECT"
          title={subject.name}
          copy="Select a section to explore its topics and subtopics."
        />

        <div className="topic-layout">
          <div className="topic-list">
            {roots.map((topic) => {
              const hasChildren = topics.some(
                (child) => String(child.parent_id) === String(topic.id)
              )
              const directQuestionCount = Number(questionCounts[String(topic.id)] || 0)

              return (
                <div className="topic-row" key={topic.id}>
                  <div>
                    <h3>{topic.name}</h3>
                    <p>
                      {hasChildren
                        ? `${topics.filter((child) => String(child.parent_id) === String(topic.id)).length} subtopics`
                        : directQuestionCount > 0
                          ? `${directQuestionCount} questions`
                          : 'Question Bank'}
                    </p>
                  </div>

                  <div className="topic-actions">
                    {hasChildren && (
                      <Link
                        className="outline-btn"
                        to={`/subjects/${subject.slug}/topic/${topic.id}`}
                      >
                        Open
                        <ChevronRight size={17} />
                      </Link>
                    )}

                    {directQuestionCount > 0 && (
                      <Link
                        className="outline-btn"
                        to={`/practice/${subject.slug}?topicId=${encodeURIComponent(topic.id)}`}
                      >
                        Question Bank
                        <ArrowRight size={16} />
                      </Link>
                    )}

                    {!hasChildren && directQuestionCount === 0 && (
                      <Link
                        className="outline-btn"
                        to={`/practice/${subject.slug}?topicId=${encodeURIComponent(topic.id)}`}
                      >
                        Question Bank
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="sidebar-card">
            <div className="eyebrow">QUICK START</div>
            <h3>Mixed practice</h3>
            <p>Practice questions from the complete subject.</p>
            <Link className="primary-btn full" to={`/practice/${subject.slug}`}>
              Start MCQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   TOPIC DETAIL PAGE
   ========================================================= */

function TopicDetail() {
  const { slug, topicId } = useParams()

  const [subject, setSubject] = useState(null)
  const [topics, setTopics] = useState([])
  const [questionCounts, setQuestionCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubject(slug)
      .then(({ subject: loadedSubject, topics: loadedTopics, questionCounts: counts }) => {
        setSubject(loadedSubject)
        setTopics(loadedTopics)
        setQuestionCounts(counts || {})
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <Loading />
  }

  if (!subject) {
    return (
      <section className="section page">
        <div className="container">
          <div className="demo-note">Subject not found.</div>
        </div>
      </section>
    )
  }

  const currentTopic = topics.find(
    (topic) => String(topic.id) === String(topicId)
  )

  if (!currentTopic) {
    return (
      <section className="section page">
        <div className="container">
          <div className="demo-note">Topic not found.</div>
        </div>
      </section>
    )
  }

  const children = topics
    .filter((topic) => String(topic.parent_id) === String(currentTopic.id))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))

  const hasChildren = children.length > 0
  const directQuestionCount = Number(questionCounts[String(currentTopic.id)] || 0)

  return (
    <section className="section page">
      <div className="container">
        <button className="back-link" onClick={() => window.history.back()}>
          ← Back
        </button>

        <SectionHeading
          eyebrow="TOPIC"
          title={currentTopic.name}
          copy={
            hasChildren
              ? 'Explore any number of nested levels. Practice this section to include questions from this topic and every level below it.'
              : 'This is a final topic level. Open its question bank to practice.'
          }
        />

        {directQuestionCount > 0 && (
          <div className="callout" style={{ marginBottom: '1.25rem' }}>
            <div>
              <div className="eyebrow">QUESTION BANK</div>
              <h2>{directQuestionCount} question{directQuestionCount === 1 ? '' : 's'} in {currentTopic.name}</h2>
              <p>These questions are assigned directly to this topic.</p>
            </div>
            <Link
              className="primary-btn"
              to={`/practice/${subject.slug}?topicId=${encodeURIComponent(currentTopic.id)}`}
            >
              Open Question Bank
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {hasChildren ? (
          <div className="topic-layout">
            <div className="topic-list">
              {children.map((child) => {
                const childHasChildren = topics.some(
                  (item) => String(item.parent_id) === String(child.id)
                )
                const childQuestionCount = Number(questionCounts[String(child.id)] || 0)

                return (
                  <div className="topic-row" key={child.id}>
                    <div>
                      <h3>{child.name}</h3>
                      <p>
                        {childHasChildren
                          ? `${topics.filter((item) => String(item.parent_id) === String(child.id)).length} subtopics`
                          : childQuestionCount > 0
                            ? `${childQuestionCount} questions`
                            : 'Question Bank'}
                      </p>
                    </div>

                    <div className="topic-actions">
                      {childHasChildren && (
                        <Link
                          className="outline-btn"
                          to={`/subjects/${subject.slug}/topic/${child.id}`}
                        >
                          Open
                          <ChevronRight size={17} />
                        </Link>
                      )}

                      {(childQuestionCount > 0 || !childHasChildren) && (
                        <Link
                          className="outline-btn"
                          to={`/practice/${subject.slug}?topicId=${encodeURIComponent(child.id)}`}
                        >
                          Question Bank
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="sidebar-card">
              <div className="eyebrow">SECTION PRACTICE</div>
              <h3>{currentTopic.name}</h3>
              <p>
                Practice direct questions plus questions from every descendant topic below this section.
              </p>
              <Link
                className="primary-btn full"
                to={`/practice/${subject.slug}?topicId=${encodeURIComponent(currentTopic.id)}`}
              >
                Practice This Section
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="callout">
            <div>
              <div className="eyebrow">QUESTION BANK</div>
              <h2>{currentTopic.name}</h2>
              <p>
                No further subtopics exist here. Questions assigned to this topic are available in its Question Bank.
              </p>
            </div>

            <Link
              className="primary-btn"
              to={`/practice/${subject.slug}?topicId=${encodeURIComponent(currentTopic.id)}`}
            >
              Open Question Bank
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

/* =========================================================
   LOAD SUBJECT
   ========================================================= */

async function loadSubject(slug) {

  if (
    supabaseConfigured &&
    supabase
  ) {

    const {
      data: subject,
      error: subjectError
    } = await supabase
      .from('subjects')
      .select('id,name,slug')
      .eq('slug', slug)
      .maybeSingle()


    if (subjectError) {
      console.error(
        'Subject error:',
        subjectError
      )
    }


    if (subject) {

      const {
        data: topics,
        error: topicError
      } = await supabase
        .from('topics')
        .select(
          'id,name,slug,parent_id,display_order,subject_id'
        )
        .eq('subject_id', subject.id)
        .eq('is_active', true)
        .order(
          'display_order',
          {
            ascending: true
          }
        )


      if (topicError) {
        console.error(
          'Topics error:',
          topicError
        )
      }


      const { data: questionRows, error: questionError } = await supabase
        .from('questions')
        .select('topic_id')
        .eq('is_published', true)
        .eq('subject', subject.name)

      if (questionError) {
        console.error('Question count error:', questionError)
      }

      const questionCounts = {}
      for (const row of questionRows || []) {
        const key = String(row.topic_id)
        if (row.topic_id != null) {
          questionCounts[key] = (questionCounts[key] || 0) + 1
        }
      }

      return {
        subject,
        topics: topics || [],
        questionCounts
      }
    }
  }


  const fallbackSubject =
    fallbackSubjects.find(
      (item) =>
        item.slug === slug
    ) ||
    null


  if (!fallbackSubject) {
    return {
      subject: null,
      topics: []
    }
  }


  const fallbackTopics = [
    {
      id: 'demo-root-1',
      name: 'Foundations',
      slug: 'foundations',
      parent_id: null,
      display_order: 1
    },
    {
      id: 'demo-root-2',
      name: 'Core Concepts',
      slug: 'core-concepts',
      parent_id: null,
      display_order: 2
    },
    {
      id: 'demo-root-3',
      name: 'Important Facts',
      slug: 'important-facts',
      parent_id: null,
      display_order: 3
    },
    {
      id: 'demo-root-4',
      name: 'Advanced Topics',
      slug: 'advanced-topics',
      parent_id: null,
      display_order: 4
    }
  ]


  return {
    subject: fallbackSubject,
    topics: fallbackTopics,
    questionCounts: {}
  }
}


/* =========================================================
   LOAD TOPIC PAGE
   ========================================================= */

async function loadTopicPage(
  slug,
  topicId
) {

  const result =
    await loadSubject(slug)


  return result
}


/* =========================================================
   PRACTICE
   ========================================================= */

function Practice() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()

  const topicId = searchParams.get('topicId')
  const topicSlug = searchParams.get('topic')


  const [questions, setQuestions] =
    useState([])

  const [index, setIndex] =
    useState(0)

  const [selected, setSelected] =
    useState(null)

  const [revealed, setRevealed] =
    useState(false)

  const [score, setScore] =
    useState(0)

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    loadQuestions(
      slug,
      topicId,
      topicSlug
    )
      .then(setQuestions)
      .finally(() =>
        setLoading(false)
      )

  }, [slug, topicId, topicSlug])


  if (loading) {
    return <Loading />
  }


  if (!questions.length) {

    return (
      <section className="practice-page">

        <div className="result-panel">

          <div className="eyebrow">
            QUESTION BANK
          </div>

          <h1>
            No questions yet
          </h1>

          <p>
            Published questions for this topic or its subtopics have not been added yet.
          </p>

          <Link
            className="primary-btn"
            to={`/subjects/${slug}`}
          >
            Back to subject
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>
    )
  }


  const finished =
    index >= questions.length


  if (finished) {

    return (
      <section className="practice-page">

        <div className="result-panel">

          <div className="result-icon">
            <Trophy size={34} />
          </div>

          <div className="eyebrow">
            SESSION COMPLETE
          </div>

          <h1>
            {score} / {questions.length}
          </h1>

          <p>
            Nice work.
          </p>

          <Link
            className="primary-btn"
            to={`/subjects/${slug}`}
          >
            Back to subject
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>
    )
  }


  const q =
    questions[index]


  const options = [
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d
  ]


  const answer =
    Number(q.correct_option)


  const submit = () => {

    if (selected == null) {
      return
    }

    setRevealed(true)

    if (
      Number(selected) ===
      answer
    ) {
      setScore(
        (currentScore) =>
          currentScore + 1
      )
    }
  }


  const next = () => {

    setSelected(null)
    setRevealed(false)

    setIndex(
      (currentIndex) =>
        currentIndex + 1
    )
  }


  return (
    <section className="practice-page">

      <div className="practice-top">

        <Link
          to={`/subjects/${slug}`}
        >
          ← Exit practice
        </Link>

        <div>
          <Clock3 size={16} />
          Untimed practice
        </div>

      </div>


      <div className="question-shell">

        <div className="question-meta">

          <span>
            Question {index + 1} of{' '}
            {questions.length}
          </span>

          <span>
            {score} correct
          </span>

        </div>


        <div className="question-progress">

          <span
            style={{
              width: `${
                (index /
                  questions.length) *
                100
              }%`
            }}
          />

        </div>


        <h1>
          {q.question_text}
        </h1>


        <div className="options">

          {options.map(
            (option, optionIndex) => {

              const number =
                optionIndex + 1


              const className =
                revealed
                  ? number === answer
                    ? 'correct'
                    : number ===
                        Number(selected)
                      ? 'wrong'
                      : ''
                  : Number(selected) ===
                      number
                    ? 'selected'
                    : ''


              return (
                <button
                  key={number}
                  disabled={revealed}
                  onClick={() =>
                    setSelected(number)
                  }
                  className={`option ${className}`}
                >

                  <span>
                    {String.fromCharCode(
                      64 + number
                    )}
                  </span>

                  <b>
                    {option}
                  </b>

                  {revealed &&
                    number ===
                      answer && (
                      <CheckCircle2
                        size={20}
                      />
                    )}

                </button>
              )
            }
          )}

        </div>


        {revealed && (
          <div className="explanation">

            <div className="eyebrow">
              EXPLANATION
            </div>

            <p>
              {q.explanation ||
                'Explanation will appear here.'}
            </p>

          </div>
        )}


        <div className="question-footer">

          {!revealed ? (

            <button
              className="primary-btn"
              onClick={submit}
              disabled={
                selected == null
              }
            >
              Check answer
              <ArrowRight size={18} />
            </button>

          ) : (

            <button
              className="primary-btn"
              onClick={next}
            >
              Next question
              <ArrowRight size={18} />
            </button>

          )}

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   LOAD QUESTIONS
   ========================================================= */

function getTopicIdsForPractice(topics, rootTopicId) {
  const wanted = new Set([String(rootTopicId)])
  let changed = true

  while (changed) {
    changed = false

    for (const topic of topics) {
      const parentId = topic.parent_id == null
        ? null
        : String(topic.parent_id)

      if (parentId && wanted.has(parentId)) {
        const id = String(topic.id)
        if (!wanted.has(id)) {
          wanted.add(id)
          changed = true
        }
      }
    }
  }

  return Array.from(wanted)
}

async function loadQuestions(slug, topicId = null, topicSlug = null) {
  if (!supabaseConfigured || !supabase) {
    return demoQuestions
  }

  const {
    data: subject,
    error: subjectError
  } = await supabase
    .from('subjects')
    .select('id,name,slug')
    .eq('slug', slug)
    .maybeSingle()

  if (subjectError) {
    console.error('Subject error:', subjectError)
    return []
  }

  if (!subject) {
    console.error('Subject not found:', slug)
    return []
  }

  let selectedTopicId = topicId

  if (!selectedTopicId && topicSlug) {
    const {
      data: topic,
      error: topicError
    } = await supabase
      .from('topics')
      .select('id')
      .eq('subject_id', subject.id)
      .eq('slug', topicSlug)
      .maybeSingle()

    if (topicError) {
      console.error('Topic error:', topicError)
      return []
    }

    if (!topic) {
      console.error('Topic not found:', topicSlug)
      return []
    }

    selectedTopicId = topic.id
  }

  let query = supabase
    .from('questions')
    .select(
      'id,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,topic_id'
    )
    .eq('is_published', true)
    .eq('subject', subject.name)
    .order('id', { ascending: true })
    .limit(10)

  if (selectedTopicId) {
    const {
      data: topics,
      error: topicsError
    } = await supabase
      .from('topics')
      .select('id,parent_id')
      .eq('subject_id', subject.id)
      .eq('is_active', true)

    if (topicsError) {
      console.error('Topics error:', topicsError)
      return []
    }

    const topicIds = getTopicIdsForPractice(
      topics || [],
      selectedTopicId
    )

    query = query.in('topic_id', topicIds)
  }

  const {
    data,
    error
  } = await query

  if (error) {
    console.error('Question error:', error)
    return []
  }

  return data || []
}


/* =========================================================
   COMMON COMPONENTS
   ========================================================= */

function Feature({
  icon,
  title,
  text
}) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>

        <h3>{title}</h3>
        <p>{text}</p>

      </div>

    </div>
  )
}


function SectionHeading({
  eyebrow,
  title,
  copy
}) {
  return (
    <div className="section-heading">

      <div className="eyebrow">
        {eyebrow}
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {copy}
      </p>

    </div>
  )
}


function Loading() {
  return (
    <div className="loading">
      Loading MCQ Hub…
    </div>
  )
}


function Footer() {
  return (
    <footer>

      <div className="container footer-inner">

        <div>

          <div className="brand footer-brand">

            <div className="brand-mark">
              M
            </div>

            <span>
              MCQ <b>Hub</b>
            </span>

          </div>

          <p>
            Structured MCQ practice for
            competitive exams.
          </p>

        </div>

        <span>
          MCQ Hub • Supabase powered
        </span>

      </div>

    </footer>
  )
}



/* =========================================================
   EXAM SELECTION PAGE
   ========================================================= */

function ExamSelection() {
  const exams = [
    {
      id: 'upsc',
      name: 'UPSC Civil Services',
      description: 'General Studies, CSAT, History, Polity, Economy and more.'
    },
    {
      id: 'clat',
      name: 'CLAT',
      description: 'English, Legal Reasoning, Current Affairs, GK and Logical Reasoning.'
    },
    {
      id: 'ailet',
      name: 'AILET',
      description: 'English, Current Affairs, Legal Aptitude and Logical Reasoning.'
    },
    {
      id: 'neet-ug',
      name: 'NEET UG',
      description: 'Physics, Chemistry, Botany and Zoology.'
    },
    {
      id: 'neet-pg',
      name: 'NEET PG',
      description: 'Medical subjects and postgraduate entrance preparation.'
    },
    {
      id: 'ca-foundation',
      name: 'CA Foundation',
      description: 'Accounting, Business Laws, Economics and Quantitative Aptitude.'
    },
    {
      id: 'ca-intermediate',
      name: 'CA Intermediate',
      description: 'Advanced Accounting, Law, Taxation, Costing and Auditing.'
    },
    {
      id: 'ca-final',
      name: 'CA Final',
      description: 'Advanced professional-level CA preparation.'
    }
  ]

  return (
    <section className="section page">
      <div className="container">
        <SectionHeading
          eyebrow="CHOOSE YOUR EXAM"
          title="Select an exam"
          copy="Choose an exam to see only the subjects connected to that examination."
        />

        <div className="subject-grid">
          {exams.map((exam, index) => (
            <Link
              key={exam.id}
              to={`/exams/${exam.id}`}
              className="subject-card"
            >
              <div className="subject-number">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <h3>{exam.name}</h3>
                <p>{exam.description}</p>
              </div>

              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


/* =========================================================
   EXAM-WISE SUBJECTS PAGE
   ========================================================= */

function ExamSubjects() {
  const { examSlug } = useParams()

  const [exam, setExam] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchExamSubjects() {
      setLoading(true)
      setErrorMessage('')

      if (!supabaseConfigured || !supabase) {
        setErrorMessage('Supabase is not connected.')
        setLoading(false)
        return
      }

      const {
        data,
        error
      } = await supabase
        .from('exams')
        .select(`
          id,
          name,
          slug,
          description,
          exam_subjects (
            id,
            display_order,
            subject_id,
            subjects (
              id,
              name,
              slug,
              description
            )
          )
        `)
        .eq('slug', examSlug)
        .eq('is_active', true)
          .single()

      if (error) {
        console.error('Exam subjects error:', error)
        setErrorMessage('Unable to load this exam.')
        setLoading(false)
        return
      }

      setExam(data)

      const linkedSubjects = (data.exam_subjects || [])
        .filter((item) => item.subjects)
        .sort(
          (a, b) =>
            (a.display_order || 0) -
            (b.display_order || 0)
        )
        .map((item) => item.subjects)
        .filter(
          (subject, index, all) =>
            all.findIndex((item) => item.id === subject.id) === index
        )

      setSubjects(linkedSubjects)
      setLoading(false)
    }

    fetchExamSubjects()
  }, [examSlug])

  if (loading) {
    return <Loading />
  }

  if (errorMessage) {
    return (
      <section className="section page">
        <div className="container">
          <div className="demo-note">
            {errorMessage}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section page">
      <div className="container">
        <Link
          to="/exams"
          className="secondary-link"
        >
          ← Change Exam
        </Link>

        <SectionHeading
          eyebrow="EXAM SUBJECTS"
          title={exam?.name || 'Subjects'}
          copy={
            exam?.description ||
            'Choose a subject to explore its topics.'
          }
        />

        {subjects.length === 0 ? (
          <div className="demo-note">
            No subjects have been linked to this exam yet.
          </div>
        ) : (
          <div className="subject-grid">
            {subjects.map((subject, index) => (
              <Link
                key={subject.id}
                to={`/subjects/${subject.slug}`}
                className="subject-card"
              >
                <div className="subject-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3>{subject.name}</h3>
                  <p>
                    Open subject topics and question bank
                  </p>
                </div>

                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
/* =========================================================
   MOUNT APP
   ========================================================= */

createRoot(
  document.getElementById('root')
).render(
  <App />
)
