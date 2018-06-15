var pathFile;

//AO CLICAR NO BOTÃO CROP
$('#btnCrop').click(function(e){

	showLoader();

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

	// Adicionado até aqui Haarengl
	var canvas = document.querySelector('canvas');

	//PROCESSAR COM TESSERACT
	var form = new FormData();
	form.append('pathFile', pathFile);

	$.ajax({
	  url: "tesseract.php",
	  data: form,
	  processData: false,
	  contentType: false,
	  type: 'POST',
	  success: function (data) {
			var result = JSON.parse(data);
			
			if (result['result']) {
				processText(result['result']);
			}

			hideStatus();
			hideDivCrop();
			showDivResult();
			hideLoader();
	  }
	});
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
  var div = $("#div_take");
  var localMediaStream = null;

  hideCards();
  div.fadeIn();

	var constraints = { video: { facingMode: "environment" } };
	navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
			video.srcObject = mediaStream;
			localMediaStream = mediaStream;
			video.onloadedmetadata = function(e){
				video.play();
			};
			localMediaStream.stop = function(){
		      this.getVideoTracks().forEach(function(track){
		        track.stop();
		      });
		    }
		})
		.catch (function(err){
			showMessageStatus("Please enable the camera.");
		});
		
	showMessageStatus("Take a good picture of a huge, printed text.");
	//CAPTURA A IMAGEM
	$('#btnTake').click(function(event){
	  if (localMediaStream) {
			var canvas = document.querySelector("#div_crop canvas");
			var img = document.querySelector("#img_crop");

		  var width = video.offsetWidth, height = video.offsetHeight;
		  var context = canvas.getContext("2d");
			var fxCanvas = fx.canvas();

		  canvas.width = width;
		  canvas.height = height;

		  context.drawImage(video, 0, 0, width, height);
			var texture = fxCanvas.texture(canvas);
			fxCanvas.draw(texture)
					.hueSaturation(-1, -1)//grayscale
					.unsharpMask(20, 2)
					.brightnessContrast(0.2, 0.9)
					.update();

			window.texture = texture;
			window.fxCanvas = fxCanvas;

			div.hide();
		  showImage(fxCanvas.toDataURL('image/png'));

		  //UPLOAD DA IMAGEM CAPTURADA
		  var form = new FormData();
		  form.append('fileUp', fxCanvas.toDataURL('image/png'));

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
	$('#cards').hide();
}

function showCards(){
	$('#cards').show();
}

function hideDivCrop() {
	$("#div_crop").hide();
}

function showDivCrop() {
	$("#div_crop").show();
}

function showDivResult(){
	$('#div_resultado').show();
}

function showImage(pathImage){
	showMessageStatus("Cut the image so the text is clearly visible.");
  $("#div_crop").show();

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
