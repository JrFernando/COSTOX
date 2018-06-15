<?php
  require_once "vendor/autoload.php";

  use thiagoalessio\TesseractOCR\TesseractOCR;

  if(isset($_POST['pathFile'])){
    $result = (new TesseractOCR($_POST['pathFile']))
      ->lang("por", "eng")
      ->run();
    
    die(json_encode(['result' => $result, 'post'=>$_POST['pathFile']]));
  }

  die(json_encode(['result' => [], 'post'=>$_POST['pathFile']]));
