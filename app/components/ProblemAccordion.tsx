'use client'

const problems = [
  {
    eyebrow: 'the behavior',
    title: 'They Start. Then Vanish.',
    text: "A prospect finds your site, opens your form, types their name and email — then their phone buzzes. They switch tabs. They never come back. And you never knew they existed."
  },
  {
    eyebrow: 'the pattern',
    title: 'Every Extra Field Costs You',
    text: "Five fields might seem reasonable — but data shows most visitors abandon after three. Every extra field is a silent conversion killer. And until now, you had no way to see it."
  },
  {
    eyebrow: 'the cost',
    title: 'Ghost Leads Are Bleeding You Dry',
    text: "If 100 visitors start your form and 60 don't finish, that's 15–20 lost bookings per month. For a $1,500 average service, that's $22k–$30k walking out the door. Every single month."
  },
]

export default function ProblemAccordion() {
  return (
    <div className="problem-editorial">
      {problems.map((p, i) => (
        <article className="problem-row" key={i}>
          <div className="problem-row-head">
            <span className="problem-row-eyebrow">{p.eyebrow}</span>
            <h3 className="problem-row-title">{p.title}</h3>
          </div>
          <p className="problem-row-text">{p.text}</p>
        </article>
      ))}
    </div>
  )
}
