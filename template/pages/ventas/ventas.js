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

              for (let i = 0; i < productosSeleccionados.length; i++) {
                const pro = productosSeleccionados[i].producto;

                if (idPro == pro.rowid) {

                  pro.cantidad = $(this).val();
                  pro.precio_total_prod = pro.precio * pro.cantidad;
                  
                  llenarListaProducto();
                  return
                  
                }
                
              }

            })

            function llenarListaProducto() {
            var totalpagar = 0;

              $('#listaProductosSeleccionados').html('')
              for (let i = 0; i < productosSeleccionados.length; i++) {
                const product = productosSeleccionados[i].producto;
                totalpagar = totalpagar + product.precio_total_prod;

                $('#tabla-ventas').show('fast');
                $('#total-pagar').show('fast');

                $('#listaProductosSeleccionados').append(
                  `
                  <tr>
                    <td> ${product.nombre}</td>
                    <td> ${product.precio}</td>
                    <td> <input type="number" min="1" id="cantidad-${product.rowid}" value="${product.cantidad}"></td>
                    <td> ${product.precio_total_prod}</td>
                    <td>\
                    <div class='btn-group'>\
                        <a data-codigo="${product.rowid}" id="borrar_producto" class='btn btn-sm'>\
                        <i class='fa fa-trash-alt'></i>\
                        </a>\
                    </div>\
                    </td>\
                  </tr>
                  `
                )

                $('#cambio1').on('change','input', function () {
                  vueltas =   $('#vueltas').val();
                  const cambioTotal = vueltas - totalpagar;
                  $('#total_cambio').html(cambioTotal)
              })

                $('#total-todo').html('$ '+totalpagar)

                
              }
            }


            var productosSeleccionados = [];
            

            $('#btn-agregar-prod').click(function () {
              const idp = parseInt($('#selectProductos option:selected').val());
              const prod = $('#selectProductos option:selected').data();
              prod.producto.cantidad = 1;
              prod.producto.precio_total_prod = prod.producto.precio;
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

            $('#tabla-ventas').on('click', '#borrar_producto',function () {
              const cod = $(this).data('codigo')

              let restante = [];

              for (let i = 0; i < productosSeleccionados.length; i++) {
                const prod = productosSeleccionados[i];

                if (prod.producto.rowid != cod) {
                  restante.push(prod);
                  
                }
                
              }

              productosSeleccionados = restante;
              llenarListaProducto()



            })

            $('#formcrear').submit(function () {
              
              var USER = JSON.parse(localStorage.usuario);
              var id = USER.rowid;

                const fecha = new Date().toLocaleString();
                $('#fecha').html(fecha)
                cambio =   $('#vueltas').val();
            
                sql = 'INSERT INTO ventas(usuario_id,fecha,pago)VALUES(?,?,?)';
                window.query(sql, [id,  fecha,cambio]).then(function (result) {
                  let codiventa = result.insertId;

                  for (let i = 0; i < productosSeleccionados.length; i++) {
                    const prod = productosSeleccionados[i].producto;

                    detalle_venta(prod.rowid,prod.cantidad, prod.precio)
                    
                  }
                  
                  function detalle_venta(prodId,prodCant, prodPrec) {
                    sql = 'INSERT INTO venta_detalle(venta_id,producto_id,cantidad,precio)VALUES(?,?,?,?)';
                    window.query(sql, [codiventa, prodId,prodCant,prodPrec]).then(function (result) {

                      console.log(result)
                    })
                  }

                  productosSeleccionados= []
                  $('#tabla-ventas').hide();
                  $('#total-pagar').hide();

                  toastr.success('Venta Creado')

                }, function (error) {
                    console.log('Dato ingresado', error);
                })
                event.preventDefault();
            
          })

           
    })
})