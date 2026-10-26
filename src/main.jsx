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
