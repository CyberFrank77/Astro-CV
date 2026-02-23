// creame un observer para las tarjetas de experiencia laboral, 
// que les añada la clase 'show' cuando estén visibles en el viewport y se la quite cuando no lo estén.
// intersection observer API para detectar cuando las tarjetas de experiencia laboral están visibles en el viewport
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