<?php

  if(isset($_POST['pathFile'])){
    $pathFile = $_POST['pathFile'];

    $file = fopen($pathFile, "r");

    while(($string = fgets($file)) !== false){
        if(strcasecmp($string, "\n") == 0){
          //Linha Vazia
        } else{
          $resp = findOnBD($string);
          if(! is_null($resp))
            $resutados[$string] = $resp;
        }
    }
    var_dump($resutados);
  } else {
    echo "Erro!";
  }


function findOnBD($str){
  $file = fopen("COSMETICS_Inventory_curated.sdf", "r");
  $restult = "";

  while(($string = fgets($file)) !== false){
    if(strcasecmp($string, $str) == 0) {
      while(($buffer = fgets($file)) != false){
        if(strcasecmp($buffer, "M  END\n") == 0) return $restult;
        else $restult .= $buffer;
      }
      break;
    }
  }
}
