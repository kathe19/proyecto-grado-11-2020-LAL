if ("usuario" in localStorage) {
    var USER = JSON.parse(localStorage.usuario);
    $('.nombre_usuario').html(USER.nombres)

    console.log(USER.nombres)

    var otro = USER.nombres;

    var otro2 = USER.apellidos;


    document.getElementById("nombre_apellido").innerHTML = otro + " " + otro2;

    


  } else {
  window.location.href='../../index.html'
    
    
  }