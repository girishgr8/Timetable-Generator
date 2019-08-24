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

if(isset($_REQUEST['dept']) && empty($_REQUEST['fid'])){
    $dept = ($_REQUEST['dept']);
    $sql = "SELECT fid, fac_name FROM faculty WHERE faculty.dept = '".$dept."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "".$row["fid"].":".$row["fac_name"]."\n";
        }
    }
}

else if(isset($_REQUEST['fid']) && empty($_REQUEST['dept'])){
    $fid = ($_REQUEST['fid']);
    $sql = "SELECT weekday, start_time, end_time, class_dept, year_of_study, division, slotType FROM facultyassignedslot WHERE facultyassignedslot.fid = '".$fid."'" ;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "".$row["weekday"]."/".$row["start_time"]."/".$row["end_time"]."/".$row["year_of_study"]."/".$row["class_dept"]."/".$row["division"]."/".$row['slotType']."\n";
        }
    }
}


else{
    echo 'query error';
}
?>