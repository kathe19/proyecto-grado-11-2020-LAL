window.crearBaseDatos();
$(document).ready(function () {
 
  $('#clientes').hide();
  $('#ventas').hide();
  $('#productos').hide();

  

  $('#abrir_ventas').click(
      function () {
          $('#ventas').show('fast');
          $('#clientes').hide();
          $('#productos').hide();
          $('#ventas_detalles').hide();
      })
  
  

  $('#abrir_productos').click(
        function () {
            $('#productos').show('fast');
            $('#clientes').hide();
            $('#ventas').hide();
            $('#ventas_detalles').hide();
        })


        $('#abrir_clientes').click(
          function () {
              $('#clientes').show('fast');
              $('#ventas').hide();
              $('#productos').hide();
            $('#ventas_detalles').hide();
          })


          sql = 'SELECT *, rowid FROM clientes';
        window.query(sql).then(function (result) {
            var items = result;
            for (let i = 0; i < items.length; i++) {
                const u = items[i];
                $('#clientes_datos').append(
                  "<tr>\
                    <td >"+ u['nombres'] + "</td>\
                    <td >"+ u['apellidos'] + "</td>\
                    <td >"+ u['sexo'] + "</td>\
                    <td >"+ u['documento'] +  "</td>\
                    <td >"+ u['acudiente'] + "</td>\
                    <td >"+ u['telefono'] + "</td>\
                  </tr>"
                );
            }
        }, function (error) {
            console.log('Dato ingresado', error);
        })


        sql = 'SELECT *, rowid FROM ventas';
        window.query(sql).then(function (result) {
            var items = result;
            for (let i = 0; i < items.length; i++) {
                const u = items[i];
                $('#ventas_datos').append(
                  "<tr>\
                    <td >"+ u['usuario_id'] + "</td>\
                    <td >"+ u['fecha'] + "</td>\
                    <td >"+ u['cliente_id'] +  "</td>\
                    <td >"+ u['descripcion'] + "</td>\
                    <td >"+ u['pago'] + "</td>\
                  </tr>"
                );
            }
        }, function (error) {
            console.log('Dato ingresado', error);
        })





        sql = 'SELECT *, rowid FROM productos';
  window.query(sql).then(function (result) {
      var items = result;
      for (let i = 0; i < items.length; i++) {
          const u = items[i];
          $('#productos_datos').append(
            "<tr>\
              <td >"+ u['nombre'] + "</td>\
              <td >"+ u['abreviatura'] + "</td>\
              <td >"+ u['precio'] + "</td>\
              <td >"+ u['costo'] +  "</td>\
              <td >"+ u['descripcion'] + "</td>\
              <td >"+ u['proveedor'] + "</td>\
              <td >"+ u['cell_proveedor'] + "</td>\
            </tr>"
          );
      }
  }, function (error) {
      console.log('Dato ingresado', error);
  })

  
})