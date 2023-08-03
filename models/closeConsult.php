<?php
  $data = json_decode(file_get_contents("php://input"));
  include("../conect.php");

  $idConsulta = $data->{"idConsulta"};
  $indicaciones = $data->{"indicaciones"};
  if(!empty($data->{"receta"})){
    $receta = $data->{"receta"};
  }else{
    $receta = "";
  }
  if(!empty($data->{"analisis"})){
    $analisis = $data->{"analisis"};
  }else{
    $analisis = "";
  }
  if(!empty($data->{"observacion"})){
    $observacion = $data->{"observacion"};
  }else{
    $observacion = "";
  }
  if(!empty($data->{"nextCosult"})){
    $nextCosult = $data->{"nextCosult"};
  }else{
    $nextCosult = "";
  }
  
  $sql = "insert into Resultado (Consultas_idConsulta, Fecha, Imagen, Observacion, Indicaciones, Receta, Analisis, Siguiente_Consulta) values ('$idConsulta', CURDATE(), '', '$observacion', '$indicaciones', '$receta', '$analisis', '$nextCosult')";

  $result = $con->query($sql);

  if(!$result){ 
    echo "error";
  }else{
    $sql2 = "update Consultas set Estados_idEstado='2', color='#2f6010' where idConsulta='$idConsulta'";
    $result2 = $con->query($sql2); 
    if(!$result){ 
      echo "error";
    }else{
      echo "Resultado guardado!";
    }
  }

  $con->close();
?>