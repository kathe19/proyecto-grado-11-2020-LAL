$(function(){
  var includes = $('[data-include]');
  jQuery.each(includes, function(){
    
    var file = $(this).data('include') + '.html';
    $(this).load(file, function (params) {
      
      links = $(document).find('.nav-item a');
      
      links.each(function () {

        const ruta = $(this).attr('href');
        const actual = document.location.pathname;

        

        if (document.location.pathname == '/index.html') {
          $(this).attr('href', 'pages/' + $(this).attr('href'));
        }else{
          $(this).attr('href', '../' + $(this).attr('href'));
        }

      });

      

    });

      if ("usuario" in localStorage) {
        var USER = JSON.parse(localStorage.usuario);
        $('.nombre_usuario').html(USER.nombres)

        console.log(USER.nombres)

        


      } else {
      window.location.href='../../index.html'
        
        
      }
     
     



  });
});