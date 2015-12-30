import Validate from '../../lib/Validate';
import ValidateMessages from '../../lib/ValidateMessages';

let validateMessages = new ValidateMessages('.js-validate-messages');
let validate = new Validate('form', {
    customValidate: {
        passwordConfirm: (element, form) => {
            if(element.value !== form['password'].value) {
                element.setCustomValidity('パスワードが一致しません');
                return;
            }
            element.setCustomValidity('');
        }
    },
    onCheckHandler: (element, validity) => {
        let parent = element.parentNode;
        validateMessages.update(element.name, validity);

        validateMessages.toggleClass(parent, 'has-success', validity.valid);
        validateMessages.toggleClass(parent, 'has-error', !validity.valid);
    },
    onSubmitHandler: () => {
        alert('submit');
    }
});