// Funcionalidade do menu mobile
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

// Rolagem suave para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fechar menu mobile se estiver aberto
                document.getElementById('nav').classList.remove('active');
            }
        });
    });

    // Manipulador de envio do formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Inicializar animações
    initializeAnimations();

    // Efeito de rolagem do cabeçalho
    initializeHeaderEffect();

    // Fechar menu mobile ao clicar fora
    initializeMobileMenuClose();
});

// Manipulador de envio do formulário
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Obter dados do formulário
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validar formulário
    if (!validateForm(data)) {
        return;
    }
    
    // Mostrar estado de carregamento
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    // Simular envio do formulário (substituir por chamada de API real)
    setTimeout(() => {
        showSuccessMessage();
        event.target.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Validação do formulário
function validateForm(data) {
    // Verificar campos obrigatórios
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Por favor, digite um endereço de e-mail válido.');
        return false;
    }
    
    // Validação do comprimento da mensagem
    if (data.message.length < 10) {
        showErrorMessage('Por favor, forneça uma mensagem mais detalhada (pelo menos 10 caracteres).');
        return false;
    }
    
    return true;
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 0.375rem;
            margin-bottom: 1rem;
            border: 1px solid #c3e6cb;
        ">
            <strong>Obrigado!</strong> Sua mensagem foi enviada com sucesso. 
            A Dra. Martinez responderá em até 24 horas.
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        message.remove();
    }, 5000);
    
    // Rolar para a mensagem
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Mostrar mensagem de erro
function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
        <div style="
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 0.375rem;
            margin-bottom: 1rem;
            border: 1px solid #f5c6cb;
        ">
            <strong>Erro:</strong> ${text}
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Inicializar animações de rolagem
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Animar apenas uma vez
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .about-content, .contact-info');
    animatedElements.forEach(el => observer.observe(el));
}

// Efeito de rolagem do cabeçalho
function initializeHeaderEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
}

// Fechar menu mobile ao clicar fora
function initializeMobileMenuClose() {
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
}

// Função utilitária para debounce de eventos de rolagem
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manipulador de rolagem aprimorado com debouncing
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = 'none';
    }
}, 10);

// Substituir o manipulador de rolagem simples pela versão com debounce
window.addEventListener('scroll', debouncedScrollHandler);

// Adicionar suporte à navegação por teclado
document.addEventListener('keydown', (e) => {
    // Tecla ESC fecha o menu mobile
    if (e.key === 'Escape') {
        document.getElementById('nav').classList.remove('active');
    }
});

// Adicionar gerenciamento de foco para acessibilidade
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--therapy-accent)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Inicializar gerenciamento de foco
document.addEventListener('DOMContentLoaded', manageFocus);

// Adicionar gerenciamento de estado de carregamento
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.style.opacity = '0.7';
        element.style.cursor = 'not-allowed';
    } else {
        element.disabled = false;
        element.style.opacity = '1';
        element.style.cursor = 'pointer';
    }
}

// Envio de formulário aprimorado com melhor UX
function enhancedFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Limpar mensagens anteriores
    const existingAlerts = form.parentNode.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Validar formulário
    if (!validateForm(data)) {
        return;
    }
    
    // Definir estado de carregamento
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    setLoadingState(submitButton, true);
    
    // Simular chamada de API (substituir por implementação real)
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitButton.textContent = originalText;
        setLoadingState(submitButton, false);
    }, 2000);
}

// Atualizar o event listener do formulário
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', enhancedFormSubmit);
    }
});