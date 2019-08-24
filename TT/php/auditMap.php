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
        $sql = "SELECT count(*) as slots FROM auditSlot WHERE auditSlot.dept = '$dept' AND auditSlot.year_of_study = '$year' AND auditSlot.division = '$division' AND auditSlot.subjid = '$subject'";
        $result = $conn->query($sql);
        if($result->num_rows > 0) 
            while($row = $result->fetch_assoc()) 
                echo $row['slots'];        
    }
    else
        echo "Query error occured";
?>