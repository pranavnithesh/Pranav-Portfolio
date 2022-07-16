const emailjs = require('emailjs-com') 
const submitForm = (e) => {
    console.log("Inside submit form")
    e.preventDefault();
    emailjs.sendForm("pranavnithesh", "template_qqwr00p", "contact-form", "Yfk8ifV3KOg1pkcX8")
    .then(result => alert('Your message has been sent. I will contact you soon. Thank you!'))
    .catch(err => alert('Oops! Please try again.'))
    console.log("Inside submit form 1")
}
document.querySelector('.submitButton').addEventListener('click', submitForm)

