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
if(isset($_REQUEST['semester']) && isset($_REQUEST['dept'])){
    $sem = intval($_REQUEST['semester']);
    $dept = ($_REQUEST['dept']);
    $sql = "SELECT subj_dept_sem.subjid, subj_name FROM subject inner join subj_dept_sem ON subject.subjid=subj_dept_sem.subjid AND subj_dept_sem.dept = '".$dept."' AND subj_dept_sem.sem = ".$sem;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "".$row["subjid"].":".$row["subj_name"]."}";
        }
    }
}
else{
    echo 'query error';
}
?>