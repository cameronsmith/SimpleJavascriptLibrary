var FORMAL = true;
var INFORMAL = false;

var g = G$('Cameron', 'Smth');
console.log(g);

g.greet().setLanguage('es').greet(FORMAL);

g.HTMLGreeting('#greeting', INFORMAL);