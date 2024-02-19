import './cadastro/usuario.js';
import './cadastro/pista.js'; 

$(document).ready(function() {
    $('[data-a]').on('click', function(event) {
        event.preventDefault();
        var target = $(this).data('a');
        $('main').load(`${target}.html`);
    });

    // var resources = performance.getEntriesByType('resource');

    // // Itera sobre cada entrada e imprime a URL
    // resources.forEach(function(resource) {
    //     console.log(resource.name);
    // });
});

