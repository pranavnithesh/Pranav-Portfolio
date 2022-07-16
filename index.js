const emailjs = require('emailjs-com') 
var contactForm = document.getElementById('contact-form');

const submitForm = (e) => {
    e.preventDefault();
    emailjs.sendForm("pranavnithesh", "template_qqwr00p", contactForm, "Yfk8ifV3KOg1pkcX8")
    .then(result => alert('Your message has been sent. I will contact you soon. Thank you!'))
    .catch(err => alert('Oops! Please try again.'))
}
document.querySelector('.submitButton').addEventListener('click', submitForm)

