// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.toggle('active');
            
            // Toggle icon
            const icon = question.querySelector('.faq-icon');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
            
            // Close other open items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    if (otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherQuestion.querySelector('.faq-icon');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                }
            });
        });
    });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const newsletter = document.getElementById('newsletter').checked;
            
            // Simple validation
            if (!name || !phone || !message) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Basic phone validation (Brazilian format)
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(phone)) {
                showMessage('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX', 'error');
                return;
            }
            
            // Prepare WhatsApp message
            const whatsappMessage = `
*Nova mensagem de contato - AutoFix*

*Nome:* ${name}
*Telefone:* ${phone}
*Mensagem:* ${message}
*Newsletter:* ${newsletter ? 'Sim' : 'Não'}
            `.trim();
            
            // Encode for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
            
            // Show success and redirect to WhatsApp after delay
            showMessage('Redirecionando para o WhatsApp...', 'success');
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
            }, 1500);
        });
    }
});

// Utility function to show form messages
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `mt-4 p-3 rounded-lg ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} border-l-4 ${type === 'success' ? 'border-green-500' : 'border-red-500'}`;
    formMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Lazy Loading for images (if any)
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for older browsers - you could use a library here
        // For now, we'll just ensure they load normally
    }
});

// Dark Mode Toggle (placeholder for future implementation)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
// Future: Add toggle button and persist preference