// Portfolio.js - Main JavaScript for Portfolio Page

// State Management
let currentPage = 0;
const projectsPerPage = 9;
let filteredProjects = [...projectsData];
let isLoading = false;
let hasMoreProjects = true;

// Filter State
let activeFilters = {
  category: 'all',
  technology: 'all',
  year: 'all',
  search: ''
};

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const endMessage = document.getElementById('endMessage');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const techFilter = document.getElementById('techFilter');
const yearFilter = document.getElementById('yearFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const projectModal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  setupEventListeners();
  setupInfiniteScroll();
});

// Setup Event Listeners
function setupEventListeners() {
  // Category Filter Buttons
  document.querySelectorAll('.filter-btn[data-filter="category"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn[data-filter="category"]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilters.category = e.target.dataset.value;
      resetAndFilter();
    });
  });

  // Technology Filter
  techFilter.addEventListener('change', (e) => {
    activeFilters.technology = e.target.value;
    resetAndFilter();
  });

  // Year Filter
  yearFilter.addEventListener('change', (e) => {
    activeFilters.year = e.target.value;
    resetAndFilter();
  });

  // Search Input
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      activeFilters.search = e.target.value.toLowerCase();
      resetAndFilter();
    }, 300);
  });

  // Clear Filters
  clearFiltersBtn.addEventListener('click', () => {
    activeFilters = {
      category: 'all',
      technology: 'all',
      year: 'all',
      search: ''
    };
    
    document.querySelectorAll('.filter-btn[data-filter="category"]').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-value="all"]').classList.add('active');
    techFilter.value = 'all';
    yearFilter.value = 'all';
    searchInput.value = '';
    
    resetAndFilter();
  });

  // Modal Events
  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  
  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Reset Search Button
  document.getElementById('resetSearch')?.addEventListener('click', () => {
    searchInput.value = '';
    activeFilters.search = '';
    resetAndFilter();
  });
}

// Setup Infinite Scroll
function setupInfiniteScroll() {
  window.addEventListener('scroll', () => {
    if (isLoading || !hasMoreProjects) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 500;

    if (scrollPosition >= threshold) {
      loadProjects();
    }
  });
}

// Filter Projects
function filterProjects() {
  filteredProjects = projectsData.filter(project => {
    // Category filter
    if (activeFilters.category !== 'all' && project.category !== activeFilters.category) {
      return false;
    }

    // Technology filter
    if (activeFilters.technology !== 'all') {
      if (!project.technologies.includes(activeFilters.technology)) {
        return false;
      }
    }

    // Year filter
    if (activeFilters.year !== 'all' && project.year.toString() !== activeFilters.year) {
      return false;
    }

    // Search filter
    if (activeFilters.search) {
      const searchTerm = activeFilters.search;
      const searchableText = `
        ${project.title} 
        ${project.client} 
        ${project.shortDescription} 
        ${project.fullDescription}
        ${project.techStack.join(' ')}
      `.toLowerCase();

      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });

  updateResultsCount();
}

// Reset and Filter
function resetAndFilter() {
  currentPage = 0;
  hasMoreProjects = true;
  portfolioGrid.innerHTML = '';
  endMessage.style.display = 'none';
  noResults.style.display = 'none';
  filterProjects();
  
  if (filteredProjects.length === 0) {
    noResults.style.display = 'block';
  } else {
    loadProjects();
  }
}

// Update Results Count
function updateResultsCount() {
  const showing = Math.min((currentPage + 1) * projectsPerPage, filteredProjects.length);
  const total = filteredProjects.length;
  resultsCount.innerHTML = `Mostrando <strong>${showing}</strong> de <strong>${total}</strong> projetos`;
}

// Load Projects
function loadProjects() {
  if (isLoading || !hasMoreProjects) return;

  isLoading = true;
  loadingIndicator.classList.add('active');

  // Simulate API delay for smooth UX
  setTimeout(() => {
    const start = currentPage * projectsPerPage;
    const end = start + projectsPerPage;
    const projectsToShow = filteredProjects.slice(start, end);

    if (projectsToShow.length === 0) {
      hasMoreProjects = false;
      loadingIndicator.classList.remove('active');
      if (currentPage > 0) {
        endMessage.style.display = 'block';
      }
      isLoading = false;
      return;
    }

    projectsToShow.forEach((project, index) => {
      setTimeout(() => {
        const projectCard = createProjectCard(project);
        portfolioGrid.appendChild(projectCard);
      }, index * 100);
    });

    currentPage++;
    isLoading = false;
    loadingIndicator.classList.remove('active');
    updateResultsCount();

    // Check if we've loaded all projects
    if (end >= filteredProjects.length) {
      hasMoreProjects = false;
      if (filteredProjects.length > projectsPerPage) {
        endMessage.style.display = 'block';
      }
    }
  }, 600);
}

// Create Project Card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'portfolio-item';
  card.dataset.category = project.category;
  card.onclick = () => openModal(project);

  card.innerHTML = `
    <div class="portfolio-item-image" style="background: ${project.image};">
      <div style="font-size: 5rem; position: relative; z-index: 1;">${project.icon}</div>
      <div class="portfolio-item-overlay">
        <button class="view-project-btn">Ver Projeto</button>
      </div>
    </div>
    <div class="portfolio-item-content">
      <div class="portfolio-item-header">
        <span class="portfolio-item-tag">${getCategoryName(project.category)}</span>
        <span class="portfolio-item-year">${project.year}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="portfolio-item-client">Cliente: ${project.client}</p>
      <p>${project.shortDescription}</p>
      <div class="portfolio-item-tech">
        ${project.techStack.slice(0, 3).map(tech => `
          <span class="tech-badge">${tech}</span>
        `).join('')}
        ${project.techStack.length > 3 ? `<span class="tech-badge">+${project.techStack.length - 3}</span>` : ''}
      </div>
    </div>
  `;

  return card;
}

