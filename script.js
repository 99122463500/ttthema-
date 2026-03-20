const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Error sending message. Try again later.');
        }
    } catch (err) {
        console.error(err);
        alert('Server error. Try again later.');
    }
});
