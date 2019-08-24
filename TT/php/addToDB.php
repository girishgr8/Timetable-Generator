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
    $cid =0;
    $sql = "SELECT slot_id as id from slot ORDER BY slot_id DESC LIMIT 1";
    $result = $conn->query($sql);
    if($result->num_rows > 0) 
        while($row = $result->fetch_assoc())
            $count = $row['id'];
    $slot_id = $count + 1;
    echo "slot_id = $slot_id\n";
    if(isset($_REQUEST['dept']) && isset($_REQUEST['year']) && isset($_REQUEST['div'])){
        $dept = ($_REQUEST['dept']);
        $year = ($_REQUEST['year']);
        $div = ($_REQUEST['div']);
        $sql = "SELECT cid from class where class.dept='$dept' AND class.year_of_study='$year' AND class.division='$div'";
        $result = $conn->query($sql);
        if($result->num_rows > 0) 
            while($row = $result->fetch_assoc())
                $cid = $row['cid'];
    }
    if(isset($_REQUEST['fid']) && isset($_REQUEST['subjid']) && isset($_REQUEST['room']) && isset($_REQUEST['day']) && isset($_REQUEST['start_time']) && isset($_REQUEST['end_time']) && isset($_REQUEST['flag'])) {
        $fid = ($_REQUEST['fid']);
        $subjid = ($_REQUEST['subjid']);
        $room = ($_REQUEST['room']);
        $day = ($_REQUEST['day']);
        $start = ($_REQUEST['start_time']);
        $end = ($_REQUEST['end_time']);
        $flag = ($_REQUEST['flag']);
        $bid = ($_REQUEST['bid']);
        if($flag=='lec' || $flag=='ac' || $flag=='ele-lec'|| $flag=='ele-lab' || $flag=='proj'){
            //echo "cid = $cid";
            //echo "In the $flag condition from php\n";
            $sql = "INSERT INTO slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
                    VALUES($slot_id, $cid, '$fid', '$subjid', '$room', '$day', '$start', '$end', '$flag')";
            $result = $conn->query($sql);    
            if($result==true)
                echo "Added $flag slot";
            else if($result==false)
                die();
            /*if($result==true)
                echo "Added the theory slot";
            else if($result==false)
                echo "Error occurred while inserting theory slot";*/
        }
        else if($flag=='lab' || $flag=='tut'){
            $sql = "INSERT INTO slot(slot_id, bid, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
                    VALUES($slot_id, $bid, $cid, '$fid', '$subjid', '$room', '$day', '$start', '$end', '$flag')";
            $result = $conn->query($sql);    
            if($result==false)
                die();
            /*if($result==true)
                echo "Added the practical slot";
            else if($result==false)
                echo "Error occurred while inserting practical slot";*/
        }
    }
    else
        echo 'Query error occured';
?>