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
    if(isset($_REQUEST['dept']) && isset($_REQUEST['year']) && isset($_REQUEST['division'])){
        $dept = $_REQUEST['dept'];
        $year = $_REQUEST['year'];
        $division = $_REQUEST['division'];
        $sql = "SELECT subjid, fid, room_no, weekday, start_time, end_time FROM projectAssignedSlot WHERE projectAssignedSlot.dept = '$dept' AND projectAssignedSlot.year_of_study = '$year' AND projectAssignedSlot.division = '$division'";
        $result = $conn->query($sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $string = "".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."\n";
                echo $string;
            }
        }
    }
    else
        echo "Query error occured";
?>