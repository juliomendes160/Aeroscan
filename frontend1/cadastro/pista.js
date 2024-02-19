$(document).ready(function() {

    const form = $('form');
    const table = $('table');

    $(document).on('click', '[data-button=Pesquisar]',(event)=>Pesquisar(event));

    $(document).on('click', '[data-button=Salvar]', (event)=> Salvar(event));
    $(document).on('click', '[data-button=Listar]',(event)=>Listar(event));
    $(document).on('click', '[data-button=Consultar]',(event)=>Consultar(event));
    $(document).on('click', '[data-button=Atualizar]',(event)=>Atualizar(event));
    $(document).on('click', '[data-button=Excluir]',(event)=>Excluir(event));
    $(document).on('click', '[data-button=Limpar]',(event)=>Limpar(event));

    const Pesquisar = (event) => {

        console.log("Pesquisar");

        event.preventDefault();
        
        cep = form.find("#cep").val().replace('-','');
        url =`https://viacep.com.br/ws/${cep}/json/`;
        method = 'GET';
        
        regexCEP = /^[0-9]{8}$/;

        switch (true) {
            case !cep: {
                return alert("CEP obrigatório!");
            }
            case !regexCEP.test(cep):{
                return alert("CEP inválido");
            } 
        }
        
        $.ajax({url: url, method: method}).then(function(response, textStatus, xhr) {
            if (xhr.status === 200) {
               form.find('#cep').val(response.cep);
               form.find('#logradouro').val(response.logradouro);
               form.find('#complemento').val(response.complemento);
               form.find('#numero').val('');
               form.find('#bairro').val(response.bairro);
               form.find('#cidade').val(response.localidade);
               form.find('#estado').val(response.uf);
            }
        }).catch(function (error, textStatus, xhr){
            console.error(error);
        })
    }

    const Salvar = (event) => {
        console.log("Salvar");

        event.preventDefault();

        url ='http://localhost:3000/pista';
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
       
        url ='http://localhost:3000/pista';
        method = 'GET';

        $.ajax({url: url, method: method}).then((response, status, xhr) => {

            console.log(response);
            
            if(response){
                alert(response);
                return;
            }

            table.empty();

            var row = $('<tr>');
            row.append($('<td>').text('ID'));
            row.append($('<td>').text('Nome'));
            row.append($('<td>').text('Tamanho km'));
            row.append($('<td>').text('Boxes'));
            row.append($('<td>').text('Lugares'));
            table.append(row);

            response.forEach((response, index, array) => {
                var row = $('<tr>');
                row.append($('<td>').text(response._id));
                row.append($('<td>').text(response.nome));
                row.append($('<td>').text(response.tamanho));
                row.append($('<td>').text(response.boxes));
                row.append($('<td>').text(response.lugares));
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
        url =`http://localhost:3000/pista/${id}`;
        method = 'GET';

        if(!id){
            console.log('Id obrigatório!');
            alert('Id obrigatório!');
            return;
        }
        
        $.ajax({url: url, method: method}).then(function(response, status, xhr) {

            if(response.length==0){
                console.log(response);
                alert(response)
                return;
            }

            console.log(response);

            form.find("#nome").val(response.nome);
            form.find("#tamanho").val(response.tamanho);
            form.find("#boxes").val(response.boxes);
            form.find("#lugares").val(response.lugares);

            form.find("#cep").val(response.endereco.cep);
            form.find("#logradouro").val(response.endereco.logradouro);
            form.find("#complemento").val(response.endereco.complemento);
            form.find("#numero").val(response.endereco.numero);
            form.find("#bairro").val(response.endereco.bairro);
            form.find("#cidade").val(response.endereco.cidade);
            form.find("#estado").val(response.endereco.estado);

        }).catch(function (error, status, xhr){
            console.error(error);
            alert(error.responseJSON.message);
        })
    }

    const Atualizar = (event) => {
        console.log("Atualizar");

        event.preventDefault();
       
        id = form.find("#id").val();
        url =`http://localhost:3000/pista/${id}`;
        method = 'PUT';
        data = form.serialize();

        if(!id){
            console.log('Id obrigatório!');
            alert('Id obrigatório!');
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
        url =`http://localhost:3000/pista/${id}`;
        method = 'DELETE';

        if(!id){
            console.log('Id obrigatório!');
            alert('Id obrigatório!');
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