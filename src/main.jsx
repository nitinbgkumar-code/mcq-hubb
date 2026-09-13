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
  X
} from 'lucide-react'
import { supabase, supabaseConfigured } from './supabase'
import './styles.css'


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


const fallbackSubjects = [
  { id: 1, name: 'Indian History', slug: 'indian-history' },
  { id: 2, name: 'World History', slug: 'world-history' },
  { id: 3, name: 'Indian Geography', slug: 'indian-geography' },
  { id: 4, name: 'Indian Economy', slug: 'indian-economy' },
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


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Shell />} />
      </Routes>
    </HashRouter>
  )
}

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
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:slug" element={<SubjectDetail />} />
          <Route path="/practice/:slug" element={<Practice />} />
        </Routes>
      </main>

      {!hideNav && <Footer />}
    </div>
  )
}


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
          <Link className="ghost-btn" to="/subjects">
            Explore
          </Link>

          <button className="menu-btn" onClick={onMenu}>
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}


function MobileMenu({ onClose }) {
  return (
    <div className="mobile-overlay" onClick={onClose}>
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

        <Link to="/" onClick={onClose}>
          Home
        </Link>

        <Link to="/subjects" onClick={onClose}>
          Subjects
        </Link>

        <a href="#why" onClick={onClose}>
          Why MCQ Hub
        </a>
      </aside>
    </div>
  )
}


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
              MCQ Hub is being built as a focused question platform for
              UPSC, CLAT, AILET, NEET, CA and beyond — organised by exam,
              subject and topic.
            </p>

            <div className="hero-cta">
              <Link className="primary-btn" to="/subjects">
                Explore Question Bank
                <ArrowRight size={18} />
              </Link>

              <a className="secondary-link" href="#exams">
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
              <span className="status-dot">Live</span>
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
              <span style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </section>


      <section className="section" id="exams">
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
                <div className="exam-icon">{exam.icon}</div>

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


      <section className="section soft" id="why">
        <div className="container two-col">
          <div>
            <SectionHeading
              eyebrow="WHY MCQ HUB"
              title="Your database is the product moat."
              copy="A deep subject → topic hierarchy makes every question searchable, reusable and measurable. This starter keeps that structure at the centre of the UI."
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
            <div className="arch-title">MCQ Hub structure</div>

            <div className="arch-node root">Exam</div>
            <div className="arch-line" />

            <div className="arch-node">Subject</div>
            <div className="arch-line" />

            <div className="arch-node">Topic</div>
            <div className="arch-line" />

            <div className="arch-node">MCQ + Explanation</div>
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
            <div className="eyebrow">NEXT STEP</div>

            <h2>Your Supabase data is ready for the UI.</h2>

            <p>
              Connect your project keys, then this starter can pull the real
              subjects and questions instead of demo data.
            </p>
          </div>

          <Link className="primary-btn" to="/subjects">
            Open Subjects
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}


