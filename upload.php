<?php
   if(isset($_FILES['fileUp'])){
    $imagem = $_FILES['fileUp'];
    $fileType = $imagem['type'];
    $nomeImagem = "tmp/" . $imagem['name'];

    move_uploaded_file($imagem["tmp_name"], $nomeImagem);

     // if($fileType == "image/png") $img = imagecreatefrompng($imagem['tmp_name']);
     // else $img = imagecreatefromjpeg($imagem['tmp_name']);

     //$imgX = imagesx($img);
     //$imgY = imagesy($img);
    //
    // if($imgX > 950){
    //   $x = 950;
    //   $y = ceil(($imgX / $imgY) * $x);
    // } else {
    //   $x = $imgX;
    //   $y = $imgY;
    // }
    //
    // $newImage = imagecreatetruecolor($x, $y);
    // imagecopyresampled($newImage, $img, 0, 0, 0, 0, $x, $y, $imgX, $imgY);
    //
    // if($fileType == "image/png") imagepng($newImage, $nomeImagem);
    // else imagejpeg($newImage, $nomeImagem);


    echo $nomeImagem;

  } else {
    echo "Erro";
  }
?>
