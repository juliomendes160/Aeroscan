$(document).ready(function() {

    var url = null;
    var method = null ;
    var data = null;

    // $(document).on('click', '[data-button=Listar]',(event)=>Requisitar(event, Listar));
    $(document).on('click', '[data-button=Listar]',(event)=>Listar(event));
    $(document).on('click', '[data-button=Salvar]', (event)=> Requisitar(event, Salvar));
    
    // const Requisitar = (event, callback) => {
    //     event.preventDefault();
    //     callback();
    //     return;
    //     console.log(url, method, data);

   
        // $.ajax({
        //     url: url,
        //     method: method,
        //     data: data,
        //     success: function(xhr, status, response) {
        //         console.log(response);
        //         callback(response);
        //     },
        //     error: function(xhr, status, error) {
        //         console.error(error);
        //     }
        // });
    // }

    const Requisitar = () => {
        console.log(url, method, data);
        
        return $.ajax({url: url,method: method,data: data});
        $.ajax({
            url: url,
            method: method,
            data: data,
            success: function(xhr, status, response) {
            //    Listar(null, response);
            console.log(xhr.status);
            console.log(response.status);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    
    }

    const Salvar = () => {
        url ='http://localhost:3000/usuario';
        method = 'POST';
        data = $('form').serialize();
        console.log("Salvar");
    }

    // const Listar = () => {
    //     url ='http://localhost:3000/usuario';
    //     method = 'GET';
    //     data = null;
    //     console.log("Listar");
    //     console.log(response);
    // }

    const Listar = (event) => {
            event.preventDefault();
            url ='http://localhost:3000/usuario';
            method = 'GET';
            data = null;
            console.log("Listar");
            Requisitar().done(function(a, b, c){
                console.log(a, b, c);
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








