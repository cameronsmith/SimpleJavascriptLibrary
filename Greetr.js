(function(global, $) {
    
    // return a 'new' object.
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    /**
     * protected because it's not added to the prototype, but the closure still has access because 
     * it's within the lexical scope.
     */
    var supportedLanguages = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };

    /**
     * Add methods to prototype as it's better for performance we don't want each object to have a brand new instantiated method.
     * We just want one copy!
     */
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName;
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.firstName + ' ' + this.lastName;
        },

        greet: function(formal) {
            var message = (formal === true) ? this.formalGreeting() : this.greeting();

            if (console) {
                console.log(message);
            }

            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ' ' + this.fullName());
            }

            return this;
        },

        setLanguage(language) {
            this.language = language;
            this.validate();

            return this;
        },

        HTMLGreeting(selector, formal) {
            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var message = (formal === true) ? this.formalGreeting() : this.greeting();
            $(selector).html(message);

            return this;
        }
    };

    // The actual object is created here, allowing us to ;new' an object without calling 'new'.
    Greetr.init = function(firstName, lastName, language) {
        var self = this;

        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

})(window, $);