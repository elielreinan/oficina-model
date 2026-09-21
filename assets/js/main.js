document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuButton?.querySelector('i');

    const closeMobileMenu = () => {
        mobileMenu?.classList.add('hidden');
        menuButton?.setAttribute('aria-expanded', 'false');
        menuButton?.setAttribute('aria-label', 'Abrir menu de navegação');
        menuIcon?.classList.replace('fa-xmark', 'fa-bars');
    };

    menuButton?.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('hidden') === false;
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        menuIcon?.classList.toggle('fa-bars', !isOpen);
        menuIcon?.classList.toggle('fa-xmark', isOpen);
    });
    mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

    const carousel = document.getElementById('brands-carousel');
    document.getElementById('brands-prev')?.addEventListener('click', () => carousel?.scrollBy({ left: -280, behavior: 'smooth' }));
    document.getElementById('brands-next')?.addEventListener('click', () => carousel?.scrollBy({ left: 280, behavior: 'smooth' }));

    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        const text = `Olá! Gostaria de solicitar um orçamento.\n\nNome: ${name}\nWhatsApp: ${phone}\nNecessidade: ${message}`;
        window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        showMessage('Abrimos o WhatsApp com a sua mensagem. Este é um fluxo demonstrativo.', 'success');
        contactForm.reset();
    });
});

function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `p-3 rounded-lg text-sm ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`;
    window.setTimeout(() => formMessage.classList.add('hidden'), 5000);
}
