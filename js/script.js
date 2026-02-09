// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '1rem 5%';
        nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Lógica de Envio do Formulário via AJAX
const contactForm = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Muda texto do botão para indicar carregamento
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;
        statusDiv.style.display = 'none'; // Esconde mensagem anterior se houver

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Sucesso
                statusDiv.innerHTML = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
                statusDiv.className = 'success-message'; // Aplica estilo verde
                statusDiv.style.display = 'block';
                contactForm.reset(); // Limpa os campos do formulário
            } else {
                // Erro do servidor
                throw new Error('Erro no envio');
            }
        })
        .catch(error => {
            // Erro de conexão
            statusDiv.innerHTML = "Ocorreu um erro ao enviar. Tente novamente ou chame no WhatsApp.";
            statusDiv.className = 'error-message'; // Aplica estilo vermelho
            statusDiv.style.display = 'block';
        })
        .finally(() => {
            // Restaura o botão ao normal
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}