<?php

   if(isset($_FILES['fileUp'])){

    $imagem = $_FILES['fileUp'];

    echo $imagem['name'];

    if(! preg_match("/^image\/(pjpeg|jpeg|png|gif|bmp)$/", $imagem['type'], $ext)){
      echo "Erro";
    }

    echo "<br><br>";
    var_dump($ext);

    $nomeImagem = "tmp/teste." . $ext[1];

    move_uploaded_file($imagem["tmp_name"], $nomeImagem);

    header("Location: costox.html");

  } else {
    echo "Vazio";
  }



?>
