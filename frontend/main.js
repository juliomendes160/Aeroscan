$(document).ready(function() {

    const form = $('form');
    const table = $('table');

    $(document).on('click', '[data-button=Salvar]', (event)=> Salvar(event));
    $(document).on('click', '[data-button=Listar]',(event)=>Listar(event));
    $(document).on('click', '[data-button=Consultar]',(event)=>Consultar(event));
    $(document).on('click', '[data-button=Atualizar]',(event)=>Atualizar(event));
    $(document).on('click', '[data-button=Excluir]',(event)=>Excluir(event));
    $(document).on('click', '[data-button=Limpar]',(event)=>Limpar(event));

    const Salvar = (event) => {
        console.log("Salvar");

        event.preventDefault();

        url ='http://localhost:3000/usuario';
        method = 'POST';
        data = form.serialize();

        $.ajax({url: url, method: method, data: data}).then((response, status, xhr) => {
            console.log(response);
        })
        .catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Listar = (event) => {
        console.log("Listar");

        event.preventDefault();
       
        url ='http://localhost:3000/usuario';
        method = 'GET';

        $.ajax({url: url, method: method}).then((response, status, xhr) => {
            console.log(response);

            table.empty();
            var row = $('<tr>');
            row.append($('<td>').text('ID'));
            row.append($('<td>').text('Nome'));
            row.append($('<td>').text('Tipo'));
            table.append(row);

            response.forEach((response, index, array) => {
                var row = $('<tr>');
                row.append($('<td>').text(response._id));
                row.append($('<td>').text(response.nome));
                row.append($('<td>').text(response.tipo));
                table.append(row);
            });
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Consultar = (event) => {
        console.log("Consultar");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'GET';
        
        $.ajax({url: url, method: method}).then((response, status, xhr) => {
            console.log(response);

            form.find("#nome").val(response.nome);
            form.find("#tipo").val(response.tipo);
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Atualizar = (event) => {
        // console.log("Atualizar");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'PUT';
        data = form.serialize();
        
        $.ajax({url: url, method: method, data: data}).then((response, status, xhr) => {
            // console.log(response);
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Excluir = (event) => {
        // console.log("Excluir");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'DELETE';
        
        $.ajax({url: url, method: method}).then((response, status, xhr) => {
            // console.log(response);
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Limpar = (event) => {
        // console.log("Limpar");

        event.preventDefault();
        
        form.find('input').each(function() {$(this).val("");});
        table.empty();
    }

    // $('[data-a]').on('click', function(event) {
    //     event.preventDefault();
    //     console.log(event);
    //     console.log(this);
    //     // var target = $(this).data('a');
    //     // $('main').load(`${target}.html`);
    // });
});








