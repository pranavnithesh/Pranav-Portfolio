(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const emailjs = require('emailjs-com') 
var contactForm = document.getElementById('contact-form');

const submitForm = (e) => {
    e.preventDefault();
    emailjs.sendForm("pranavnithesh", "template_qqwr00p", contactForm, "Yfk8ifV3KOg1pkcX8")
    .then(result => alert('Your message has been sent. I will contact you soon. Thank you!'))
    .catch(err => alert('Oops! Please try again.'))
}
document.querySelector('.submitButton').addEventListener('click', submitForm)


},{"emailjs-com":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPost = void 0;
const EmailJSResponseStatus_1 = require("../models/EmailJSResponseStatus");
const store_1 = require("../store/store");
const sendPost = (url, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', ({ target }) => {
            const responseStatus = new EmailJSResponseStatus_1.EmailJSResponseStatus(target);
            if (responseStatus.status === 200 || responseStatus.text === 'OK') {
                resolve(responseStatus);
            }
            else {
                reject(responseStatus);
            }
        });
        xhr.addEventListener('error', ({ target }) => {
            reject(new EmailJSResponseStatus_1.EmailJSResponseStatus(target));
        });
        xhr.open('POST', store_1.store._origin + url, true);
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(data);
    });
};
exports.sendPost = sendPost;

},{"../models/EmailJSResponseStatus":7,"../store/store":8}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForm = exports.send = exports.init = void 0;
const init_1 = require("./methods/init/init");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return init_1.init; } });
const send_1 = require("./methods/send/send");
Object.defineProperty(exports, "send", { enumerable: true, get: function () { return send_1.send; } });
const sendForm_1 = require("./methods/sendForm/sendForm");
Object.defineProperty(exports, "sendForm", { enumerable: true, get: function () { return sendForm_1.sendForm; } });
exports.default = {
    init: init_1.init,
    send: send_1.send,
    sendForm: sendForm_1.sendForm,
};

},{"./methods/init/init":4,"./methods/send/send":5,"./methods/sendForm/sendForm":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const store_1 = require("../../store/store");
/**
 * Initiation
 * @param {string} userID - set the EmailJS user ID
 * @param {string} origin - set the EmailJS origin
 */
const init = (userID, origin = 'https://api.emailjs.com') => {
    store_1.store._userID = userID;
    store_1.store._origin = origin;
};
exports.init = init;

},{"../../store/store":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const store_1 = require("../../store/store");
const validateParams_1 = require("../../utils/validateParams");
const sendPost_1 = require("../../api/sendPost");
/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templatePrams - the template params, what will be set to the EmailJS template
 * @param {string} userID - the EmailJS user ID
 * @returns {Promise<EmailJSResponseStatus>}
 */
const send = (serviceID, templateID, templatePrams, userID) => {
    const uID = userID || store_1.store._userID;
    validateParams_1.validateParams(uID, serviceID, templateID);
    const params = {
        lib_version: '3.2.0',
        user_id: uID,
        service_id: serviceID,
        template_id: templateID,
        template_params: templatePrams,
    };
    return sendPost_1.sendPost('/api/v1.0/email/send', JSON.stringify(params), {
        'Content-type': 'application/json',
    });
};
exports.send = send;

},{"../../api/sendPost":2,"../../store/store":8,"../../utils/validateParams":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForm = void 0;
const store_1 = require("../../store/store");
const validateParams_1 = require("../../utils/validateParams");
const sendPost_1 = require("../../api/sendPost");
const findHTMLForm = (form) => {
    let currentForm;
    if (typeof form === 'string') {
        currentForm = document.querySelector(form);
    }
    else {
        currentForm = form;
    }
    if (!currentForm || currentForm.nodeName !== 'FORM') {
        throw 'The 3rd parameter is expected to be the HTML form element or the style selector of form';
    }
    return currentForm;
};
/**
 * Send a form the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {string | HTMLFormElement} form - the form element or selector
 * @param {string} userID - the EmailJS user ID
 * @returns {Promise<EmailJSResponseStatus>}
 */
const sendForm = (serviceID, templateID, form, userID) => {
    const uID = userID || store_1.store._userID;
    const currentForm = findHTMLForm(form);
    validateParams_1.validateParams(uID, serviceID, templateID);
    const formData = new FormData(currentForm);
    formData.append('lib_version', '3.2.0');
    formData.append('service_id', serviceID);
    formData.append('template_id', templateID);
    formData.append('user_id', uID);
    return sendPost_1.sendPost('/api/v1.0/email/send-form', formData);
};
exports.sendForm = sendForm;

},{"../../api/sendPost":2,"../../store/store":8,"../../utils/validateParams":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailJSResponseStatus = void 0;
class EmailJSResponseStatus {
    constructor(httpResponse) {
        this.status = httpResponse.status;
        this.text = httpResponse.responseText;
    }
}
exports.EmailJSResponseStatus = EmailJSResponseStatus;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
exports.store = {
    _origin: 'https://api.emailjs.com',
};

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = void 0;
const validateParams = (userID, serviceID, templateID) => {
    if (!userID) {
        throw 'The user ID is required. Visit https://dashboard.emailjs.com/admin/integration';
    }
    if (!serviceID) {
        throw 'The service ID is required. Visit https://dashboard.emailjs.com/admin';
    }
    if (!templateID) {
        throw 'The template ID is required. Visit https://dashboard.emailjs.com/admin/templates';
    }
    return true;
};
exports.validateParams = validateParams;

},{}]},{},[1]);
