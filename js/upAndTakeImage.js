var pathFile;

//AO CLICAR NO BOTÃO CROP
$('#btnCrop').click(function(e){
// Adicionado Haarengl
		$.post( 'crop.php', {
		img:pathFile,
		x: $('#x').val(),
		y: $('#y').val(),
		w: $('#w').val(),
		h: $('#h').val()
		},
    function(){
      showImage(pathFile + "?" + Math.random());
      $(".jcrop-active").hide();
      $("#img_crop").css("display", "block");

    });
	  return false;

// Adicionado até aqui Haarengl
  // var canvas = document.querySelector('canvas');
  //
  // //PROCESSAR COM TESSERACT
  // var form = new FormData();
  // form.append('pathFile', pathFile);
  //
  // $.ajax({
  //   url: "tesseract.php",
  //   data: form,
  //   processData: false,
  //   contentType: false,
  //   type: 'POST',
  //   success: function (data) {
  //     console.log(data);
  //   }
  // });
});

//EFETUA O UPLOAD DA IMAGEM
$("#file_up").change(function(event) {
  var form = new FormData();
  form.append('fileUp', event.target.files[0]);

  $.ajax({
    url: "upload.php",
    data: form,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function (data) {
      pathFile = data;
      console.log(pathFile);

      hideCards();
      showImage(pathFile);
    }
  });
});

//HABILITA A CÂMERA
$('#div_take_picture').click(function(event){
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var div = document.querySelector("#div_take");
  var localMediaStream = null;

  hideCards();
  div.style = "display: block";

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  navigator.getUserMedia({video : true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;

    localMediaStream.stop = function(){
      this.getVideoTracks().forEach(function(track){
        track.stop();
      });
    }
  }, function(){
    alert("Erro ao acessar a câmera!")
  });

  //CAPTURA A IMAGEM
  $('#btnTake').click(function(event){
    if (localMediaStream) {
      var width = video.offsetWidth, height = video.offsetHeight;
      var context;

      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);
      //img.src = canvas.toDataURL('image/png');

      div.style = "display: none";
      showImage(canvas.toDataURL('image/png'));

      //UPLOAD DA IMAGEM CAPTURADA
      var form = new FormData();
      form.append('fileUp', canvas.toDataURL('image/png'));

      $.ajax({
        url: "upload.php",
        data: form,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
          pathFile = data;
          console.log(pathFile);
        }
      });

      localMediaStream.stop();
      video.src = "";
    }
  });
});


/** UTILIDADES **/

function reload(){
  window.location.reload();
};

function hideCards(){
  var cards = $('.card');
  cards[0].style = "display: none";
  cards[1].style = "display: none";
}

function showImage(pathImage){
  document.getElementById("div_crop").style = "display : block";

  var img = document.getElementById("img_crop");
  img.src = pathImage;
  $('#img_crop').Jcrop({
    // Adicionado Haarengl
    onChange: updateValuesCrop,
    onSelect: updateValuesCrop
  });
    // Adicionado até aqui Haarengl
}

// Adicionado Haarengl
function updateValuesCrop(c){
		//joga os valores dos pronto do jcrop nos labels
		$('#x').val(c.x);
		$('#y').val(c.y);
		$('#x2').val(c.x2);
		$('#y2').val(c.y2);
		$('#w').val(c.w);
		$('#h').val(c.h);
}
// Adicionado até aqui Haarengl
