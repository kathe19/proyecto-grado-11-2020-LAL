window.crearBaseDatos();
$(document).ready(
    function () {

        var USER = JSON.parse(localStorage.usuario);
        $(function () {
            const nombres = USER.nombres;
            const apellidos = USER.apellidos;
            const sexo = USER.sexo;
            const fecha_nac = USER.fecha_nac;
            const documento = USER.documento;
            const tipo = USER.tipo;
            const usuario = USER.usuario;
            const password = USER.password;

            $('#inputnombreuser').val(nombres);
            $('#inputapellidosuser').val(apellidos);
            $('#inputsexouser').val(sexo);
            $('#inputfecha_nacuser').val(fecha_nac);
            $('#inputdocumentouser').val(documento);
            $('#inputtipouser').val(tipo);
            $('#inputusuariouser').val(usuario);
            $('#inputcontraseñauser').val(password);
        })
        
        $('#formEditarUser').submit(function () {

            const id = USER.rowid;
            a = $('#inputnombreuser').val();
            b = $('#inputapellidosuser').val();
            c = $('#inputsexouser').val();
            d = $('#inputfecha_nacuser').val();
            e = $('#inputdocumentouser').val();
            f = $('#inputtipouser').val();
            g = $('#inputusuariouser').val();
            h = $('#inputcontraseñauser').val();

            sql = 'UPDATE users SET nombres=?,apellidos=?,sexo=?,fecha_nac=?,documento=?,tipo=?,usuario=?,password=? WHERE rowid=? ';
            window.query(sql, [a, b, c, d, e, f,g,h,id]).then(function (result) {
            
            sql = 'SELECT *, rowid FROM users WHERE rowid=?';
            window.query(sql, [id]).then(function (result) {
               
            const usuario = result[0]
            localStorage.setItem('usuario', JSON.stringify(usuario));
    
            })

            toastr.success('User actualizado')
                
            }, function (error) {
                console.log('Dato ingresado', error);
            })
            event.preventDefault();
        }) 

    })