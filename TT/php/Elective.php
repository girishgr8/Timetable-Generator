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
    if(isset($_REQUEST['dept']) && isset($_REQUEST['year']) && isset($_REQUEST['div'])){
        $dept = $_REQUEST['dept'];
        $year = $_REQUEST['year'];
        $division = $_REQUEST['div'];
        $sql = "SELECT subjid, fid, room_no, weekday, start_time, end_time FROM electiveLectureSlot WHERE electiveLectureSlot.dept = '".$dept."' AND electiveLectureSlot.year_of_study = '".$year."' AND electiveLectureSlot.division = '".$division."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $string = "".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."\n";
                echo $string;
            }
        }
        $sql = "SELECT subjid, fid, room_no, weekday, start_time, end_time FROM electiveLabSlot WHERE electiveLabSlot.dept = '".$dept."' AND electiveLabSlot.year_of_study = '".$year."' AND electiveLabSlot.division = '".$division."'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $string = "".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."\n";
                echo $string;
            }
        }
    }

?>