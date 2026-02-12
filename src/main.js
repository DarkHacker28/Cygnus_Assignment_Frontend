const jobs = [
  { id: 1, title: 'Frontend Intern', company: 'Acme Corp', location: 'Remote', type: 'Internship' },
  { id: 2, title: 'Backend Developer', company: 'TechSoft', location: 'Bangalore', type: 'Full-time' },
  { id: 3, title: 'UI/UX Intern', company: 'Designify', location: 'Remote', type: 'Internship' },
  { id: 4, title: 'React Developer', company: 'WebWorks', location: 'Hyderabad', type: 'Full-time' },
  { id: 5, title: 'Frontend Engineer', company: 'InnovateX', location: 'Pune', type: 'Full-time' },
  { id: 6, title: 'Software Intern', company: 'CloudNine', location: 'Remote', type: 'Internship' },
  { id: 7, title: 'Node.js Developer', company: 'ServerStack', location: 'Bangalore', type: 'Full-time' },
  { id: 8, title: 'Product Intern', company: 'StartupHub', location: 'Pune', type: 'Internship' },
  { id: 9, title: 'Full Stack Developer', company: 'TechLabs', location: 'Hyderabad', type: 'Full-time' },
  { id: 10, title: 'Data Analyst Intern', company: 'InsightAI', location: 'Remote', type: 'Internship' },
]

const PER_PAGE = 4
let currentPage = 1
let sort = false

const searchInput = document.getElementById('search')
const locationFilter = document.getElementById('locationFilter')
const typeFilter = document.getElementById('typeFilter')
const sortBtn = document.getElementById('sortBtn')
const jobList = document.getElementById('jobList')
const pagination = document.getElementById('pagination')
const darkToggle = document.getElementById('darkToggle')

/* ---------------- Skeleton Loader ---------------- */

function showSkeleton() {
  jobList.innerHTML = Array.from({ length: PER_PAGE }).map(() => `
    <div class="card skeleton">
      <div class="sk-title"></div>
      <div class="sk-line"></div>
      <div class="sk-line"></div>
      <div class="sk-badge"></div>
    </div>
  `).join('')
}

/* ---------------- Render Jobs ---------------- */

function renderJobs() {
  showSkeleton()

  setTimeout(() => {
    let filtered = [...jobs]

    if (locationFilter.value !== 'All')
      filtered = filtered.filter(j => j.location === locationFilter.value)

    if (typeFilter.value !== 'All')
      filtered = filtered.filter(j => j.type === typeFilter.value)

    if (searchInput.value)
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(searchInput.value.toLowerCase())
      )

    if (sort) filtered.sort((a, b) => a.title.localeCompare(b.title))

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const start = (currentPage - 1) * PER_PAGE
    const paginated = filtered.slice(start, start + PER_PAGE)

    jobList.innerHTML = ''
    paginated.forEach((job, i) => {
      const div = document.createElement('div')
      div.className = 'card'
      div.style.animationDelay = `${i * 90}ms`
      div.innerHTML = `
        <h3>${highlight(job.title)}</h3>
        <p>${job.company}</p>
        <p>📍 ${job.location}</p>
        <span>${job.type}</span>
      `
      jobList.appendChild(div)
    })

    pagination.innerHTML = Array.from({ length: totalPages }, (_, i) =>
      `<button class="${currentPage === i + 1 ? 'active' : ''}" onclick="gotoPage(${i + 1})">${i + 1}</button>`
    ).join('')

  }, 350)
}

/* ---------------- Helpers ---------------- */

function highlight(text) {
  const key = searchInput.value
  if (!key) return text
  return text.replace(new RegExp(key, 'gi'), match => `<mark>${match}</mark>`)
}

window.gotoPage = function (p) {
  currentPage = p
  renderJobs()
}

/* ---------------- Events ---------------- */

searchInput.addEventListener('input', () => {
  currentPage = 1
  renderJobs()
})

locationFilter.addEventListener('change', () => {
  currentPage = 1
  renderJobs()
})

typeFilter.addEventListener('change', () => {
  currentPage = 1
  renderJobs()
})

sortBtn.addEventListener('click', () => {
  sort = !sort
  sortBtn.innerHTML = sort ? '⬇ Sorted' : '↕ Sort'
  renderJobs()
})

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  darkToggle.innerHTML =
    document.body.classList.contains('dark') ? '☀ Light' : '🌙 Dark'
})

renderJobs()


const revealEls = document.querySelectorAll('.card')

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active')
  })
},{ threshold: 0.15 })

revealEls.forEach(el => {
  el.classList.add('reveal')
  revealObserver.observe(el)
})
// Cursor glow effect

const glow = document.querySelector('.cursor-glow')

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px'
  glow.style.top = e.clientY + 'px'
})
// Magnetic button effect

const magnets = document.querySelectorAll('button')

magnets.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`
  })

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = ''
  })
})