function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubjects(setSubjects).finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query.toLowerCase())
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
            onChange={(e) => setQuery(e.target.value)}
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
                  <p>Open subject hierarchy</p>
                </div>

                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        )}

        {!supabaseConfigured && (
          <div className="demo-note">
            Supabase is not connected yet, so this page is using a fallback
            subject list. Add the values from your GitHub Actions secrets to
            load your live database.
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


async function loadSubjects(setter) {
  if (supabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('subjects')
      .select('id,name,slug')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (!error && data) {
      setter(data)
      return
    }

    console.error('Subjects error:', error)
  }

  setter(fallbackSubjects)
}


function SubjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [subject, setSubject] = useState(null)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubject(slug)
      .then(({ subject: loadedSubject, topics: loadedTopics }) => {
        setSubject(loadedSubject)
        setTopics(loadedTopics)
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
          <div className="demo-note">
            Subject not found.
          </div>
        </div>
      </section>
    )
  }

  const roots = topics
    .filter((topic) => !topic.parent_id)
    .sort(
      (a, b) =>
        (a.display_order || 0) - (b.display_order || 0)
    )

  return (
    <section className="section page">
      <div className="container">
        <button
          className="back-link"
          onClick={() => navigate('/subjects')}
        >
          ← All subjects
        </button>

        <SectionHeading
          eyebrow="SUBJECT"
          title={subject.name}
          copy="Choose a topic or subtopic to start focused practice."
        />

        <div className="topic-layout">
          <div className="topic-list">

            {roots.map((topic) => (
              <TopicNode
                key={topic.id}
                topic={topic}
                topics={topics}
                level={0}
              />
            ))}

          </div>

          <div className="sidebar-card">
            <div className="eyebrow">QUICK START</div>

            <h3>Mixed practice</h3>

            <p>
              Pull questions across this subject for broader revision.
            </p>

            <Link
              className="primary-btn full"
              to={`/practice/${subject.slug}`}
            >
              Start MCQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


function TopicNode({ topic, topics, level = 0 }) {
  const [open, setOpen] = useState(level === 0)

  const children = topics
    .filter((item) => item.parent_id === topic.id)
    .sort(
      (a, b) =>
        (a.display_order || 0) - (b.display_order || 0)
    )

  const hasChildren = children.length > 0

  const subjectSlug =
    window.location.hash
      .split('/subjects/')[1]
      ?.split('?')[0] || ''

  return (
    <div
      className="topic-tree-node"
      style={{
        marginLeft: `${level * 20}px`
      }}
    >
      <div className="topic-row">
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {hasChildren && (
              <button
                type="button"
                className="outline-btn"
                onClick={() => setOpen((value) => !value)}
                style={{
                  minWidth: '38px',
                  padding: '8px 10px'
                }}
              >
                {open ? '−' : '+'}
              </button>
            )}

            <div>
              <h3>{topic.name}</h3>

              <p>
                {hasChildren
                  ? `${children.length} subtopics`
                  : 'Topic'}
              </p>
            </div>
          </div>
        </div>

        <Link
          className="outline-btn"
          to={`/practice/${subjectSlug}?topic=${encodeURIComponent(
            topic.slug
          )}`}
        >
          Practice
          <ArrowRight size={16} />
        </Link>
      </div>

      {open && hasChildren && (
        <div className="topic-children">
          {children.map((child) => (
            <TopicNode
              key={child.id}
              topic={child}
              topics={topics}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

async function loadSubject(slug) {
  if (supabaseConfigured && supabase) {
    const { data: subject, error: subjectError } = await supabase
      .from('subjects')
      .select('id,name,slug')
      .eq('slug', slug)
      .maybeSingle()

    if (subjectError) {
      console.error('Subject error:', subjectError)
    }

    if (subject) {
      const { data: topics, error: topicError } = await supabase
        .from('topics')
        .select('id,name,slug,parent_id,display_order')
        .eq('subject_id', subject.id)
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (topicError) {
        console.error('Topics error:', topicError)
      }

      return {
        subject,
        topics: topics || []
      }
    }
  }

  const fallbackSubject =
    fallbackSubjects.find((item) => item.slug === slug) ||
    fallbackSubjects[0]

  const baseTopics = [
    'Foundations',
    'Core Concepts',
    'Important Facts',
    'Advanced Topics'
  ].map((name, index) => ({
    id: `demo-${index}`,
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    parent_id: null,
    display_order: index + 1
  }))

  return {
    subject: fallbackSubject,
    topics: baseTopics
  }
}


function Practice() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()

  const topicSlug = searchParams.get('topic')

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuestions(slug, topicSlug)
      .then(setQuestions)
      .finally(() => setLoading(false))
  }, [slug, topicSlug])

  if (loading) {
    return <Loading />
  }

  if (!questions.length) {
    return (
      <section className="practice-page">
        <div className="result-panel">
          <div className="eyebrow">NO QUESTIONS YET</div>

          <h1>Question bank is empty</h1>

          <p>
            Published questions for this subject have not been added yet.
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

  const finished = index >= questions.length

  if (finished) {
    return (
      <section className="practice-page">
        <div className="result-panel">
          <div className="result-icon">
            <Trophy size={34} />
          </div>

          <div className="eyebrow">SESSION COMPLETE</div>

          <h1>
            {score} / {questions.length}
          </h1>

          <p>
            Nice work. This is the foundation for the full result and
            analytics experience.
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

  const q = questions[index]

  const options = [
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d
  ]

  const answer = q.correct_option

  const submit = () => {
    if (selected == null) return

    setRevealed(true)

    if (selected === answer) {
      setScore((currentScore) => currentScore + 1)
    }
  }

  const next = () => {
    setSelected(null)
    setRevealed(false)
    setIndex((currentIndex) => currentIndex + 1)
  }

  return (
    <section className="practice-page">
      <div className="practice-top">
        <Link to={`/subjects/${slug}`}>
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
            Question {index + 1} of {questions.length}
          </span>

          <span>{score} correct</span>
        </div>

        <div className="question-progress">
          <span
            style={{
              width: `${(index / questions.length) * 100}%`
            }}
          />
        </div>

        <h1>{q.question_text}</h1>

        <div className="options">
          {options.map((option, optionIndex) => {
            const number = optionIndex + 1

            const className = revealed
              ? number === answer
                ? 'correct'
                : number === selected
                  ? 'wrong'
                  : ''
              : selected === number
                ? 'selected'
                : ''

            return (
              <button
                disabled={revealed}
                onClick={() => setSelected(number)}
                className={`option ${className}`}
                key={number}
              >
                <span>
                  {String.fromCharCode(64 + number)}
                </span>

                <b>{option}</b>

                {revealed && number === answer && (
                  <CheckCircle2 size={20} />
                )}
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className="explanation">
            <div className="eyebrow">EXPLANATION</div>

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
              disabled={selected == null}
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


/*
  IMPORTANT:
  questions.subject stores the SUBJECT NAME in your database,
  not the subject slug.

  Therefore:
  subjects.slug -> find subject
  subjects.name -> query questions.subject

  topic filtering also uses questions.topic_id when available.
*/
async function loadQuestions(slug, topicSlug = null) {
  if (!supabaseConfigured || !supabase) {
    return demoQuestions
  }

  const { data: subject, error: subjectError } = await supabase
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

  let query = supabase
    .from('questions')
    .select(
      'id,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,topic_id'
    )
    .eq('is_published', true)
    .eq('subject', subject.name)
    .order('id', { ascending: true })
    .limit(10)

  /*
    If a topic was selected, first find the topic ID.
  */
  if (topicSlug) {
    const { data: topic, error: topicError } = await supabase
      .from('topics')
      .select('id')
      .eq('subject_id', subject.id)
      .eq('slug', topicSlug)
      .maybeSingle()

    if (topicError) {
      console.error('Topic error:', topicError)
    }

    if (topic) {
      query = supabase
        .from('questions')
        .select(
          'id,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,topic_id'
        )
        .eq('is_published', true)
        .eq('subject', subject.name)
        .eq('topic_id', topic.id)
        .order('id', { ascending: true })
        .limit(10)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Question error:', error)
    return []
  }

  return data || []
}


function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}


function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{copy}</p>
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
            <div className="brand-mark">M</div>

            <span>
              MCQ <b>Hub</b>
            </span>
          </div>

          <p>
            Structured MCQ practice for competitive exams.
          </p>
        </div>

        <span>
          Starter build • Supabase-ready
        </span>
      </div>
    </footer>
  )
}


createRoot(document.getElementById('root')).render(<App />)
