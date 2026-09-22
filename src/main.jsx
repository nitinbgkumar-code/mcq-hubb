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
  ChevronLeft,
  Trash2,
  CheckSquare,
  ListChecks
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
            path="/question-bank/:slug"
            element={<QuestionBank />}
          />

          <Route
            path="/test-setup/:slug"
            element={<TestSetup />}
          />

          <Route
            path="/practice/:slug"
            element={<Practice />}
          />

          <Route
            path="/mock-test/:testId"
            element={<SavedMockTest />}
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
                to="/subjects"
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

  if (loading) return <Loading />

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

  const startSubjectTest = () => {
    navigate(`/test-setup/${subject.slug}`)
  }

  return (
    <section className="section page">
      <div className="container">
        <button className="back-link" onClick={() => navigate('/subjects')}>
          ← All subjects
        </button>

        <SectionHeading
          eyebrow="SUBJECT"
          title={subject.name}
          copy="Choose a topic, open its question bank, or start a test from the complete subject."
        />

        <div className="callout" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div className="eyebrow">SUBJECT PRACTICE</div>
            <h2>Practice {subject.name}</h2>
            <p>Choose the number of questions and whether to shuffle their order.</p>
          </div>
          <button className="primary-btn" onClick={startSubjectTest}>
            Start Test
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="topic-list">
          {roots.map((topic) => {
            const children = topics.filter(
              (child) => String(child.parent_id) === String(topic.id)
            )
            const directQuestionCount = Number(questionCounts[String(topic.id)] || 0)

            return (
              <div className="topic-row" key={topic.id}>
                <div>
                  <h3>{topic.name}</h3>
                  <p>
                    {children.length > 0
                      ? `${children.length} subtopics`
                      : `${directQuestionCount} questions`}
                  </p>
                </div>

                <div className="topic-actions">
                  {children.length > 0 && (
                    <Link
                      className="outline-btn"
                      to={`/subjects/${subject.slug}/topic/${topic.id}`}
                    >
                      Open
                      <ChevronRight size={17} />
                    </Link>
                  )}

                  <Link
                    className="outline-btn"
                    to={`/question-bank/${subject.slug}?topicId=${encodeURIComponent(topic.id)}`}
                  >
                    View Question Bank
                    <ListChecks size={16} />
                  </Link>
                </div>
              </div>
            )
          })}
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

  if (loading) return <Loading />

  if (!subject) {
    return (
      <section className="section page">
        <div className="container"><div className="demo-note">Subject not found.</div></div>
      </section>
    )
  }

  const currentTopic = topics.find(
    (topic) => String(topic.id) === String(topicId)
  )

  if (!currentTopic) {
    return (
      <section className="section page">
        <div className="container"><div className="demo-note">Topic not found.</div></div>
      </section>
    )
  }

  const children = topics
    .filter((topic) => String(topic.parent_id) === String(currentTopic.id))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))

  const directQuestionCount = Number(questionCounts[String(currentTopic.id)] || 0)

  return (
    <section className="section page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <SectionHeading
          eyebrow="TOPIC"
          title={currentTopic.name}
          copy="Open a child topic, view this topic's question bank, or start a test using this section and its descendants."
        />

        <div className="callout" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div className="eyebrow">QUESTION BANK</div>
            <h2>{directQuestionCount} direct question{directQuestionCount === 1 ? '' : 's'}</h2>
            <p>View and manage every question assigned directly to this topic.</p>
          </div>
          <div className="topic-actions">
            <Link
              className="outline-btn"
              to={`/question-bank/${subject.slug}?topicId=${encodeURIComponent(currentTopic.id)}`}
            >
              View Question Bank
              <ListChecks size={17} />
            </Link>
            <Link
              className="primary-btn"
              to={`/test-setup/${subject.slug}?topicId=${encodeURIComponent(currentTopic.id)}`}
            >
              Start Test
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {children.length > 0 ? (
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
                        : `${childQuestionCount} questions`}
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
                    <Link
                      className="outline-btn"
                      to={`/question-bank/${subject.slug}?topicId=${encodeURIComponent(child.id)}`}
                    >
                      View Question Bank
                      <ListChecks size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="demo-note">
            This is a final topic. Use View Question Bank to manage its questions.
          </div>
        )}
      </div>
    </section>
  )
}


/* =========================================================
   QUESTION BANK
   ========================================================= */