// Get Category Display Name
function getCategoryName(category) {
  const names = {
    'web': 'Website',
    'ecommerce': 'E-commerce',
    'system': 'Sistema',
    'mobile': 'Mobile'
  };
  return names[category] || category;
}

// Open Modal
function openModal(project) {
  const modalBody = document.querySelector('.modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-header-image" style="background: ${project.image};">
      <div style="font-size: 8rem; position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%;">
        ${project.icon}
      </div>
    </div>
    
    <div class="modal-info">
      <div class="modal-title-section">
        <div class="modal-tags">
          <span class="modal-tag">${getCategoryName(project.category)}</span>
          <span class="modal-tag">${project.year}</span>
        </div>
        <h2>${project.title}</h2>
        <p class="modal-client">Cliente: ${project.client}</p>
        <p class="modal-description">${project.fullDescription}</p>
      </div>

      <div class="modal-details-grid">
        <div class="modal-detail-item">
          <div class="modal-detail-label">Duração</div>
          <div class="modal-detail-value">${project.duration}</div>
        </div>
        <div class="modal-detail-item">
          <div class="modal-detail-label">Equipe</div>
          <div class="modal-detail-value">${project.team}</div>
        </div>
        <div class="modal-detail-item">
          <div class="modal-detail-label">Ano</div>
          <div class="modal-detail-value">${project.year}</div>
        </div>
      </div>

      <div class="modal-section">
        <h3>🎯 O Desafio</h3>
        <p>${project.challenge}</p>
      </div>

      <div class="modal-section">
        <h3>💡 Nossa Solução</h3>
        <p>${project.solution}</p>
      </div>

      <div class="modal-section">
        <h3>🚀 Resultados Alcançados</h3>
        <ul>
          ${project.results.map(result => `<li>${result}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h3>🛠️ Stack Tecnológico</h3>
        <div class="modal-tech-stack">
          ${project.techStack.map(tech => `
            <span class="modal-tech-item">${tech}</span>
          `).join('')}
        </div>
      </div>

      <div class="modal-cta">
        <h3>Gostou deste projeto?</h3>
        <p>Vamos criar algo incrível juntos! Entre em contato e transforme sua ideia em realidade.</p>
        <a href="index.html#contact" class="btn btn-primary">Iniciar Meu Projeto</a>
      </div>
    </div>
  `;

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.includes('index.html')) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Scroll Effect
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
