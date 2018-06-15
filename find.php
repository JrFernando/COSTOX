<?php

  function parseValue($value, $type) {
    if (!$type) {
      return intval($value);
    } else if ($type == 1) {
      return doubleval($value);
    }

    return $value;
  }

  function findOnBD($str) {
    $manager = new MongoDB\Driver\Manager("mongodb://127.0.0.1:27017");
    $searchKey = ['cid'=>0, 'inchikey'=>2, 'smiles_canonical'=>2, 'name_preferred'=>2, 'compound_cid'=>0, 'smiles_isomeric'=>2, 'name_traditional'=>2, 'name'=>2];
    foreach($searchKey as $key => $type) {
      $filter = [$key => parseValue($str, $type)];
      $options = [
        'projection' => ['_id' => 0, 'cid' => 1, 'inchikey' => 1, 'smiles_canonical' => 1, 'name_preferred' => 1, 'compound_cid' => 1, 'smiles_isomeric' => 1, 'name_traditional' => 1, 'name' => 1, "molecular_formula" => 1, "molecular_weight" => 1, 'image_url' => 1, 'use_type' =>1],
      ];
      
      $query = new MongoDB\Driver\Query($filter, $options);
      $cursor = $manager->executeQuery('costox.compounds', $query)->toArray();
      
      if (count($cursor)) {
        return $cursor;
      }
    }

    return [];
  }
  
  if (isset($_POST['text'])) {
    $input = [];
    $lines = explode('\n', str_replace('\r', '\n', $_POST['text']));
    foreach ($lines as $line) {
      $result = findOnBD($line);
      if (count($result)) {
        die(json_encode(['result' => $result, 'input' => $lines]));
      }
    }

    die(json_encode(['input' => $lines]));
  }

  echo json_encode([]);
?>
