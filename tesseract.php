<?php
  require_once "vendor/autoload.php";

  use thiagoalessio\TesseractOCR\TesseractOCR;

  // echo "<head><meta charset='utf-8'/></head>";

  if(!file_exists("resultTesseract")){
    mkdir("resultTesseract/");
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

    echo "Arquivo salvo com sucesso!";
  }
