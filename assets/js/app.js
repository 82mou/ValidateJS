/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Validate = __webpack_require__(1);

	var _Validate2 = _interopRequireDefault(_Validate);

	var _ValidateMessages = __webpack_require__(2);

	var _ValidateMessages2 = _interopRequireDefault(_ValidateMessages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validateMessages = new _ValidateMessages2.default('.js-validate-messages');
	var validate = new _Validate2.default('form', {
	    customValidate: {
	        passwordConfirm: function passwordConfirm(element, form) {
	            if (element.value !== form['password'].value) {
	                element.setCustomValidity('パスワードが一致しません');
	                return;
	            }
	            element.setCustomValidity('');
	        }
	    },
	    onCheckHandler: function onCheckHandler(element, validity) {
	        var parent = element.parentNode;
	        validateMessages.update(element.name, validity);

	        validateMessages.toggleClass(parent, 'has-success', validity.valid);
	        validateMessages.toggleClass(parent, 'has-error', !validity.valid);
	    },
	    onSubmitHandler: function onSubmitHandler() {
	        alert('submit');
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var Validate = (function () {
	    function Validate(element, option) {
	        var _this = this;
	        if (option === void 0) {
	            option = {};
	        }
	        this.form = element;
	        if (typeof element === "string") {
	            this.form = document.getElementById(element);
	        }
	        this.submitBtn = this.form.querySelector('button');
	        this.option = this.extend({
	            customValidate: {},
	            onCheckHandler: Validate.noop,
	            onSubmitHandler: Validate.noop
	        }, option);
	        this._changeHandler = function (e) {
	            _this.update(e);
	        };
	        this._inputHandler = function (e) {
	            _this.update(e);
	        };
	        this._submitHandler = function (e) {
	            if (!_this.isValid()) return;
	            e.preventDefault();
	            _this.submit();
	        };
	        this.init();
	    }
	    Validate.noop = function () {};
	    /**
	     * formの監視を開始する
	     */
	    Validate.prototype.init = function () {
	        this.form.addEventListener('change', this._changeHandler);
	        this.form.addEventListener('input', this._inputHandler);
	        this.form.addEventListener('submit', this._submitHandler);
	    };
	    /**
	     * formのバリデーションが通っているかを返す
	     * @returns {boolean}
	     */
	    Validate.prototype.isValid = function () {
	        return this.form.checkValidity();
	    };
	    /**
	     * formの変更を元に画面を更新する
	     * @param e
	     */
	    Validate.prototype.update = function (e) {
	        var target = e.target;
	        target.classList.add('is-dirty');
	        var customValidate = this.option.customValidate[target.name];
	        if (customValidate) {
	            customValidate.apply(this, [target, this.form]);
	        }
	        this.option.onCheckHandler.apply(this, [target, target.validity]);
	        if (this.form.checkValidity()) {
	            this.disabled(false);
	            return;
	        }
	        this.disabled(true);
	    };
	    /**
	     * 送信ボタンのdisabledを切り替える
	     * @param bool
	     */
	    Validate.prototype.disabled = function (bool) {
	        if (bool) {
	            this.submitBtn.setAttribute('disabled', 'disabled');
	            return;
	        }
	        this.submitBtn.removeAttribute('disabled');
	    };
	    /**
	     * formを送信する
	     * オプションでonSubmitHandlerが設定されていなければform.submitを発火する
	     */
	    Validate.prototype.submit = function () {
	        if (!this.isValid()) {
	            return;
	        }
	        if (this.option.onSubmitHandler !== Validate.noop) {
	            this.option.onSubmitHandler.apply(this, []);
	            return;
	        }
	        this.form.submit();
	    };
	    Validate.prototype.destroy = function () {
	        this.form.removeEventListener('change', this._changeHandler);
	        this.form.removeEventListener('input', this._inputHandler);
	        this.form.removeEventListener('submit', this._submitHandler);
	    };
	    Validate.prototype.extend = function (obj) {
	        if (obj === void 0) {
	            obj = {};
	        }
	        var src = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            src[_i - 1] = arguments[_i];
	        }
	        if (arguments.length < 2) {
	            return obj;
	        }
	        for (var i = 1; i < arguments.length; i++) {
	            for (var key in arguments[i]) {
	                if (arguments[i][key] !== null && _typeof(arguments[i][key]) === "object") {
	                    obj[key] = this.extend(obj[key], arguments[i][key]);
	                } else {
	                    obj[key] = arguments[i][key];
	                }
	            }
	        }
	        return obj;
	    };
	    return Validate;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Validate;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * ValidityStateオブジェクトを受け取り
	 * formのエラー表示をする
	 */
	var ValidateMessages = (function () {
	    function ValidateMessages(selector) {
	        this.elements = document.querySelectorAll(selector);
	        this.error = {};
	        this.messages = {};
	        this.init();
	    }
	    ValidateMessages.prototype.init = function () {
	        var _this = this;
	        Array.prototype.forEach.call(this.elements, function (el) {
	            var key = el.getAttribute('data-messages');
	            _this.messages[key] = el;
	        });
	    };
	    ValidateMessages.prototype.update = function (key, validity) {
	        var target = this.messages[key];
	        if (!target) {
	            return;
	        }
	        var messages = target.children;
	        var len = messages.length;
	        var isValid = validity.valid;
	        this.error = {};
	        while (len--) {
	            var message = messages[len];
	            this.toggleClass(message, 'is-show', false);
	            if (isValid) continue;
	            var key_1 = message.getAttribute('data-message');
	            if (!validity[key_1]) continue;
	            this.error = {
	                key: key_1,
	                element: message
	            };
	        }
	        if (this.error.key) {
	            this.toggleClass(this.error.element, 'is-show', true);
	        }
	    };
	    ValidateMessages.prototype.toggleClass = function (element, className, force) {
	        if (typeof force === 'undefined') {
	            element.classList.toggle(className);
	            return;
	        }
	        var method = force ? 'add' : 'remove';
	        element.classList[method](className);
	    };
	    return ValidateMessages;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ValidateMessages;

/***/ }
/******/ ]);