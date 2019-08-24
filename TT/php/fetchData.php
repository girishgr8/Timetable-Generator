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
    $dept = ($_REQUEST['dept']);
    $year = ($_REQUEST['year']);
    $division = ($_REQUEST['div']);
    
    $sql = "SELECT subjid, fid, room_no, weekday, start_time, end_time FROM classlectureslot WHERE classlectureslot.dept = '".$dept."' AND classlectureslot.year_of_study = '".$year."' AND classlectureslot.division = '".$division."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $string = "".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."\n";
            echo $string;
        }
    }

    $sql = "SELECT bid, subjid, fid, room_no, weekday, start_time, end_time FROM batchLabSlot WHERE batchLabSlot.dept = '".$dept."' AND batchLabSlot.year_of_study = '".$year."' AND batchLabSlot.division = '".$division."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $string = "".$row["bid"]."/".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."/"."lab"."\n";
            echo $string;
        }
    }  

    $sql = "SELECT bid, subjid, fid, room_no, weekday, start_time, end_time FROM batchTutorialSlot WHERE batchTutorialSlot.dept = '".$dept."' AND batchTutorialSlot.year_of_study = '".$year."' AND batchTutorialSlot.division = '".$division."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $string = "".$row["bid"]."/".$row["subjid"]."/".$row["fid"]."/".$row["room_no"]."/".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."/"."tut"."\n";
            echo $string;
        }
    }  
}

else{
    echo 'query error';
}
?>