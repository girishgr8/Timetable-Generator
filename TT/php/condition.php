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
    if(isset($_REQUEST['subject']) && isset($_REQUEST['dept'])){
        $subject = ($_REQUEST['subject']);
        $dept = ($_REQUEST['dept']);
        $sql = "SELECT lec, lab, tut from subj_dept_sem where subj_dept_sem.subjid='".$subject."' AND subj_dept_sem.dept='".$dept."'";
        $result = $conn->query($sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc())
                echo "".$row["lec"]." ".$row["lab"]." ".$row["tut"];
        }
    }
    else
        echo 'query error';
?>