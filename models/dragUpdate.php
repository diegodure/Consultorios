<?php
  $data = json_decode(file_get_contents("php://input"));
  include("../conect.php");

  $idConsulta = $data->{"idConsulta"};
  $fecha = $data->{"fecha"};
  if(!empty($data->{"fecha2"})){
    $fecha2 = $data->{"fecha2"};
  }else{
    $fecha2 = "";
  }

  $sql = "update Consultas set Fecha='$fecha', Fecha2='$fecha2' where idConsulta='$idConsulta'";
  $results = $con->query($sql);

  if(!$results){ 
    echo "error";
  }
  else{
    echo "Consulta modificada correctamente!";
  }

  $con->close();
?>