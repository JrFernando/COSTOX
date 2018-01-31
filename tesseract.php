<?php
  require_once "vendor/autoload.php";

  use thiagoalessio\TesseractOCR\TesseractOCR;

  if(!file_exists(__DIR__ . "/resultTesseract")){
    mkdir(__DIR__ . "/resultTesseract");
  }

  if(isset($_POST['pathFile'])){
    //Obtem nome do arquivo com extensão
    $name = explode('/', $_POST['pathFile']);
    $name =  $name[1];

    //Retira a extensão
    $name = explode('.', $name);
    $name =  $name[0];

    //Adiciona pasta e .txt
    $name = "resultTesseract/" . $name . ".txt";

    echo $name;

    $file = fopen($name, "w");

    $result = (new TesseractOCR($_POST['pathFile']))
      ->lang("por", "eng")
      ->run();

    fwrite($file, $result);
    fclose($file);

    // echo "Arquivo salvo com sucesso!";
  }
