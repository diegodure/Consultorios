<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha1 = $data->{"fecha1"};
    $fecha2 = $data->{"fecha2"};

    include("../conect.php");

    $sql ="select Consultas.idConsulta, Consultas.Motivo, Resultado.Fecha, Resultado.Indicaciones from Resultado inner join Consultas on Resultado.Consultas_idConsulta=Consultas.idConsulta where Consultas.Fecha >= '$fecha1' and Consultas.Fecha <= '$fecha2'";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $sql2 = "select Consultas.idConsulta, Consultas.Fecha, Estados.idEstado, Estados.Nombre from Consultas inner join Estados on Consultas.Estados_idEstado=Estados.idEstado where Consultas.Fecha >= '$fecha1' and Consultas.Fecha <= '$fecha2'";

    $results2 = $con->query($sql2);


    $rawdata2 = array();

    $i2 = 0;

    while($row2 = mysqli_fetch_array($results2)){
        $rawdata2[$i2] = $row2;
        $i2++;

    }

    $con->close();

    array_push($rawdata, $rawdata2);

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>