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
            alert(response.message);
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
            
            table.empty();

            if(response.message){
                console.log(response);
                alert(response.message)
                return;
            }

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
        }).catch((error) => {
            console.error(error);
        })
    }

    const Consultar = (event) => {
        console.log("Consultar");

        event.preventDefault();
        
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'GET';

        if(!id){
            console.log('Operação consultar: id obrigatório!');
            alert('Operação consultar: id obrigatório!');
            return;
        }
        
        $.ajax({url: url, method: method}).then(function(response, status, xhr) {

            if(response.message){
                alert(response.message)
                return;
            }else{
                console.log(response);
            }

            form.find("#nome").val(response.nome);
            form.find("#tipo").val(response.tipo);

        }).catch(function (error, status, xhr){
            console.error(error);
            alert(error.responseJSON.message);
        })
    }

    const Atualizar = (event) => {
        console.log("Atualizar");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'PUT';
        data = form.serialize();

        if(!id){
            console.log('Operação atualizar: id obrigatório!');
            alert('Operação atualizar: id obrigatório!');
            return;
        }
        
        $.ajax({url: url, method: method, data: data}).then((response, status, xhr) => {
            console.log(response);
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Excluir = (event) => {
        console.log("Excluir");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/usuario/${id}`;
        method = 'DELETE';

        if(!id){
            console.log('Operação excluir: id obrigatório!');
            alert('Operação excluir: id obrigatório!');
            return;
        }
        
        $.ajax({url: url, method: method}).then((response, status, xhr) => {
            console.log(response);
        }).catch((error, status, xhr) => {
            console.error(error);
        })
    }

    const Limpar = (event) => {
        console.log("Limpar");

        event.preventDefault();
        
        form.find('input').each(function() {$(this).val("");});
        table.empty();
    }
});








