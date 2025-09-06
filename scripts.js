// Custom JavaScript for Refrastrabe S.A.S.

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav)

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.classList.remove("scrolled")
      navbar.style.backgroundColor = "white"
      navbar.style.backdropFilter = "none"
    }
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  const elementsToAnimate = document.querySelectorAll(".product-card, .industry-item, .contact-form, .contact-info")
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const mensaje = document.getElementById("mensaje").value

      // Basic validation
      if (!nombre || !email || !mensaje) {
        showAlert("Por favor, complete todos los campos.", "warning")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showAlert("Por favor, ingrese un email válido.", "warning")
        return
      }

      // Simulate form submission
      showAlert("¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.", "success")
      this.reset()
    })
  }

  // Alert function
  function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector(".alert")
    if (existingAlert) {
      existingAlert.remove()
    }

    // Create new alert
    const alert = document.createElement("div")
    alert.className = `alert alert-${type} alert-dismissible fade show`
    alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `

    // Insert alert before the form
    const form = document.getElementById("contactForm")
    form.parentNode.insertBefore(alert, form)

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (alert && alert.parentNode) {
        alert.remove()
      }
    }, 5000)
  }

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    }
  })

  // Product card hover effects
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Industry items animation
  const industryItems = document.querySelectorAll(".industry-item")
  industryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".industry-icon")
      icon.style.transform = "scale(1.2) rotate(5deg)"
    })

    item.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".industry-icon")
      icon.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Utility function for smooth animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in:not(.visible)")
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Call animation function on scroll
window.addEventListener("scroll", animateOnScroll)
