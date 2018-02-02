<?php
  require_once __DIR__ . '/util/simplexlsx.class.php';

  define("BD", "bd/COSMETICS_Inventory.xlsx");
  // define("BD", "bd/bd_debug.xlsx");

  if(isset($_POST['pathFile'])){
    $pathFile = $_POST['pathFile'];
    $resutados = NULL;

    //Abertura do arquivo retornado pelo Tesseract
    $file = fopen($pathFile, "r");

    // Obtém linha por linha do arquivo
    while(($string = fgets($file)) !== false){
      //Remove new line
      $string = trim(preg_replace("/\r|\n/", "", $string));
      if(strcasecmp($string, "") == 0){
        //Linha Vazia
      } else{

        //Função que busca a linha na base de dados
        $resp = findOnBD($string);

        //Se retornar um resulado válido é adicionado ao array de resultados
        if(! is_null($resp))
          $resutados[] = $resp;
      }
    }
    echo json_encode($resutados);
  } else {
    echo "Erro!";
  }


  function findOnBD(String $string){

    if($xlsx = SimpleXLSX::parse(BD)){
      foreach ($xlsx->rows() as $line) {
         if(strcasecmp($line[4], $string) == 0 || strcasecmp($line[5], $string) == 0){
           return $line;
         }
      }
    }
  }
