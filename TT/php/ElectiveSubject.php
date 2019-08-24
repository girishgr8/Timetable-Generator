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
    if(isset($_REQUEST['dept']) && isset($_REQUEST['year']) && isset($_REQUEST['division']) && isset($_REQUEST['subject'])){
        $dept = $_REQUEST['dept'];
        $year = $_REQUEST['year'];
        $division = $_REQUEST['division'];
        $subject = $_REQUEST['subject'];
        $sql = "SELECT count(*) as totalLectures FROM electivelectureslot WHERE electivelectureslot.dept = '".$dept."' AND electivelectureslot.year_of_study = '".$year."' AND electivelectureslot.division = '".$division."' AND electivelectureslot.subjid = '".$subject."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "".$row['totalLectures']."\n";
            }
        }
        $sql = "SELECT count(*) as totalLabs FROM electiveLabSlot WHERE electiveLabSlot.dept = '".$dept."' AND electiveLabSlot.year_of_study = '".$year."' AND electiveLabSlot.division = '".$division."' AND electiveLabSlot.subjid = '".$subject."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "".$row['totalLabs'];
            }
        }
    }
    else{
        echo "Query error occured";
    }
?>