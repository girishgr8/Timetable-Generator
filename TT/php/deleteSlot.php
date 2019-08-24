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
    $cid = 0;
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
    echo "cid = $cid";
    if(isset($_REQUEST['fid']) && isset($_REQUEST['subjid']) && isset($_REQUEST['room']) && isset($_REQUEST['day']) && isset($_REQUEST['start_time']) && isset($_REQUEST['end_time']) && isset($_REQUEST['flag'])){
    $fid = ($_REQUEST['fid']);
    $subjid = ($_REQUEST['subjid']);
    $room = ($_REQUEST['room']);
    $day = ($_REQUEST['day']);
    $input = strtotime($_REQUEST['start_time']);
    $start_time = date('h:i:s',$input);
    $input = strtotime($_REQUEST['end_time']);
    $end_time = date('h:i:s',$input);
    $flag = ($_REQUEST['flag']);
    $bid = ($_REQUEST['bid']);
    if($flag =='lab' || $flag=='tut'){
        $sql = "DELETE from slot WHERE cid= $cid AND bid = $bid AND weekday='$day' AND fid='$fid' AND subjid='$subjid' AND room_no='$room' AND flag='$flag' AND start_time='$start_time' AND end_time='$end_time'";    
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully deleted the slot\n";
        else
            echo "Slot not deleted\n";
    }
    if($flag == 'other'){
        $sql = "DELETE from slot WHERE cid= $cid AND slot.weekday='$day' AND fid='$fid' AND subjid='$subjid' AND room_no='$room' AND start_time='$start_time' AND end_time='$end_time'";
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully deleted the slot\n";
        else
            echo "Slot not deleted\n";
    }
    else{
        echo "Entered else block\n";
        $sql = "DELETE from slot WHERE cid= $cid AND slot.weekday='$day' AND fid='$fid' AND subjid='$subjid' AND room_no='$room' AND flag='$flag' AND start_time='$start_time' AND end_time='$end_time'";
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully deleted the slot\n";
        else
            echo "Slot not deleted\n";
    }
    }
?>