function QuestionBank() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const topicId = searchParams.get('topicId')

  const [subject, setSubject] = useState(null)
  const [topic, setTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const loadBank = async () => {
    setLoading(true)

    if (!supabaseConfigured || !supabase) {
      setQuestions([])
      setLoading(false)
      return
    }

    const { data: subjectData, error: subjectError } = await supabase
      .from('subjects')
      .select('id,name,slug')
      .eq('slug', slug)
      .maybeSingle()

    if (subjectError || !subjectData) {
      console.error('Question bank subject error:', subjectError)
      setLoading(false)
      return
    }

    setSubject(subjectData)

    const { data: topicData, error: topicError } = await supabase
      .from('topics')
      .select('id,name,slug,parent_id,subject_id')
      .eq('id', topicId)
      .eq('subject_id', subjectData.id)
      .maybeSingle()

    if (topicError || !topicData) {
      console.error('Question bank topic error:', topicError)
      setLoading(false)
      return
    }

    setTopic(topicData)

    const { data, error } = await supabase
      .from('questions')
      .select('id,subject,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,is_published,topic_id')
      .eq('topic_id', topicId)
      .order('id', { ascending: true })

    if (error) {
      console.error('Question bank error:', error)
      setQuestions([])
    } else {
      setQuestions(data || [])
    }

    setSelectedIds([])
    setLoading(false)
  }

  useEffect(() => {
    if (topicId) loadBank()
  }, [slug, topicId])

  const allSelected = questions.length > 0 && selectedIds.length === questions.length

  const toggle = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const selectAll = () => {
    setSelectedIds(questions.map((q) => q.id))
  }

  const deselectAll = () => setSelectedIds([])

  const deleteIds = async (ids) => {
    if (!ids.length || !supabaseConfigured || !supabase) return

    const confirmed = window.confirm(
      `Delete ${ids.length} question${ids.length === 1 ? '' : 's'} permanently? This action cannot be undone.`
    )
    if (!confirmed) return

    setBusy(true)

    const { data, error } = await supabase.rpc(
      'delete_questions_permanently',
      { p_question_ids: ids }
    )

    setBusy(false)

    if (error) {
      console.error('Delete questions error:', error)
      alert(`Unable to delete questions: ${error.message}`)
      return
    }

    const idSet = new Set(ids.map(Number))
    setQuestions((current) => current.filter((q) => !idSet.has(Number(q.id))))
    setSelectedIds([])
    alert(`${Number(data || ids.length)} question${Number(data || ids.length) === 1 ? '' : 's'} deleted permanently.`)
  }

  const attemptSelected = () => {
    if (!selectedIds.length) return
    navigate(`/test-setup/${slug}?topicId=${encodeURIComponent(topicId)}&mode=selected`, {
      state: { selectedQuestionIds: selectedIds }
    })
  }

  const createMockTest = async () => {
    if (!selectedIds.length || !subject || !topic || !supabaseConfigured || !supabase) return

    const title = window.prompt(
      'Enter a name for this mock test:',
      `${topic.name} — Custom Mock Test`
    )

    if (!title) return

    setBusy(true)

    const { data, error } = await supabase.rpc('create_custom_test', {
      p_title: title,
      p_subject_id: subject.id,
      p_topic_id: topic.id,
      p_question_ids: selectedIds,
      p_shuffle: false
    })

    setBusy(false)

    if (error) {
      console.error('Create mock test error:', error)
      alert(`Unable to create mock test: ${error.message}`)
      return
    }

    navigate(`/mock-test/${data}`)
  }

  if (!topicId) {
    return (
      <section className="section page">
        <div className="container">
          <div className="demo-note">No topic was selected.</div>
        </div>
      </section>
    )
  }

  if (loading) return <Loading />

  return (
    <section className="section page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <SectionHeading
          eyebrow="QUESTION BANK"
          title={topic?.name || 'Question Bank'}
          copy="Select questions to attempt only those questions, create a saved mock test, or permanently delete selected questions."
        />

        <div className="question-bank-summary">
          <div>
            <strong>{questions.length}</strong>
            <span>Total Questions</span>
          </div>
          <div>
            <strong>{selectedIds.length}</strong>
            <span>Selected</span>
          </div>
        </div>

        <div className="question-bank-toolbar">
          <button className="outline-btn" onClick={allSelected ? deselectAll : selectAll}>
            <CheckSquare size={17} />
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>

          <button
            className="outline-btn"
            onClick={attemptSelected}
            disabled={!selectedIds.length || busy}
          >
            Attempt Selected Questions
            <ArrowRight size={17} />
          </button>

          <button
            className="outline-btn"
            onClick={createMockTest}
            disabled={!selectedIds.length || busy}
          >
            Create Mock Test
            <ListChecks size={17} />
          </button>

          <button
            className="danger-btn"
            onClick={() => deleteIds(selectedIds)}
            disabled={!selectedIds.length || busy}
          >
            <Trash2 size={17} />
            Delete Selected
          </button>
        </div>

        {!questions.length ? (
          <div className="demo-note">
            No questions have been added to this topic yet.
          </div>
        ) : (
          <div className="question-bank-list">
            {questions.map((question, index) => (
              <div className="question-bank-row" key={question.id}>
                <div className="question-select">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(question.id)}
                    onChange={() => toggle(question.id)}
                  />
                </div>

                <div className="question-number">{index + 1}</div>

                <div className="question-bank-content">
                  <p className="question-bank-text">{question.question_text}</p>
                  <div className="question-bank-meta">
                    <span>ID: {question.id}</span>
                    <span>{question.is_published ? 'Published' : 'Unpublished'}</span>
                  </div>
                </div>

                <button
                  className="icon-delete-btn"
                  title="Delete permanently"
                  onClick={() => deleteIds([question.id])}
                  disabled={busy}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


/* =========================================================
   TEST SETUP
   ========================================================= */

function TestSetup() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const topicId = searchParams.get('topicId')
  const mode = searchParams.get('mode') || 'topic'
  const selectedQuestionIds = location.state?.selectedQuestionIds || []

  const [subject, setSubject] = useState(null)
  const [topic, setTopic] = useState(null)
  const [availableCount, setAvailableCount] = useState(0)
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [shuffle, setShuffle] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSetup() {
      setLoading(true)

      if (!supabaseConfigured || !supabase) {
        setAvailableCount(selectedQuestionIds.length || 3)
        setNumberOfQuestions(Math.min(10, selectedQuestionIds.length || 3))
        setLoading(false)
        return
      }

      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id,name,slug')
        .eq('slug', slug)
        .maybeSingle()

      setSubject(subjectData)

      let count = 0

      if (mode === 'selected' && selectedQuestionIds.length) {
        count = selectedQuestionIds.length
      } else {
        let topicIds = null

        if (topicId) {
          const { data: topics } = await supabase
            .from('topics')
            .select('id,parent_id')
            .eq('subject_id', subjectData?.id)
            .eq('is_active', true)

          topicIds = getTopicIdsForPractice(topics || [], topicId)
        }

        let query = supabase
          .from('questions')
          .select('id', { count: 'exact', head: true })
          .eq('is_published', true)
          .eq('subject', subjectData?.name)

        if (topicIds?.length) query = query.in('topic_id', topicIds)

        const { count: questionCount, error } = await query
        if (!error) count = Number(questionCount || 0)
      }

      if (topicId) {
        const { data: topicData } = await supabase
          .from('topics')
          .select('id,name')
          .eq('id', topicId)
          .maybeSingle()
        setTopic(topicData)
      }

      setAvailableCount(count)
      setNumberOfQuestions(Math.min(10, count || 1))
      setLoading(false)
    }

    loadSetup()
  }, [slug, topicId, mode, selectedQuestionIds.join(',')])

  const start = () => {
    if (!availableCount || numberOfQuestions < 1) return

    navigate(`/practice/${slug}`, {
      state: {
        mode,
        topicId,
        selectedQuestionIds,
        numberOfQuestions,
        shuffle,
        subjectName: subject?.name,
        topicName: topic?.name
      }
    })
  }

  if (loading) return <Loading />

  if (!availableCount) {
    return (
      <section className="section page">
        <div className="container">
          <div className="result-panel">
            <div className="eyebrow">TEST SETUP</div>
            <h1>No questions available</h1>
            <p>Add published questions to this topic before starting a test.</p>
            <button className="primary-btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </section>
    )
  }

  const choices = Array.from({ length: availableCount }, (_, i) => i + 1)

  return (
    <section className="section page">
      <div className="container narrow-container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

        <SectionHeading
          eyebrow="TEST SETTINGS"
          title={mode === 'selected' ? 'Selected Questions Test' : topic?.name || subject?.name || 'Start Test'}
          copy={`${availableCount} question${availableCount === 1 ? '' : 's'} available for this test.`}
        />

        <div className="test-settings-card">
          <label className="setting-label">Number of Questions</label>
          <select
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          >
            {choices.map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>

          <div className="setting-group">
            <div className="setting-label">Shuffle Questions?</div>
            <label className="radio-option">
              <input
                type="radio"
                name="shuffle"
                checked={shuffle}
                onChange={() => setShuffle(true)}
              />
              Yes
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="shuffle"
                checked={!shuffle}
                onChange={() => setShuffle(false)}
              />
              No
            </label>
          </div>

          {mode === 'selected' && (
            <div className="selection-note">
              Only the questions you selected in the Question Bank will be used. You can choose any number up to {availableCount}.
            </div>
          )}

          <button className="primary-btn full" onClick={start}>
            Start Test
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}


/* =========================================================
   PRACTICE
   ========================================================= */

function Practice() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const config = location.state || {}
  const topicId = config.topicId || null
  const mode = config.mode || 'topic'
  const selectedQuestionIds = config.selectedQuestionIds || []
  const requestedCount = Number(config.numberOfQuestions || 0)
  const shuffle = Boolean(config.shuffle)

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      if (mode === 'selected' && selectedQuestionIds.length) {
        const { data, error } = await supabase
          .from('questions')
          .select('id,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,topic_id')
          .in('id', selectedQuestionIds)
          .eq('is_published', true)

        if (error) {
          console.error('Selected question error:', error)
          setQuestions([])
        } else {
          const orderMap = new Map(selectedQuestionIds.map((id, i) => [String(id), i]))
          let result = (data || []).sort((a, b) =>
            (orderMap.get(String(a.id)) ?? 0) - (orderMap.get(String(b.id)) ?? 0)
          )

          if (shuffle) result = [...result].sort(() => Math.random() - 0.5)
          if (requestedCount > 0) result = result.slice(0, requestedCount)
          setQuestions(result)
        }
      } else {
        let result = await loadQuestions(slug, topicId)
        if (shuffle) result = [...result].sort(() => Math.random() - 0.5)
        if (requestedCount > 0) result = result.slice(0, requestedCount)
        setQuestions(result)
      }

      setLoading(false)
    }

    load()
  }, [slug, topicId, mode, selectedQuestionIds.join(','), requestedCount, shuffle])

  if (loading) return <Loading />

  if (!questions.length) {
    return (
      <section className="practice-page">
        <div className="result-panel">
          <div className="eyebrow">QUESTION BANK</div>
          <h1>No questions available</h1>
          <p>The selected questions may have been deleted or are no longer published.</p>
          <button className="primary-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </section>
    )
  }

  if (index >= questions.length) {
    return (
      <section className="practice-page">
        <div className="result-panel">
          <div className="result-icon"><Trophy size={34} /></div>
          <div className="eyebrow">SESSION COMPLETE</div>
          <h1>{score} / {questions.length}</h1>
          <p>You answered {score} correctly.</p>
          <button className="primary-btn" onClick={() => navigate(-1)}>
            Back
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    )
  }

  const q = questions[index]
  const options = [q.option_a, q.option_b, q.option_c, q.option_d]
  const answer = Number(q.correct_option)

  const submit = () => {
    if (selected == null) return
    setRevealed(true)
    if (Number(selected) === answer) {
      setScore((current) => current + 1)
    }
  }

  const next = () => {
    setSelected(null)
    setRevealed(false)
    setIndex((current) => current + 1)
  }

  return (
    <section className="practice-page">
      <div className="practice-top">
        <button className="back-link" onClick={() => navigate(-1)}>← Exit test</button>
        <div><Clock3 size={16} /> {shuffle ? 'Shuffled' : 'Original order'}</div>
      </div>

      <div className="question-shell">
        <div className="question-meta">
          <span>Question {index + 1} of {questions.length}</span>
          <span>{score} correct</span>
        </div>

        <div className="question-progress">
          <span style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        <h1>{q.question_text}</h1>

        <div className="options">
          {options.map((option, optionIndex) => {
            const number = optionIndex + 1
            const className = revealed
              ? number === answer
                ? 'correct'
                : number === Number(selected)
                  ? 'wrong'
                  : ''
              : Number(selected) === number
                ? 'selected'
                : ''

            return (
              <button
                key={number}
                disabled={revealed}
                onClick={() => setSelected(number)}
                className={`option ${className}`}
              >
                <span>{String.fromCharCode(64 + number)}</span>
                <b>{option}</b>
                {revealed && number === answer && <CheckCircle2 size={20} />}
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className="explanation">
            <div className="eyebrow">EXPLANATION</div>
            <p>{q.explanation || 'Explanation will appear here.'}</p>
          </div>
        )}

        <div className="question-footer">
          {!revealed ? (
            <button className="primary-btn" onClick={submit} disabled={selected == null}>
              Check answer
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="primary-btn" onClick={next}>
              {index === questions.length - 1 ? 'Finish Test' : 'Next question'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}


/* =========================================================
   SAVED MOCK TEST
   ========================================================= */

function SavedMockTest() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const [test, setTest] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    async function load() {
      if (!supabaseConfigured || !supabase) {
        setLoading(false)
        return
      }

      const { data: testData, error: testError } = await supabase
        .from('tests')
        .select('id,title,shuffle_questions,created_at')
        .eq('id', testId)
        .maybeSingle()

      if (testError) console.error('Mock test error:', testError)

      const { data: rows, error: rowsError } = await supabase
        .from('test_questions')
        .select('question_order,question_id,question_snapshot')
        .eq('test_id', testId)
        .order('question_order', { ascending: true })

      if (rowsError) console.error('Mock test questions error:', rowsError)

      const loaded = (rows || [])
        .map((row) => row.question_snapshot)
        .filter(Boolean)

      setTest(testData)
      setQuestions(loaded)
      setLoading(false)
    }

    load()
  }, [testId])

  if (loading) return <Loading />

  if (!questions.length) {
    return (
      <section className="section page">
        <div className="container">
          <div className="result-panel">
            <div className="eyebrow">MOCK TEST</div>
            <h1>Test unavailable</h1>
            <p>This mock test has no saved questions.</p>
            <button className="primary-btn" onClick={() => navigate('/subjects')}>Back to Subjects</button>
          </div>
        </div>
      </section>
    )
  }

  if (index >= questions.length) {
    return (
      <section className="practice-page">
        <div className="result-panel">
          <div className="result-icon"><Trophy size={34} /></div>
          <div className="eyebrow">MOCK TEST COMPLETE</div>
          <h1>{score} / {questions.length}</h1>
          <p>{test?.title || 'Mock Test'}</p>
          <button className="primary-btn" onClick={() => navigate('/subjects')}>
            Back to Subjects
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    )
  }

  const q = questions[index]
  const options = [q.option_a, q.option_b, q.option_c, q.option_d]
  const answer = Number(q.correct_option)

  const submit = () => {
    if (selected == null) return
    setRevealed(true)
    if (Number(selected) === answer) setScore((current) => current + 1)
  }

  const next = () => {
    setSelected(null)
    setRevealed(false)
    setIndex((current) => current + 1)
  }

  return (
    <section className="practice-page">
      <div className="practice-top">
        <button className="back-link" onClick={() => navigate(-1)}>← Exit mock test</button>
        <div>{test?.title || 'Mock Test'}</div>
      </div>

      <div className="question-shell">
        <div className="question-meta">
          <span>Question {index + 1} of {questions.length}</span>
          <span>{score} correct</span>
        </div>

        <div className="question-progress">
          <span style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        <h1>{q.question_text}</h1>

        <div className="options">
          {options.map((option, optionIndex) => {
            const number = optionIndex + 1
            const className = revealed
              ? number === answer
                ? 'correct'
                : number === Number(selected)
                  ? 'wrong'
                  : ''
              : Number(selected) === number
                ? 'selected'
                : ''

            return (
              <button
                key={number}
                disabled={revealed}
                onClick={() => setSelected(number)}
                className={`option ${className}`}
              >
                <span>{String.fromCharCode(64 + number)}</span>
                <b>{option}</b>
                {revealed && number === answer && <CheckCircle2 size={20} />}
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className="explanation">
            <div className="eyebrow">EXPLANATION</div>
            <p>{q.explanation || 'Explanation will appear here.'}</p>
          </div>
        )}

        <div className="question-footer">
          {!revealed ? (
            <button className="primary-btn" onClick={submit} disabled={selected == null}>
              Check answer
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="primary-btn" onClick={next}>
              {index === questions.length - 1 ? 'Finish Test' : 'Next question'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
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
   MOUNT APP
   ========================================================= */

createRoot(
  document.getElementById('root')
).render(
  <App />
)
