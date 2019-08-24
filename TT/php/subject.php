<?php
    $host="localhost";
    $port=3306;
    $user="root";
    $password="1234";
    $dbname="timetable";
    $conn = new mysqli($host, $user, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 


    if(isset($_REQUEST['subject']) && isset($_REQUEST['dept']) && isset($_REQUEST['year']) && isset($_REQUEST['division'])){
        $subject = ($_REQUEST['subject']);
        $dept = ($_REQUEST['dept']);
        $year = ($_REQUEST['year']);
        $division = ($_REQUEST['division']);
        $sql = "SELECT count(*) as totalLectures FROM classlectureslot WHERE classlectureslot.dept = '".$dept."' AND classlectureslot.year_of_study = '".$year."' AND classlectureslot.division = '".$division."' AND classlectureslot.subjid = '".$subject."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "".$row['totalLectures']."\n";
            }
        }
        for($x = 1; $x <=4; $x++) {
            $sql = "SELECT count(*) as practicals FROM batchlabslot WHERE batchlabslot.dept = '".$dept."' AND batchlabslot.year_of_study = '".$year."' AND batchlabslot.division = '".$division."' AND batchlabslot.subjid = '".$subject."' AND batchlabslot.bid=".$x;
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "".$row['practicals']." ";
                }
            }
        }
        echo "\n";
        for($x = 1; $x <=4; $x++) {
            $sql = "SELECT count(*) as tutorials FROM batchtutorialslot WHERE batchtutorialslot.dept = '".$dept."' AND batchtutorialslot.year_of_study = '".$year."' AND batchtutorialslot.division = '".$division."' AND batchtutorialslot.subjid = '".$subject."' AND batchtutorialslot.bid=".$x;
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "".$row['tutorials']." ";
                }
            }
        }    
    }
    else{
        echo 'query error';
    }
?>