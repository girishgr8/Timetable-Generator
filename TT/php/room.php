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

if(isset($_REQUEST['room'])){   
    $room = ($_REQUEST['room']);
    $sql = "SELECT dept, year_of_study, division, bid, flag, subjid, fid, weekday, start_time, end_time FROM roomAssignedSlot WHERE room_no ='" .$room."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "".$row["dept"]."/".$row["year_of_study"]."/".$row["division"]."/".$row["bid"]."/".$row["flag"]."/".$row["subjid"]."/".$row["fid"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."\n";
        }
    }
}

else{
    echo 'query error';
}
?>