$(document).ready(function() {

    const form = $('form');
    const table = $('table');
    // $(document).on('click', '[data-button=Listar]',(event)=>Requisitar(event, Listar));
    $(document).on('click', '[data-button=Salvar]', (event)=> Salvar(event));
    $(document).on('click', '[data-button=Listar]',(event)=>Listar(event));
    
    const Requisitar = (url, method, data) => {
        console.log(url, method, data);
        return $.ajax({url: url, method: method, data: data})
    }

    const Salvar = (event) => {
        event.preventDefault();

        url ='http://localhost:3000/usuario';
        method = 'POST';
        data = form.serialize();

        console.log("Salvar");

        Requisitar(url, method, data)
        .then((response, status, xhr) => {
            console.log(response);
        })
        .catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Listar = (event) => {
        event.preventDefault();
        url ='http://localhost:3000/usuario';
        method = 'GET';
        data = null;

        console.log("Listar");

        Requisitar(url, method, data)
        .then((response, status, xhr) => {

            console.log(table);
            
            var linha = table[0].insertRow();
            var coluna = linha.insertCell(0);
            var coluna = linha.insertCell(1);
            
            const objetos = JSON.parse(response);
            objetos.forEach((objeto, index, array) => {
                console.log("_id:", objeto._id);
                console.log("Nome:", objeto.nome);
                console.log("Tipo:", objeto.tipo);
            });
        })
        .catch((error, status, xhr) => {
            console.error(error);
        })
    }

    // $('[data-a]').on('click', function(event) {
    //     event.preventDefault();
    //     console.log(event);
    //     console.log(this);
    //     // var target = $(this).data('a');
    //     // $('main').load(`${target}.html`);
    // });
});








