export function initObserver() {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target)
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    }, { threshold: 0.1 })

    const experienceCards = document.querySelectorAll('.experience-card')
    console.log('Found cards:', experienceCards.length)
    experienceCards.forEach((card) => observer.observe(card))
  }
}