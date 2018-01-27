<?php

    if(!file_exists("tmp")){
      mkdir("tmp/");
    }

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

  } else if($_POST['fileUp']) {

    $splited = explode(',', substr($_POST['fileUp'], 5), 2);
    $mime = $splited[0];
    $data = $splited[1];

    if(isset($_POST['filePath'])) $pathFile = $_POST['filePath'];
    else {
      $mime_split = explode(";", $mime, 2);
      $mime_split = explode("/", $mime_split[0], 2);
      if(count($mime_split) == 2){
        $extension = $mime_split[1];

        if($extension == "jpeg") $extension = "jpg";
        $pathFile = "tmp/". md5(date("d/M/Y  H:i:s")) . "." . $extension;

      }
    }

    file_put_contents($pathFile, base64_decode($data));
    echo $pathFile;

  } else {
    echo "Erro";
  }
?>
