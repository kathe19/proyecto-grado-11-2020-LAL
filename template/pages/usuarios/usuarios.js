window.crearBaseDatos();
$(document).ready(
    function () {
        $('#conten-crear').hide();
        $('#conten-editar').hide();

        $('table').on('click', '.eliminar', function () {

            const resp = confirm('¿Esta seguro que quiere elimnarlo?')
            if (resp) {
                const fila = $(this).closest('tr');
                const codi = fila.data('id');


                sql = 'DELETE FROM users WHERE rowid=?';

                window.query(sql, [codi]).then(function (result) {
                    fila.remove();
                    console.log('Eliminado correctamente');
                }, function (error) {
                    console.log('Error eliminando...', error);
                })

            }

        });


        sql = 'SELECT *, rowid FROM users';
        window.query(sql).then(function (result) {
            var items = result;
            for (let i = 0; i < items.length; i++) {
                const u = items[i];

                $('table tbody').append(
                    "<tr id='fila-"+ u['rowid'] + "'data-id='" + u['rowid'] + "' >\
                        <th>"+ u['rowid'] + "</th>\
                        <td class='td-nombre'>"+ u['nombres'] + "</td>\
                        <td class='td-sexo'>"+ u['sexo'] + "</td>\
                        <td class='td-fecha_nac'>"+ u['fecha_nac'] + "</td>\
                        <td class='td-tipo'>"+ u['tipo'] + "</td>\
                        <td class='td-documento'>"+ u['documento'] + "</td>\
                        <td class='td-usuario'>"+ u['usuario'] + "</td>\
                        <td>\
                            <div class='btn-group'>\
                                <a href='#' class='btn btn-danger btn-sm eliminar'>\
                                    <i class='fa fa-times'></i>\
                                </a>\
                                <a href='#' class='btn btn-info btn-sm editar'>\
                                    <i class='fa fa-pen'></i>\
                                </a>\
                            </div>\
                        </td>\
                    <tr>"
                );

            }
        }, function (error) {
            console.log('Dato ingresado', error);
        })

        var fila_editantdo = null;
        $('table').on('click','.editar',function () {
            var tr = $(this).closest('tr');
            fila_editantdo = tr;
            const id= tr.data('id');

            const nombre = tr.find('.td-nombre').text();
            const sexo = tr.find('.td-sexo').text();
            const tipo = tr.find('.td-tipo').text();
            const usuario = tr.find('.td-usuario').text();

            $('#inputnombreEdit').val(nombre);
            $('#inputsexoEdit').val(sexo);
            $('#inputtipoEdit').val(tipo);
            $('#inputusuarioEdit').val(usuario);

            $('#conten-editar').show('fast');
        })
        

        
        $('#formEditar').submit(function () {

            a = $('#inputnombreEdit').val();
            b = $('#inputapelldoEdit').val();
            c = $('#inputsexoEdit').val();
            d = $('#inputfecha_nacEdit').val();
            e = $('#inputtipoEdit').val();
            f = $('#inputdocumentoEdit').val();
            g = $('#inputusuarioEdit').val();
            
            sql = 'UPDATE users SET nombres=?, apellidos=?,sexo=?,fecha_nac=?, tipo=?, documento=?,usuario=? WHERE rowid=? ';

            window.query(sql, [a, b, c, d,e,f,g,fila_editantdo.data('id')]).then(function (result) {

                toastr.success('Usuario editado ')

                fila_editantdo.find('.td-nombre').text(a);
                fila_editantdo.find('.td-sexo').text(c);
                fila_editantdo.find('.td-fecha_nac').text(d);
                fila_editantdo.find('.td-tipo').text(e);
                fila_editantdo.find('.td-documento').text(f);
                fila_editantdo.find('.td-usuario').text(g);

                $('#conten-editar').hide();
                
            }, function (error) {
                console.log('Dato ingresado', error);
            })


            Event.preventDefault();
        }) 



        $('#btncancelEdit').click(
            function () {
                $('#conten-editar').hide();
            }
        )

        $('#btncrear').click(
            function () {
                $('#conten-crear').show('fast');
                $('#inputnombre').val('');
                $('#inputsexo').val('');
                $('#inputtipo').val('');
                $('#inputusuario').val('');
            }
        )
        $('#btncancel').click(
            function () {
                $('#conten-crear').hide();
                $('#btncrear').show();
            }
        )


        
        $('#formcrear').submit(function () {
            a = $('#inputnombre').val();
            b = $('#inputapellidos').val();
            c = $('#inputsexo').val();
            d = $('#inputfecha_nac').val();
            e = $('#inputtipo').val();
            f = $('#inputdocumento').val();
            g = $('#inputusuario').val();


            sql = 'INSERT INTO users(nombres,apellidos,sexo,fecha_nac,documento,tipo,usuario)VALUES(?,?,?,?,?,?,?)';

            window.query(sql, [a, b, c, d,e,f,g]).then(function (result) {

                toastr.success('Usuario creado ')

                console.log('Dato ingresado', result);

                $('table tbody').append(
                    "<tr id='fila-" + result.insertId + "'data-id='" + result.insertId + "'>\
                        <th>"+ result.insertId + "</th>\
                        <td class='td-nombre'>"+ a + "</td>\
                        <td class='td-sexo'>"+ c + "</td>\
                        <td class='td-fecha_nac'>"+ d + "</td>\
                        <td class='td-tipo'>"+ e + "</td>\
                        <td class='td-documento'>"+ f + "</td>\
                        <td class='td-usuario'>"+ g + "</td>\
                        <td>\
                            <div class='btn-group'>\
                                <a href='#' class='btn btn-danger btn-sm eliminar'>\
                                    <i class='fa fa-times'></i>\
                                </a>\
                                <a href='#' class='btn btn-info btn-sm editar'>\
                                    <i class='fa fa-pen'></i>\
                                </a>\
                            </div>\
                        </td>\
                    <tr>"
                );
                $('#conten-crear').hide();
            }, function (error) {
                console.log('Dato ingresado', error);
            })


            Event.preventDefault();
        })

    })