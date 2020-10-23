window.crearBaseDatos();
$(document).ready(function () {
  $('#tabla-ventas').hide();
  $('#total-pagar').hide();

  
    sql = "SELECT * FROM clientes"
    window.query(sql).then(function (result) {
        var substringMatcher = function (strs) {
            return function findMatches(q, cb) {
              var matches, substringRegex;
              matches = [];
              substrRegex = new RegExp(q, "i");
              $.each(strs, function (i, str) {
                if (
                  substrRegex.test(str.nombres) ||
                  substrRegex.test(str.apellidos)
                ) {
                  matches.push(`${str.nombres} ${str.apellidos}`);
                }
              });
    
              cb(matches);
            };
          };
    
          $("#buscarNombre .typeahead").typeahead(
            {
              hint: true,
              highlight: true,
              minLength: 1,
            },
            {
              name: "nombres",
              source: substringMatcher(result),
            });

            //Llamamos a productos

            sql = "SELECT rowid, * FROM productos"
            window.query(sql).then(function (result) {
                for (let i = 0; i < result.length; i++) {
                    const prod = result[i];
                    const prodString = JSON.stringify(prod)
                    $("#selectProductos").append(
                    `<option data-producto='` + prodString + `' value=${prod.rowid}> ${prod.nombre} $${prod.precio}</option>`
                    );
                };
            });

            var total_pagar = 0;
            $('#listaProductosSeleccionados').on('change','input', function () {

              const idPro = parseInt($(this).attr('id').substring(9,10));
              console.log (idPro)

              for (let i = 0; i < productosSeleccionados.length; i++) {
                const pro = productosSeleccionados[i].producto;

                if (idPro == pro.rowid) {

                  pro.cantidad = $(this).val();
                  
                }
                
              }

            })

            function llenarListaProducto() {
              $('#listaProductosSeleccionados').html('')
              for (let i = 0; i < productosSeleccionados.length; i++) {
                const product = productosSeleccionados[i].producto;
                $('#tabla-ventas').show('fast');
                $('#total-pagar').show('fast');


                $('#listaProductosSeleccionados').append(
                  `
                  <tr>
                    <td> ${product.nombre}</td>
                    <td> ${product.precio}</td>
                    <td> <input type="number"  id="cantidad-${product.rowid}" value="${product.cantidad}"></td>
                    <td> ${product.precio}</td>
                    <td>\
                    <div class='btn-group'>\
                        <a href='#' class='btn  btn-sm editar'>\
                        <i class='fa fa-trash-alt'></i>\
                        </a>\
                    </div>\
                    </td>\
                  </tr>
                  `
                )

                $('#total-todo').append(
                  `
                  $${product.precio}
                  `
                )
              }
            }

            var productosSeleccionados = [];
            

            $('#btn-agregar-prod').click(function () {
              const idp = parseInt($('#selectProductos option:selected').val());
              const prod = $('#selectProductos option:selected').data();
              prod.producto.cantidad = 1;
              let encontrado = false;

              for (let i = 0; i < productosSeleccionados.length; i++) {
                const prod = productosSeleccionados[i].producto;
                
                if (prod.rowid == idp) {
                  encontrado = true;
                }
              }

              if (!encontrado) {
                productosSeleccionados.push(prod);
                llenarListaProducto()
              }
             
            })
            
            
    })
})