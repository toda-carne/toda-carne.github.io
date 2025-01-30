
<?php

$data = file_get_contents('php://input');
$obj = json_decode($data);

$file = $obj->{'file_name'};
//$file = "prueba_escribir_1.txt";
$cont = json_encode($obj->{'content'}, JSON_PRETTY_PRINT) . "\n";

file_put_contents($file, $cont, FILE_APPEND | LOCK_EX);

echo "YA SAALVE!<br>";

?>

