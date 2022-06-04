<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha = $data->{"fecha"};

    include("../conect.php");

    $sql ="select * from Ventas where Fecha='$fecha'";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $con->close();

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>