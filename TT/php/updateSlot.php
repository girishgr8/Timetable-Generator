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
    if((isset($_REQUEST['fid1']) && isset($_REQUEST['subjid1']) && isset($_REQUEST['room1']) && isset($_REQUEST['day1']) && isset($_REQUEST['start1']) && isset($_REQUEST['end1']) && isset($_REQUEST['flag1'])) && (isset($_REQUEST['fid2']) && isset($_REQUEST['subjid2']) && isset($_REQUEST['room2']) && isset($_REQUEST['day2']) && isset($_REQUEST['start2']) && isset($_REQUEST['end2']) && isset($_REQUEST['flag2']))){
    $fid1 = ($_REQUEST['fid1']);
    $subjid1 = ($_REQUEST['subjid1']);
    $room1 = ($_REQUEST['room1']);
    $day1 = ($_REQUEST['day1']);
    $input = strtotime($_REQUEST['start1']);
    $start_time1 = date('h:i:s',$input);
    $input = strtotime($_REQUEST['end1']);
    $end_time1 = date('h:i:s',$input);
    $flag1 = ($_REQUEST['flag1']);
    $bid1 = ($_REQUEST['bid1']);

    $fid2 = ($_REQUEST['fid2']);
    $subjid2 = ($_REQUEST['subjid2']);
    $room2 = ($_REQUEST['room2']);
    $day2 = ($_REQUEST['day2']);
    $input = strtotime($_REQUEST['start2']);
    $start_time2 = date('h:i:s',$input);
    $input = strtotime($_REQUEST['end2']);
    $end_time2 = date('h:i:s',$input);
    $flag2 = ($_REQUEST['flag2']);
    $bid2 = ($_REQUEST['bid2']);
    if($flag1 =='lab' || $flag1 =='tut'){
        $sql = "DELETE from slot WHERE cid= $cid AND bid = $bid AND weekday='$day' AND fid='$fid' AND subjid='$subjid' AND room_no='$room' AND flag='$flag' AND start_time='$start_time' AND end_time='$end_time'";    
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully updated the slot\n";
        else
            echo "Slot not updated\n";
    }
    if($flag == 'other'){
        $sql = "DELETE from slot WHERE cid= $cid AND slot.weekday='$day' AND fid='$fid' AND subjid='$subjid' AND room_no='$room' AND start_time='$start_time' AND end_time='$end_time'";
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully updated the slot\n";
        else
            echo "Slot not updated\n";
    }
    else{
        echo "Entered else block\n";
        $sql = "UPDATE slot 
        SET fid='$fid2' subjid='$subjid2' AND room_no='$room2' AND slot.weekday='$day2' AND flag='$flag2' AND AND start_time='$start_time2' AND end_time='$end_time2'
        WHERE cid= $cid AND slot.weekday='$day1' AND fid='$fid1' AND subjid='$subjid1' AND room_no='$room1' AND flag='$flag1' AND start_time='$start_time1' AND end_time='$end_time1'";
        $result = $conn->query($sql);
        if($result===true)
            echo "Successfully updated the slot\n";
        else
            echo "Slot not updated\n";
    }
    }
?>