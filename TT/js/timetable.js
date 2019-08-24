var brnName ,sem, subjName, slot, facName, batchNo, tutHrs, roomNo, dvYr, flag, newslot;
var halfFilledFacultySlots = new Map();
var halfFilledRoomSlots = new Map();
var upper = [], lower = [], upperRoom = [], lowerRoom = [];
var conditionMap = new Map();
var assignedMap = new Map();
var facBusySlotIds = [];
var roomBusySlotIds = [];
var IDset = new Set();
var newlyAddedSlotIds = new Set();
var practicalSlots = new Map();
var tutorialSlotIds = new Set();
var auditMap = new Map();
var electiveMap = new Map();
var projectMap =  new Map();

// Function that adds the year and divisions to list on basis of department...
function putDeptName(dept){
    if(dept=='SSH'){
        var i =0;
        for(i=0;i<10;i++)
            document.getElementById('divYear').options[i+1] = new Option('FY '+String.fromCharCode(i+65));
    }
    else if(dept!='SSH'){
        document.getElementById('divYear').options[1] = new Option('SY '+dept+' A');
        document.getElementById('divYear').options[2] = new Option('SY '+dept+' B');
        document.getElementById('divYear').options[3] = new Option('TY '+dept+' A');
        document.getElementById('divYear').options[4] = new Option('TY '+dept+' B');
        document.getElementById('divYear').options[5] = new Option('LY '+dept+' A');
        document.getElementById('divYear').options[6] = new Option('LY '+dept+' B');   
    }
}


function getIdAfter(day){
    if(day=='two')
        return 'one';
    if(day=='three')
        return 'two';
    if(day=='four')
        return 'three';
    if(day=='five')
        return 'four';
    if(day=='six')
        return 'five';
    if(day=='seven')
        return 'six';
}

// Putting already assigned slots of a division on GUI...
function putDivisionAssignedSlot(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/fetchData.php';
    var params = "dept="+brnName.toString()+"&year="+document.getElementById('divYear').options[document.getElementById('divYear').selectedIndex].text.toString().split(' ')[0].toString()+"&div="+document.getElementById('divYear').options[document.getElementById('divYear').selectedIndex].text.toString().split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = xhr.responseText; 
            var row = resp.split('\n');
            console.log('row =',row);
            for(var k=0;k<row.length;k++){
                my_slot = row[k].toString().split('/');
                // Length of the returned data will be six if its a lecture slot...
                if(my_slot.length==6){
                    var id = '';
                    id+=findDay(my_slot[3])+'-';
                    id+=findSlot(my_slot[4], my_slot[5]);
                    document.getElementById(id).innerHTML += '<td>'+my_slot[0]+'</td>'+'  <td>'+my_slot[1]+'</td>'+'  <td>'+my_slot[2]+'</td>';
                    document.getElementById(id).removeEventListener('dblclick',putSlot);
                }

                // Length of the returned data will be eight if its a lab slot...
                else if(my_slot.length==8 && my_slot[7]=='lab'){   
                    var id = '';
                    id+=findDay(my_slot[4])+'-';
                    id+=findSlot(my_slot[5], my_slot[6]);
                    if(IDset.has(id+'-'+my_slot[0])){
                        document.getElementById(id+'-'+my_slot[0]).innerHTML+= '<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3]; document.getElementById(id+'-'+my_slot[0]).removeEventListener('dblclick', putSlot);
                    }else{
                        sl = id.split('-');
                        var t = document.getElementById(sl[0]+'-'+sl[2]);
                        IDset.delete(sl[0]+'-'+sl[2]);
                        t.remove();
                        document.getElementById(sl[0]+'-'+sl[1]).setAttribute('rowspan',2);
                        document.getElementById(sl[0]+'-'+sl[1]).id = id;
                        IDset.delete(sl[0]+'-'+sl[1]);
                        IDset.add(id);
                        var div = dvYr.split(' ')[2];
                        document.getElementById(id).innerHTML+= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-1' height="100%">${div+'1'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-2' height="100%">${div+'2'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-3' height="100%">${div+'3'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-4' height="100%">${div+'4'}</td></tr></table>`;   
                        for(var j=1;j<=4;j++){
                            document.getElementById(id+'-'+j).addEventListener('dblclick',putSlot);
                            IDset.add(id+'-'+j);
                        }
                        document.getElementById(id+'-'+my_slot[0]).innerHTML+='<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3]; document.getElementById(id+'-'+my_slot[0]).removeEventListener('dblclick', putSlot); 
                    }           
                }
                
                else if(my_slot.length==8 && my_slot[7]=='tut'){     
                    var id = '';
                    id+=findDay(my_slot[4])+'-';
                    id+= findSlot(my_slot[5], my_slot[6]);
                    sl = id.split('-');
                    // If the returned id has length 3 means its a two hour tutorial slot...
                    if(sl.length==3){
                        twoHoursTutorial(my_slot, id);
                    }
                    if(sl.length==2){
                        oneHourTutorial(my_slot, id);
                    }
                }
            }   
        }
    }
    xhr.send();
    if(dvYr.split(' ')[0]=='LY'){
        putProjectSlots();
        putElectiveSlots();
    }
    putAuditSlots();
}

function putElectiveSlots(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/Elective.php';
    var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = this.responseText;
            var row = resp.split('\n');
            console.log('row = ',row);
            for(var i=0;i<row.length-1;i++){
                var my_slot = row[i].split('/');
                var id = '';
                id+=findDay(my_slot[3])+'-';
                id+=findSlot(my_slot[4], my_slot[5]);                
                if(id.split('-').length==2){
                    document.getElementById(id).innerText+= `${my_slot[0]} ${my_slot[1]} ${my_slot[2]}|`;
                    document.getElementById(id).addEventListener('dblclick', putSlot);
                }
                else if(id.split('-').length==3){
                    if(IDset.has(id))
                        document.getElementById(id).innerText+= `${my_slot[0]} ${my_slot[1]} ${my_slot[2]}|`;
                    else{    
                        sl = id.split('-');
                        var t = document.getElementById(sl[0]+'-'+sl[2]);
                        IDset.delete(sl[0]+'-'+sl[2]);
                        t.remove();
                        document.getElementById(sl[0]+'-'+sl[1]).setAttribute('rowspan',2);
                        document.getElementById(sl[0]+'-'+sl[1]).id = id;
                        IDset.delete(sl[0]+'-'+sl[1]);
                        IDset.add(id);
                        console.log('adding eventlistener on id = ',id);
                        document.getElementById(id).addEventListener('dblclick', putSlot);
                        document.getElementById(id).innerText+= `${my_slot[0]} ${my_slot[1]} ${my_slot[2]}|`;
                    }
                }
            }
        }
    }
    xhr.send();
}



function putAuditSlots(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/Audit.php';
    var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = this.responseText;
            var row = resp.split('\n');
            for(var i=0;i<row.length-1;i++){
                var my_slot = row[i].split('/');
                var id = '';
                id+=findDay(my_slot[3])+'-';
                id+=findSlot(my_slot[4], my_slot[5]);                
                if(id.split('-').length==2)
                    document.getElementById(id).innerText+= `${my_slot[0]} ${my_slot[1]} ${my_slot[2]}|`;
                
                else if(id.split('-').length==3){
                    sl = id.split('-');
                    var t = document.getElementById(sl[0]+'-'+sl[2]);
                    IDset.delete(sl[0]+'-'+sl[2]);
                    t.remove();
                    document.getElementById(sl[0]+'-'+sl[1]).setAttribute('rowspan',2);
                    document.getElementById(sl[0]+'-'+sl[1]).id = id;
                    IDset.delete(sl[0]+'-'+sl[1]);
                    IDset.add(id);
                    document.getElementById(id).innerText+= `${my_slot[0]} ${my_slot[1]} ${my_slot[2]}|`;
                }
            }
        }
    }
    xhr.send();
}

function putProjectSlots(){
    console.log('entered putProjectSlots');
    console.log('dvYr = ',dvYr);
    var xhr = new XMLHttpRequest();      
    var url = 'php/Project.php';
    var params = "dept="+brnName.toString()+"&year="+dvYr.split(' ')[0].toString()+"&division="+dvYr.split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = this.responseText;
            var row = resp.split('\n');
            console.log('row = ',row);
            for(var i=0;i<row.length-1;i++){
                var my_slot = row[i].split('/');
                var f = '';
                if(my_slot[1]=='')
                    f = '_';
                else
                    f = my_slot[1];
                var id = '';
                id+=findDay(my_slot[3])+'-';
                id+=findSlot(my_slot[4], my_slot[5]);                
                console.log('id = ',id);
                if(id.split('-').length==2){
                    document.getElementById(id).innerHTML+= `${my_slot[0]}    ${my_slot[2]}    ${f}`;
                    document.getElementById(id).removeEventListener('dblclick', putSlot);
                }
                else if(id.split('-').length==3){
                    sl = id.split('-');
                    var t = document.getElementById(sl[0]+'-'+sl[2]);
                    IDset.delete(sl[0]+'-'+sl[2]);
                    t.remove();
                    document.getElementById(sl[0]+'-'+sl[1]).setAttribute('rowspan',2);
                    document.getElementById(sl[0]+'-'+sl[1]).id = id;
                    IDset.delete(sl[0]+'-'+sl[1]);
                    IDset.add(id);
                    document.getElementById(id).innerHTML+=`${my_slot[0]}  ${my_slot[2]}  ${f}`;
                    document.getElementById(id).removeEventListener('dblclick', putSlot);
                }
            }
        }
    }
    xhr.send();
}

// remove faculty-busy slot...
function removefacultyAssignedSlot(){
    var up = halfFilledFacultySlots.get('upper');
    var low = halfFilledFacultySlots.get('lower');
    for(var i=0;i<facBusySlotIds.length;i++){
        // If it is not the newly added slot then restore the background color as white....
        if(!newlyAddedSlotIds.has(facBusySlotIds[i])){
            if(roomBusySlotIds.includes(facBusySlotIds[i])){
                if(up!=null && up.includes(facBusySlotIds[i]))
                    document.getElementById(facBusySlotIds[i]).style.background = 'linear-gradient(to bottom, red 50%, white 50%)';
                else if(low!= null && low.includes(facBusySlotIds[i]))
                    document.getElementById(facBusySlotIds[i]).style.background = 'linear-gradient(to bottom, white 50%, red 50%)';
                else
                document.getElementById(facBusySlotIds[i]).style.background = 'red';                        
            }
            else
                document.getElementById(facBusySlotIds[i]).style.background = 'white';
        }
        // If it is the newly added slot then restore the background color as cyan....
        else
            document.getElementById(facBusySlotIds[i]).style.background = 'cyan';
    }
    // Empty the faculty busy slots as there is change of faculty....
    facBusySlotIds  = [];
    upper = [];
    lower = [];
}

function getNextId(day,s){
    if(s=='one')
        return (day+'-'+'two-three').toString();
    else if(s=='four')
        return (day+'-'+'five-six').toString();
    else if(s=='five')
        return (day+'-'+'six-seven').toString();
}

// Showing room busy slots on the GUI.... 
function putRoomBusySlot(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/room.php';
    var resp;
    var params = "room="+roomNo;
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            resp = xhr.responseText; 
            var row = resp.split('\n');
            for(var i=0;i<row.length-1;i++){
                my_slot = row[i].toString().split('/');
                if(my_slot[4]=='ac'  && (dvYr.split(' ')[0] == 'TY' || dvYr.split(' ')[0] == 'SY'))
                    continue;
                if(my_slot[1]+' '+my_slot[0]+' '+my_slot[2] == dvYr)
                    continue;
                var id = findDay(my_slot[7])+'-';
                id+=findSlot(my_slot[8], my_slot[9]);  
                // Length of the id will be three if the slot is lab/tut slot.....
                if(id.split('-').length==3){
                    if(IDset.has(id)){
                        if(facBusySlotIds.includes(id))
                            document.getElementById(id).style.background = 'orange';   
                        else
                            document.getElementById(id).style.background = 'red';
                        roomBusySlotIds.push(id);
                        continue;
                    }
                    var id1 = id.split('-')[0]+'-'+id.split('-')[1];
                    console.log('id1 = '+id1);
                    var id2 = id.split('-')[0]+'-'+id.split('-')[2];
                    console.log('id2 = '+id2);
                    if(IDset.has(id1) && !IDset.has(id2)){
                        roomBusySlotIds.push(id1);
                        if(facBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'orange';
                        else
                            document.getElementById(id1).style.background = 'red';
                        id2 = getNextId(id.split('-')[0],id.split('-')[1]);
                        upperRoom.push(id2);
                        halfFilledRoomSlots.set('upper',upperRoom);
                        roomBusySlotIds.push(id2);
                        if(facBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'linear-gradient(to bottom, orange 50%, white 50%)';
                        else    
                            document.getElementById(id2).style.background = 'linear-gradient(to bottom, red 50%, white 50%)';
                    }
                    else if(!IDset.has(id1) && IDset.has(id2)){
                        id1 = id1.split('-')[0]+'-'+getPreviousSlot(id1.split('-')[1])+id1.split('-')[1];
                        roomBusySlotIds.push(id1);
                        lowerRoom.push(id1);
                        halfFilledRoomSlots.set('lower',lowerRoom);
                        if(facBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'linear-gradient(to bottom, white 50%, orange 50%)';
                        else
                            document.getElementById(id1).style.background = 'linear-gradient(to bottom, white 50%, red 50%)';
                        
                        if(facBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'orange';
                        else
                            document.getElementById(id2).style.background = 'red';
                        roomBusySlotIds.push(id2);
                    }
                    else if(IDset.has(id1) && IDset.has(id2)){
                        if(facBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'orange';
                        else
                            document.getElementById(id1).style.background = 'red';
                        if(facBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'orange';
                        else
                            document.getElementById(id2).style.background = 'red';
                        roomBusySlotIds.push(id1);
                        roomBusySlotIds.push(id2);
                    }
                }
                else if(id.split('-').length==2){
                    console.log(id);
                    var next_id = id+'-'+getNextSlot(id.split('-')[1]);
                    console.log('next_id = ',next_id);
                    prev_id = id.split('-')[0]+'-'+getPreviousSlot(id.split('-')[1])+'-'+id.split('-')[1];
                    if(IDset.has(id)){
                        roomBusySlotIds.push(id);
                        if(facBusySlotIds.includes(id))
                            document.getElementById(id).style.background='orange';
                        else
                            document.getElementById(id).style.background = 'red';
                        continue;
                    }
                    else if(IDset.has(next_id)){
                        roomBusySlotIds.push(next_id);
                        upperRoom.push(next_id);
                        halfFilledRoomSlots.set('upper',upperRoom);
                        if(facBusySlotIds.includes(next_id))
                            document.getElementById(next_id).style.background= 'linear-gradient(to bottom, orange 50%, white 50%)';
                        else
                            document.getElementById(next_id).style.background = 'linear-gradient(to bottom, red 50%, white 50%)';
                    }
                    else if(IDset.has(prev_id)){
                        roomBusySlotIds.push(prev_id);
                        lowerRoom.push(prev_id);
                        halfFilledRoomSlots.set('lower',lowerRoom);
                        if(facBusySlotIds.includes(prev_id))
                            document.getElementById(prev_id).style.background= 'linear-gradient(to bottom, white 50%, orange 50%)';
                        else
                            document.getElementById(prev_id).style.background = 'linear-gradient(to bottom , white 50%, red 50%)';
                    } 
                }
            }
        }
    }
    xhr.send();
}

function removeRoomAssignedSlot(){
    var up = halfFilledRoomSlots.get('upper');
    var low = halfFilledRoomSlots.get('lower');
    for(var i=0;i<roomBusySlotIds.length;i++){
        // If it is not the newly added slot then restore the background color as white....
        if(!newlyAddedSlotIds.has(roomBusySlotIds[i])){
            if(facBusySlotIds.includes(roomBusySlotIds[i])){
                if(up!=null && up.includes(roomBusySlotIds[i]))
                    document.getElementById(roomBusySlotIds[i]).style.background = 'linear-gradient(to bottom, yellow 50%, white 50%)';
                else if(low!= null && low.includes(roomBusySlotIds[i]))
                    document.getElementById(roomBusySlotIds[i]).style.background = 'linear-gradient(to bottom, white 50%, yellow 50%)';
                else
                    document.getElementById(roomBusySlotIds[i]).style.background = 'yellow';                        
            }
            else
                document.getElementById(roomBusySlotIds[i]).style.background = 'white';
        }
        // If it is the newly added slot then restore the background color as cyan....
        else
            document.getElementById(roomBusySlotIds[i]).style.background = 'cyan'
    }
    // Empty the faculty busy slots as there is change of faculty....
    roomBusySlotIds  = []
    upperRoom = [];
    lowerRoom = [];
    
}


// Showing faculty busy slots on the GUI.... 
function putfacultyAssignedSlot(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/faculty.php';
    var resp;
    var params = "dept=0"+"&fid="+facName.split(':')[0].toString();
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            resp = xhr.responseText; 
            var row = resp.split('\n');
            for(var i=0;i<row.length-1;i++){
                my_slot = row[i].toString().split('/');
                // If the received slot is of current division then skip it for marking slot busy of faculty....
                if(my_slot[3]+' '+my_slot[4]+' '+my_slot[5] == dvYr)
                    continue;    
                var id =findDay(my_slot[0])+'-';
                id+=findSlot(my_slot[1], my_slot[2]);  
                if(my_slot[6]=='ac' && (dvYr.split(' ')[0] == 'TY' || dvYr.split(' ')[0] == 'SY'))
                    continue;
                // length of the id will be three if the slot is lab/tut slot.....
                if(id.split('-').length==3){
                    if(IDset.has(id)){
                        if(roomBusySlotIds.includes(id))
                            document.getElementById(id).style.background = 'orange';
                        else
                            document.getElementById(id).style.background = 'yellow';
                        facBusySlotIds.push(id);
                        continue;
                    }
                    var id1 = id.split('-')[0]+'-'+id.split('-')[1];
                    //console.log('id1 = '+id1);
                    var id2 = id.split('-')[0]+'-'+id.split('-')[2];
                    //console.log('id2 = '+id2);
                    if(IDset.has(id1) && !IDset.has(id2)){
                        facBusySlotIds.push(id1);
                        if(roomBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'orange';
                        else
                            document.getElementById(id1).style.background = 'yellow';
                        id2 = getNextId(id.split('-')[0],id.split('-')[1]);
                        facBusySlotIds.push(id2);
                        upper.push(id2);
                        halfFilledFacultySlots.set('upper',upper);
                        if(roomBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'linear-gradient(to bottom, orange 50%, white 50%)';
                        else
                            document.getElementById(id2).style.background = 'linear-gradient(to bottom, yellow 50%, white 50%)';
                    }
                    else if(!IDset.has(id1) && IDset.has(id2)){
                        id1 = id1.split('-')[0]+'-'+getPreviousSlot(id1.split('-')[1])+'-'+id1.split('-')[1];
                        facBusySlotIds.push(id1);
                        lower.push(id1);
                        halfFilledFacultySlots.set('lower',lower);
                        if(roomBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'linear-gradient(to bottom, white 50%, orange 50%)';
                        else
                            document.getElementById(id1).style.background = 'linear-gradient(to bottom, white 50%, yellow 50%)';
                        facBusySlotIds.push(id2);
                        if(roomBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'orange';
                        else
                            document.getElementById(id2).style.background = 'yellow';
                        
                    }
                    else if(IDset.has(id1) && IDset.has(id2)){
                        facBusySlotIds.push(id1);
                        facBusySlotIds.push(id2);
                        if(roomBusySlotIds.includes(id1))
                            document.getElementById(id1).style.background = 'orange';
                        else
                            document.getElementById(id1).style.background = 'yellow';
                        if(roomBusySlotIds.includes(id2))
                            document.getElementById(id2).style.background = 'orange';
                        else
                            document.getElementById(id2).style.background = 'yellow';
                    } 
                }
                else if(id.split('-').length==2){
                    var next_id = id+'-'+getNextSlot(id.split('-')[1]);
                    prev_id = id.split('-')[0]+'-'+getPreviousSlot(id.split('-')[1])+'-'+id.split('-')[1];
                    if(IDset.has(id)){
                          facBusySlotIds.push(id);
                          if(roomBusySlotIds.includes(id))
                            document.getElementById(id).style.background='orange';
                          else
                            document.getElementById(id).style.background = 'yellow';
                        continue;
                    }
                    else if(IDset.has(next_id)){
                        facBusySlotIds.push(next_id);
                        upper.push(next_id);
                        halfFilledFacultySlots.set('upper',upper);
                        if(roomBusySlotIds.includes(next_id))
                            document.getElementById(next_id).style.background= 'linear-gradient(to bottom, orange 50%, white 50%)';
                        else
                            document.getElementById(next_id).style.background = 'linear-gradient(to bottom, yellow 50%, white 50%)';
                    }
                    else if(IDset.has(prev_id)){
                        facBusySlotIds.push(prev_id);
                        lower.push(prev_id);
                        halfFilledFacultySlots.set('lower',lower);
                        if(roomBusySlotIds.includes(prev_id))
                            document.getElementById(prev_id).style.background= 'linear-gradient(to bottom, white 50%, orange 50%)';
                        else
                            document.getElementById(prev_id).style.background = 'linear-gradient(to bottom , white 50%, yellow 50%)';
                    }  
                }
            }
        }
    }
    xhr.send();
}

// function for getting part of id(day) of the cell based on data...
function findDay(day){
    switch(day){
        case 'Monday': return 'mon';
        case 'Tuesday': return 'tue';
        case 'Wednesday': return 'wed';
        case 'Thursday': return 'thu';
        case 'Friday': return 'fri';
        default: return '';
    }
}

// function for getting part of id(slot_time) of the cell based on data...
function findSlot(start, end){
    if(start == '09:30:00' && end == '10:30:00')
        return 'one';
    if(start == '10:30:00' && end == '11:30:00')
        return 'two';
    if(start == '11:30:00' && end == '12:30:00')
        return 'three';
    if(start == '01:15:00' && end == '02:15:00')
        return 'four';
    if(start == '02:15:00' && end == '03:15:00')
        return 'five';
    if(start == '03:15:00' && end == '04:15:00')
        return 'six';
    if(start == '04:15:00' && end == '05:15:00')
        return 'seven';
    else if(start == '09:30:00' && end == '11:30:00')
        return 'one-two';
    else if(start == '10:30:00' && end == '12:30:00')
        return 'two-three';
    else if(start == '01:15:00' && end =='03:15:00')
        return 'four-five';
    else if(start=='02:15:00' && end == '04:15:00')
        return 'five-six';
    else if(start=='03:15:00' && end == '05:15:00')
        return 'six-seven';
    else
        return '';
}
// function that will add a new slot of the current info of the dropdown list...
function putSlot(e){
    if(slot=='THEORY'){
        if(assignedMap.get('THEORY') == conditionMap.get('THEORY')){
            alert("All Theory lectures have been assigned.\nSo can't allot more theory lectures.");
            return;
        }
        flag = 'lec';
        document.getElementById(e.target.id).innerHTML+= '<td>'+subjName.split(':')[0]+'</td>' +'  <td>'+facName.split(':')[0]+'</td>'+'  <td>'+roomNo+'</td>';
        document.getElementById(e.target.id).style.backgroundColor = 'cyan';
        addToDataBase(e.target.id);
        newlyAddedSlotIds.add(e.target.id);
        document.getElementById(e.target.id).removeEventListener('dbclick', putSlot);
        assignedMap.set('THEORY',assignedMap.get('THEORY')+1);
        putAssignedMap();
        return;
    }
    else if(slot=='PRACTICAL')
        addNewPracticalSlot(e);
    
    else if(slot=='TUTORIAL'){
        var index = parseInt(batchNo.split('')[1],10)-1;
        if(assignedMap.get('TUTORIAL')[index] == conditionMap.get('TUTORIAL')){
            alert(`All tutorial sessions for ${batchNo} for subject ${subjName.split(':')[0]} have been assigned.\nSo can't allot more tutorial sessions.`);
            return;
        }
        else{
            flag = 'tut';
            if(tutHrs=='1 HOUR'){
                oneHourTutorial(null,e.target.id);
                putAssignedMap();
                return;
            }
            else if(tutHrs=='2 HOURS'){
                twoHoursTutorial(null,e.target.id);
                putAssignedMap();
                return;
            }
        }
    } 
    else if(slot=='AUDIT'){
        flag = 'ac';
        if(auditMap.get('AUDIT')==conditionMap.get('THEORY')){
            alert(`Alloted maximum audit course hours for ${subjName.split(':')[0]} - ${subjName.split('-')[1]}`);
            return;
        }
        var fc = document.getElementById('faculty');
        var new_fc = fc.options[fc.selectedIndex].text;
        var sub = document.getElementById('subject');
        var new_sub = sub.options[sub.selectedIndex].text;
        var rm = document.getElementById('room');
        new_rm = rm.options[rm.selectedIndex].text;
        if(new_fc=='FACULTY')
            facName=null;
        if(new_sub=='SUBJECT')
            subjName=null;
        if(new_rm == 'ROOM NO.')
            roomNo=null;
        if(facName==null || subjName==null || roomNo==null){
            alert(`Please select faculty, suject and room to allot an audit course lecture`);
            return;
        }
        document.getElementById(e.target.id).innerText+= `|${subjName.split(':')[0]} ${roomNo} ${facName.split(':')[0]}|`;
        document.getElementById(e.target.id).style.backgroundColor = 'cyan';
        addToDataBase(e.target.id);
        putAuditMap();
    }
    else if(slot=='ELE-THEORY'){
        flag = 'ele-lec';
        if(electiveMap.get('THEORY')==conditionMap.get('THEORY')){
            alert(`Alloted maximum elective theory hours for ${subjName.split(':')[0]} - ${subjName.split(':')[1]}`);
            return;
        }
        var fc = document.getElementById('faculty');
        var new_fc = fc.options[fc.selectedIndex].text;
        var sub = document.getElementById('subject');
        var new_sub = sub.options[sub.selectedIndex].text;
        var rm = document.getElementById('room');
        new_rm = rm.options[rm.selectedIndex].text;
        if(new_fc=='FACULTY')
            facName=null;
        if(new_sub=='SUBJECT')
            subjName=null;
        if(new_rm == 'ROOM NO.')
            roomNo=null;
        if(facName==null || subjName==null || roomNo==null){
            alert(`Please select faculty, suject and room to allot an elective theory lecture`);
            return;
        }
        document.getElementById(e.target.id).innerText+= `${subjName.split(':')[0]} ${roomNo} ${facName.split(':')[0]}|`;
        document.getElementById(e.target.id).style.backgroundColor = 'cyan';
        addToDataBase(e.target.id);
        putElectiveAssignedMap();
    }

    else if(slot=='ELE-PRACTICAL'){
        flag = 'ele-lab';
        if(electiveMap.get('PRACTICAL') == conditionMap.get('PRACTICAL')){
            alert(`All elective practical sessions for subject ${subjName.split(':')[0]} have been assigned.\nSo can't allot more practical sessions.`);
            return;
        }
        else{
            var fc = document.getElementById('faculty');
            var new_fc = fc.options[fc.selectedIndex].text;
            var sub = document.getElementById('subject');
            var new_sub = sub.options[sub.selectedIndex].text;
            var rm = document.getElementById('room');
            new_rm = rm.options[rm.selectedIndex].text;
            if(new_fc=='FACULTY')
                facName=null;
            if(new_sub=='SUBJECT')
                subjName=null;
            if(new_rm == 'ROOM NO.')
                roomNo=null;
            if(facName==null || subjName==null || roomNo==null){
                alert(`Please select faculty, suject and room to allot an elective practical session`);
                return;
            }
            var tarId = e.target.id;
            if(tarId.split('-').length==3){
                document.getElementById(e.target.id).innerText+=`${subjName.split(':')[0]} ${facName.split(':')[0]} ${roomNo}|`;   
                document.getElementById(e.target.id).style.backgroundColor='cyan';
                newlyAddedSlotIds.add(e.target.id);   
                addToDataBase(e.target.id);
                putElectiveAssignedMap();
            }
            else if(tarId.split('-').length==2 && (tarId.split('-')[1]=='three' || tarId.split('-')[1]=='seven')){
                alert('This slot cannot be practical slot. Practical slots should be of continuous 2 hrs');
                return;
            }
            else if(tarId.split('-').length==2){
                var next = '';
                switch(tarId.split('-')[1]){
                    case 'one': next = 'two'; break;
                    case 'two': next = 'three'; break;
                    case 'three': next = 'four'; break;
                    case 'four': next = 'five'; break;
                    case 'five': next = 'six'; break;
                    case 'six': next = 'seven'; break;
                    default: break;
                }
                var day = tarId.split('-')[0];
                var t = document.getElementById(day+'-'+next);
                t.remove();
                IDset.delete(day+'-'+next);
                var id = tarId+'-'+next;
                console.log('id = ',id);
                document.getElementById(tarId).id=id;
                IDset.delete(tarId);
                document.getElementById(id).setAttribute('rowspan',2);
                IDset.add(id);
                document.getElementById(id).innerText+= `${subjName.split(':')[0]} ${facName.split(':')[0]} ${roomNo}|`;
                document.getElementById(id).style.backgroundColor='cyan';                 
                newlyAddedSlotIds.add(id); 
                addToDataBase(id);
                putElectiveAssignedMap();
            }
        }
    }
    else if(slot=='PROJECT'){
        flag = 'proj';
        var fc = document.getElementById('faculty');
        var new_fc = fc.options[fc.selectedIndex].text;
        var rm = document.getElementById('room');
        var new_rm= rm.options[rm.selectedIndex].text;
        if(new_rm=='ROOM NO.'){
            roomNo=null;
            alert(`Please select a room for alloting project slot`);
            return;
        }
        if(new_fc=='FACULTY')
            facName=null;
        console.log("entered project slot condition");
        if(projectMap.get('PROJECT') == conditionMap.get('THEORY')){
            alert("All project sessions have been assigned.\nSo can't allot more project sessions.");
            return;
        }
        if(facName==null)
            document.getElementById(e.target.id).innerHTML+= `${subjName.split(':')[0]} ${roomNo} _`;
        else
            document.getElementById(e.target.id).innerHTML+= `${subjName.split(':')[0]} ${roomNo} ${facName.split(':')[0]}`;
        document.getElementById(e.target.id).style.backgroundColor = 'cyan';
        addToDataBase(e.target.id);
        newlyAddedSlotIds.add(e.target.id);
        document.getElementById(e.target.id).removeEventListener('dbclick', putSlot);
        putProjectAssignedMap();
        return;
    }
}


function addProjectSlotToDataBase(id){
    var day = dayName(id.split('-')[0]), room = roomNo;
    var time = oneHourTimeFinder(id.split('-')[1]);
    var start_time = time[0], end_time = time[1];
    var xhr = new XMLHttpRequest();
    var url = 'php/Project.php';
    var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&room="+room+"&day="+day+"&start_time="+start_time+"&end_time="+end_time+"&get=no";
    xhr.open('POST', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = this.responseText;
            console.log(resp);
        }
    }
    xhr.send();
}

function addNewPracticalSlot(e){
    var index = parseInt(batchNo.split('')[1],10) - 1;
    if(assignedMap.get('PRACTICAL')[index] == conditionMap.get('PRACTICAL')){
        alert(`All practical sessions for ${batchNo} for subject ${subjName.split(':')[0]} have been assigned.\nSo can't allot more practical sessions.`);
        return;
    }
    else{
        var tarId = e.target.id;
            flag = 'lab';
            if(tarId.split('-').length==4){
                document.getElementById(e.target.id).innerHTML=batchNo+'<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo;   
                document.getElementById(e.target.id).style.backgroundColor='cyan';
                document.removeEventListener('dblclick', putSlot);
                newlyAddedSlotIds.add(e.target.id);   
                addToDataBase(e.target.id);
                var pracs = assignedMap.get('PRACTICAL');
                pracs[index] = pracs[index]+1;
                assignedMap.set('PRACTICAL', pracs);
            }
            else if(tarId.split('-').length==2 && (tarId.split('-')[1]=='three' || tarId.split('-')[1]=='seven')){
                alert('This slot cannot be practical slot. Practical slots should be of continuous 2 hrs');
                return;
            }
            else if(tarId.split('-').length==2){
                var next = '';
                switch(tarId.split('-')[1]){
                    case 'one': next = 'two'; break;
                    case 'two': next = 'three'; break;
                    case 'three': next = 'four'; break;
                    case 'four': next = 'five'; break;
                    case 'five': next = 'six'; break;
                    case 'six': next = 'seven'; break;
                    default: break;
                }
                var day = tarId.split('-')[0];
                var t = document.getElementById(day+'-'+next);
                t.remove();
                IDset.delete(day+'-'+next);
                var id = tarId+'-'+next;
                document.getElementById(tarId).id = id;
                IDset.delete(tarId);
                document.getElementById(id).setAttribute('rowspan',2);
                IDset.add(id);
                document.getElementById(id).style.verticalAlign = 'baseline';
                var div = dvYr.split(' ')[2];
                document.getElementById(id).innerHTML+= `<table id="table" cellpadding = "0"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-1' height="100%">${div+'1'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-2' height="100%">${div+'2'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-3' height="100%">${div+'3'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-4' height="100%">${div+'4'}</td></tr></table>`; 
            var map = [];
            for(var j=1;j<=4;j++){
                IDset.add(id+'-'+j);
                map.push(id+'-'+j);
                document.getElementById(id+'-'+j).addEventListener('dblclick',putSlot);
            }
            practicalSlots.set(id,map);
            switch(batchNo){
                case dvYr.split(' ')[2]+'1': document.getElementById(id+'-1').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-1').removeEventListener('dblclick', putSlot); document.getElementById(id+'-1').style.backgroundColor='cyan'; var pracs = assignedMap.get('PRACTICAL'); pracs[0] = pracs[0]+1; assignedMap.set('PRACTICAL', pracs); newlyAddedSlotIds.add(id+'-1'); addToDataBase(id+'-1'); break;
                case dvYr.split(' ')[2]+'2': document.getElementById(id+'-2').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-2').removeEventListener('dblclick', putSlot); document.getElementById(id+'-2').style.backgroundColor='cyan'; var pracs = assignedMap.get('PRACTICAL'); pracs[1] = pracs[1]+1; assignedMap.set('PRACTICAL', pracs); newlyAddedSlotIds.add(id+'-2'); addToDataBase(id+'-2'); break;
                case dvYr.split(' ')[2]+'3': document.getElementById(id+'-3').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-3').removeEventListener('dblclick', putSlot); document.getElementById(id+'-3').style.backgroundColor='cyan'; var pracs = assignedMap.get('PRACTICAL'); pracs[2] = pracs[2]+1; assignedMap.set('PRACTICAL', pracs); newlyAddedSlotIds.add(id+'-3'); addToDataBase(id+'-3'); break;
                case dvYr.split(' ')[2]+'4': document.getElementById(id+'-4').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-4').removeEventListener('dblclick', putSlot); document.getElementById(id+'-4').style.backgroundColor='cyan'; var pracs = assignedMap.get('PRACTICAL'); pracs[3] = pracs[3]+1; assignedMap.set('PRACTICAL', pracs); newlyAddedSlotIds.add(id+'-4'); addToDataBase(id+'-4'); break;
            }
        }
    }
}

// Adding and removing a listener on each slot (table cell).....
function slotListener(str){
    for(var i=1;i<=35;i++){
        var id = '';
        if(i>=1 && i<=7)
            id = 'mon';
        else if(i>=8 && i<=14)
            id = 'tue';
        else if(i>=15 && i<=21)
            id = 'wed';
        else if(i>=22 && i<=28)
            id = 'thu';
        else if(i>=29 && i<=35)
            id = 'fri';
        if(i%7==0)
            id+='-'+'one';
        else if(i%7==1)
            id+='-'+'two';
        else if(i%7==2)
            id+='-'+'three';
        else if(i%7==3)
            id+='-'+'four';    
        else if(i%7==4)
            id+='-'+'five';
        else if(i%7==5)
            id+='-'+'six';
        else if(i%7==6)
            id+='-'+'seven';
        if(str=='add'){
            document.getElementById(id).addEventListener('dblclick',putSlot);
            IDset.add(id);
        }
    }
}

// Event listener for change on branch list....
function branch(){
    let brn = document.getElementById('branch'); 
    brnName = brn.options[brn.selectedIndex].text;
    document.getElementById('branch').disabled = true;
    // Putting branchnames using 
    putDeptName(brnName);
    var xhr = new XMLHttpRequest();      
    var url = 'php/faculty.php';
    var resp;
    var params = "dept="+brnName.toString()+"&fid=0";
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            resp = xhr.responseText; 
            var row = resp.split('\n');     
            for(var i=0;i<row.length-1;i++)
              document.getElementById('faculty').options[i+1] = new Option(row[i]);
        }
    }
    xhr.send();
}

function divYear(){ 
    dvYr = document.getElementById('divYear').options[document.getElementById('divYear').selectedIndex].text.toString();
    if(brnName=='SSH'){
        document.getElementById('semester').options[1] = new Option('I');
        document.getElementById('semester').options[2] = new Option('II');
    }
    else{
        if(dvYr.split(' ')[0] == 'SY'){
            document.getElementById('semester').options[1] = new Option('III');
            document.getElementById('semester').options[2] = new Option('IV');
        }
        else if(dvYr.split(' ')[0] == 'TY'){
            document.getElementById('semester').options[1] = new Option('V');
            document.getElementById('semester').options[2] = new Option('VI');
        }
        else{
            document.getElementById('semester').options[1] = new Option('VII');
            document.getElementById('semester').options[2] = new Option('VIII');
        }
    }    
    document.getElementById('divYear').disabled = true;
    document.getElementById('class').innerText+=dvYr.split(' ')[0]+' B. Tech '+ dvYr.split(' ')[1]+ ' '+dvYr.split(' ')[2];
    if(dvYr.split(' ')[0]=='LY'){
        document.getElementById('slotType').options[4] = new Option('ELE-THEORY');
        document.getElementById('slotType').options[5] = new Option('ELE-PRACTICAL');
        document.getElementById('slotType').options[6] = new Option('PROJECT');
    }
    putDivisionAssignedSlot();
}

// Event listener for change on semester list....
function semester(){ 
    let sb = document.getElementById('semester');
    sem = sb.options[sb.selectedIndex].text;
    document.getElementById('semester').disabled = true;
    var s = 0; 
    if(sem=='I') { s=1; }
    if(sem=='II') {s=2;}
    if(sem=='III'){ s= 3;}
    if(sem=='IV') { s= 4;}
    if(sem=='V') { s= 5;}
    if(sem=='VI') { s= 6;}
    if(sem=='VII') {s=7;}
    if(sem=='VIII') {s=8;}
    var xhr = new XMLHttpRequest();      
    var url = 'php/semester.php';
    var resp;
    var params = "semester="+s.toString()+"&dept="+brnName.toString();
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            resp = xhr.responseText; 
            var row = resp.split('}');      
            for(var i=0;i<row.length-1;i++)
                document.getElementById('subject').options[i+1] = new Option(row[i]);
        }
    }
    xhr.send();
}

function faculty(){
    let fc = document.getElementById('faculty');
    facName = fc.options[fc.selectedIndex].text;
    //document.getElementById('faculty').disabled = true;
    putfacultyAssignedSlot();
    removefacultyAssignedSlot();
}

function room(){
    let rm = document.getElementById('room');
    roomNo = rm.options[rm.selectedIndex].text;
    putRoomBusySlot();
    removeRoomAssignedSlot();
    //document.getElementById('room').disabled = true;
}

function batch(){
    let b = document.getElementById('batch');
    batchNo = b.options[b.selectedIndex].text;
    //document.getElementById('batch').disabled = true;
}

function tutorial(){
    let t = document.getElementById('tut');
    tutHrs = t.options[t.selectedIndex].text;
    //document.getElementById('tut').disabled = true;
}

function subject(){
    let sb = document.getElementById('subject');
    subjName = sb.options[sb.selectedIndex].text;
    if(slot=='THEORY' || slot=='PRACTICAL' || slot=='TUTORIAL')
        putAssignedMap();
    if(dvYr.split(' ')[0] =='LY' && (slot=='ELE-THEORY' || slot == 'ELE-PRACTICAL'))
        putElectiveAssignedMap();
    if(dvYr.split(' ')[0] =='LY' && (slot=='PROJECT'))
        putElectiveAssignedMap();
    if((dvYr.split(' ')[0]=='SY' || dvYr.split(' ')[0] == 'TY') && slot=='AUDIT')
        putAuditMap();
    
    putConditionMap();
    //document.getElementById('subject').disabled = true;
}

function putAuditMap(){
    document.getElementById('stats').innerHTML=`
    <div class="auditTable">
        <table border="2" id="audit_table">
          <th align="center">Audit</th>
          <tr>
            <td align="center" id="audit"></td>
          </tr>
        </table>
    </div>
    `;
    /*document.getElementById('stats').style=`
    width: 80px;
    height: 100px;
    `;*/
    document.getElementById('audit_table').style=`
    width: 150px;
    height: 50px;
    margin-left: 120px;
    margin-top: 25px;
    `;
    var xhr = new XMLHttpRequest();
    var url = 'php/auditMap.php';
    var params = "subject="+subjName.split(':')[0]+"&dept="+brnName+"&year="+dvYr.split(' ')[0]+"&division="+dvYr.split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = xhr.responseText;
            var hrs = resp.split('\n');
                // Using template strings as feature of ES6...
            auditMap.set('AUDIT',parseInt(hrs[0]));
            document.getElementById("audit").innerHTML= `${hrs[0]}/${conditionMap.get('THEORY')}`;
        }
    }
    xhr.send();
    console.log("auditMap = ",auditMap);   
}


function putAssignedMap(){
    document.getElementById('stats').innerHTML=`
    <div class="subjectTable">
        <table border="2" id="sub_table" style="width:50%">
          <tr id="">
            <td align="center" id="sub_col">Subject</td>
            <td align="center" id="1">${dvYr.split(' ')[2]}1</td>
            <td align="center" id="2">${dvYr.split(' ')[2]}2</td>
            <td align="center" id="3">${dvYr.split(' ')[2]}3</td>
            <td align="center" id="4">${dvYr.split(' ')[2]}4</td>
          </tr>
          <tr>
            <td align="center">Theory</td>
            <td colspan="4" align="center" id="theory">
                Alloted lectures count: 
            </td>
          </tr>

          <tr id="practical">
            <td align="center">Practicals</td>
            <td align="center" id="1-two"></td>
            <td align="center" id="2-two"></td>
            <td align="center" id="3-two"></td>
            <td align="center" id="4-two"></td>
          </tr>
          <tr id="tutorial">
            <td align="center">Tutorials</td>
            <td align="center" id="1-three"></td>
            <td align="center" id="2-three"></td>
            <td align="center" id="3-three"></td>
            <td align="center" id="4-three"></td>
          </tr>
        </table>
      </div>
    `;
    document.getElementById('sub_table').style=`
        margin-left: 20px;
        min-width: 150px;
    `;
    var xhr = new XMLHttpRequest();      
    var url = 'php/subject.php';
    var params = "subject="+subjName.split(':')[0]+"&dept="+brnName+"&year="+dvYr.split(' ')[0]+"&division="+dvYr.split(' ')[2];
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = xhr.responseText;
            var hrs = resp.split('\n');
            // Using template strings as feature of ES6...
            assignedMap.set('THEORY',parseInt(hrs[0]));
            document.getElementById('sub_col').innerText=`${subjName.split(':')[1]}`;
            document.getElementById('theory').innerText=`Theory lectures assigned for class are: ${hrs[0]}/${conditionMap.get('THEORY')}`;
            assignedMap.set('PRACTICAL', []);
            assignedMap.set('TUTORIAL', []);
            for(var k=1;k<=4;k++){
                document.getElementById(k+"-two").innerHTML= `${hrs[1].split(' ')[k-1]}/${conditionMap.get('PRACTICAL')}`;
                assignedMap.get('PRACTICAL').push(parseInt(hrs[1].split(' ')[k-1]));
            }
            for(var k=1;k<=4;k++){
                document.getElementById(k+"-three").innerHTML= `${hrs[2].split(' ')[k-1]}/${conditionMap.get('TUTORIAL')}`;
                assignedMap.get('TUTORIAL').push(parseInt(hrs[2].split(' ')[k-1]));
            }
        }
    }
    xhr.send();
    console.log("assignedMap = ",assignedMap);
}

function putConditionMap(){
    var xhr = new XMLHttpRequest();      
    var url = 'php/condition.php';
    var resp;
    var params = "subject="+subjName.split(':')[0].toString()+"&dept="+brnName.toString();
    xhr.open('GET', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            resp = xhr.responseText; 
            var row = resp.split(' ');  
            console.log(row);    
            conditionMap.set('THEORY',parseInt(row[0]));
            conditionMap.set('PRACTICAL',parseInt(row[1]));
            conditionMap.set('TUTORIAL', parseInt(row[2]));    
        }
    }
    xhr.send();
    console.log("conditionMap = ",conditionMap);
}

function slotType(){
    let sl = document.getElementById('slotType');
    slot = sl.options[sl.selectedIndex].text;
    if(slot=='THEORY'){
        document.getElementById('batch').style.display='none';
        document.getElementById('tut').style.display = 'none';
    }
    if(slot=='PRACTICAL'){
        document.getElementById('batch').style.display = 'block';
        document.getElementById('tut').style.display = 'none';
        for(var i=1;i<=4;i++)
            document.getElementById('batch').options[i] = new Option(dvYr.split(' ')[2]+i);  
    }
    if(slot=='TUTORIAL'){
        document.getElementById('batch').style.display = 'block';
        for(var i=1;i<=4;i++)
            document.getElementById('batch').options[i] = new Option(dvYr.split(' ')[2]+i);  
        document.getElementById('tut').style.display = 'block';
    }
    if(slot=='ELE-PRACTICAL' || slot == 'ELE-THEORY' || slot == 'PROJECT' || slot == 'AUDIT'){
        document.getElementById('batch').style.display = 'none';
        document.getElementById('tut').style.display = 'none';
    }
    if(slot=='THEORY' || slot=='PRACTICAL' || slot=='TUTORIAL')
        putAssignedMap();
    if(dvYr.split(' ')[0] =='LY' && (slot=='ELE-THEORY' || slot == 'ELE-PRACTICAL'))
        putElectiveAssignedMap();
    if(dvYr.split(' ')[0] =='LY' && (slot=='PROJECT'))
        putProjectAssignedMap();
    if((dvYr.split(' ')[0]=='SY' || dvYr.split(' ')[0] == 'TY') && slot=='AUDIT')
        putAuditMap();
}

function putProjectAssignedMap(){

    document.getElementById('stats').innerHTML=`
    <div class="projectTable" id="prTable">
        <table border="2" id="project_table" align="center">
          <th align="center">Project</th>
          <tr>
            <td align="center" id="project"></td>
          </tr>
        </table>
    </div>
    `;
    document.getElementById('prTable').style=`
    width: 80px;
    `;
    document.getElementById('stats').style=`margin-left:20px;`;
    var xhr = new XMLHttpRequest();
        var url = 'php/projectMap.php';
        var params = "subject="+subjName.split(':')[0]+"&dept="+brnName+"&year="+dvYr.split(' ')[0]+"&division="+dvYr.split(' ')[2];
        xhr.open('GET', url+"?"+params,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                var resp = xhr.responseText;
                var hrs = resp.split('\n');
                // Using template strings as feature of ES6...
                projectMap.set('PROJECT',parseInt(hrs[0]));
                document.getElementById("project").innerHTML= `${hrs[0]}/${conditionMap.get('THEORY')}`;
            }
        }
        xhr.send();
        console.log("projectMap = ",projectMap);
}


function putElectiveAssignedMap(){
    document.getElementById('elective_table').innerHTML=`
    <div class="electiveTable" id="elTable">
        <table border="3" id="elective_table">
          <th>Elective</th>
          <tr>
            <td align="center" id="elective"></td>
          </tr>
        </table>
    </div>
    `;
    document.getElementById('elTable').style=`
    width: 80px;
    `;
    document.getElementById('stats').style=`margin-left:20px;`;
    if(slot=='ELE-THEORY' || slot=='ELE-PRACTICAL'){
        var xhr = new XMLHttpRequest();      
        var url = 'php/ElectiveSubject.php';
        var params = "subject="+subjName.split(':')[0]+"&dept="+brnName+"&year="+dvYr.split(' ')[0]+"&division="+dvYr.split(' ')[2];
        xhr.open('GET', url+"?"+params,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                var resp = xhr.responseText;
                var hrs = resp.split('\n');
                // Using template strings as feature of ES6...
                electiveMap.set('THEORY',parseInt(hrs[0]));
                electiveMap.set('PRACTICAL', parseInt(hrs[1]));
                document.getElementById('ele-theory').innerHTML=`${electiveMap.get('THEORY')}`;
                document.getElementById('ele-practical').innerHTML=`${electiveMap.get('THEORY')}`;
            }
        }
        xhr.send();
        console.log("electiveMap = ",electiveMap);
    }
}


function getNextSlot(id){
    var tarId="";
    switch(id){
        case 'one': tarId+= 'two'; break;
        case 'two': tarId+='three'; break;
        case 'three': tarId+='four'; break;
        case 'four': tarId+= 'five'; break;
        case 'five': tarId+= 'six'; break;
        case 'six': tarId+= 'seven'; break;
        default: break;
    }
    return tarId;
}

function getPreviousSlot(id){
    var tarId="";
    switch(id){
        case 'two': tarId+= 'one'; break;
        case 'three': tarId+='two'; break;
        case 'four': tarId+='three'; break;
        case 'five': tarId+= 'four'; break;
        case 'six': tarId+= 'five'; break;
        case 'seven': tarId+= 'six'; break;
        default: break;
    }
    return tarId;
}

function oneHourTutorial(my_slot,id){
    if(my_slot!=null){
        var t = id+'-'+my_slot[0];
        var check1 = id.split('-')[0]+'-'+id.split('-')[1]+'-'+getNextSlot(id.split('-')[1])+'-'+my_slot[0];
        console.log('check1 = ',check1);
        var check2 = id.split('-')[0]+'-'+getIdAfter(id.split('-')[1])+'-'+id.split('-')[1]+'-'+my_slot[0];
        console.log('check2 = ',check2);
        if(IDset.has(check1+'-first') && !tutorialSlotIds.has(check1+'-first')){
            var _new = check1+'-first';
            document.getElementById(_new).innerHTML=dvYr.split(' ')[2]+my_slot[0]+'<br>'+my_slot[1]+'<br>'+my_slot[2] + '<br>' + my_slot[3];
            document.getElementById(_new).removeEventListener('dblclick', putSlot);
            return;
        }
        else if(IDset.has(check1+'-second') && !tutorialSlotIds.has(check1+'-second')){
            var _new = check1+'-second';
            document.getElementById(_new).innerHTML=dvYr.split(' ')[2]+my_slot[0]+'<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+ my_slot[3];
            tutorialSlotIds.add(_new);
            document.getElementById(_new).removeEventListener('dblclick', putSlot);
            return;
        }
        else if(IDset.has(check2+'-first') && !tutorialSlotIds.has(check2+'-first')){
            var _new = check2+'-first';
            document.getElementById(_new).innerHTML=dvYr.split(' ')[2]+my_slot[0]+'<br>'+my_slot[1]+'<br>'+my_slot[2] + '<br>' + my_slot[3];
            tutorialSlotIds.add(_new);
            document.getElementById(_new).removeEventListener('dblclick', putSlot);
            return;
        }
        else if(IDset.has(check2+'-second') && !tutorialSlotIds.has(check2+'-second')){
            var _new = check2+'-second';
            document.getElementById(_new).innerHTML=dvYr.split(' ')[2]+my_slot[0]+'<br>'+my_slot[1]+'<br>'+my_slot[2] + '<br>' + my_slot[3];
            tutorialSlotIds.add(_new);
            document.getElementById(_new).removeEventListener('dblclick', putSlot);
            return;
        }
        else if(IDset.has(check2)){
            var bt = dvYr.split(' ')[2]+my_slot[0];
            document.getElementById(check2).innerHTML= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+check2+`-first'>`+bt+`</td></tr><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+check2+`-second'>`+bt+`</td></tr></table>`;
            document.getElementById(check2+'-first').addEventListener('dblclick',putSlot);
            document.getElementById(check2+'-second').addEventListener('dblclick',putSlot);
            IDset.add(check2+'-first');
            IDset.add(check2+'-second');
            document.getElementById(check2+'-second').innerHTML=bt+'<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3];
            tutorialSlotIds.add(check2+'-second');
            document.getElementById(check2+'-second').removeEventListener('dblclick', putSlot);
            return;
        }
        else{
            var tarId="";
            console.log('id = ',id);
            switch(id.split('-')[1]){
                case 'one': tarId+= (id+'-two-'+my_slot[0]).toString(); break;
                case 'two': tarId+= (id+'-three-'+my_slot[0]).toString(); break;
                case 'three': tarId+= id+'-four-'+my_slot[0]; break;
                case 'four': tarId+= id+'-five-'+my_slot[0]; break;
                case 'five': tarId+= (id+'-six-'+my_slot[0]).toString(); break;
                case 'six': tarId+= (id+'-seven-'+my_slot[0]).toString(); break;
                default: break;
            }
            var bt = dvYr.split(' ')[2]+my_slot[0];
            console.log('bt = ',bt);
            console.log(tarId);
            document.getElementById(tarId).innerHTML= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+tarId+`-first'>`+bt+`</td></tr><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+tarId+`-second'>`+bt+`</td></tr></table>`;
            document.getElementById(tarId+'-first').addEventListener('dblclick',putSlot);
            document.getElementById(tarId+'-second').addEventListener('dblclick',putSlot);
            IDset.add(tarId+'-first');
            IDset.add(tarId+'-second');
            document.getElementById(tarId+'-first').innerHTML=bt+'<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3];
            tutorialSlotIds.add(tarId+'-first');
            document.getElementById(tarId+'-first').removeEventListener('dblclick', putSlot);
            return;
        }
    }
    else{
        var t = id;
        if(IDset.has(t) && t.split('-').length==5){
            document.getElementById(t).innerHTML = batchNo+'<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(t).removeEventListener('dblclick', putSlot); document.getElementById(t).style.backgroundColor='cyan'; 
            newlyAddedSlotIds.add(t);
            addToDataBase(t);
            return;
        }
        else if(IDset.has(t) && t.split('-').length==4){
            document.getElementById(t).innerHTML = `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+t+`-first'>`+batchNo+`</td></tr><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+t+`-second'>`+batchNo+`</td></tr></table>`;
            IDset.add(t+'-first');
            IDset.add(t+'-second');
            document.getElementById(t+'-first').addEventListener('dblclick', putSlot);
            document.getElementById(t+'-second').addEventListener('dblclick', putSlot);
            document.getElementById(t+'-first').innerHTML=batchNo+'<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(t+'-first').removeEventListener('dblclick', putSlot); document.getElementById(t+'-first').style.backgroundColor='cyan'; 
            newlyAddedSlotIds.add(t+'-first');                
            addToDataBase(t+'-first');
        }
        else{
            var div = dvYr.split(' ')[2];
            document.getElementById(id).innerHTML+= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-1'>${div+'1'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-2'>A${div+'2'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-3'>${div+'3'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-4'>${div+'4'}</td></tr></table>`;   
            for(var j=1;j<=4;j++){
                document.getElementById(id+'-'+j).addEventListener('dblclick',putSlot);
                IDset.add(id+'-'+j);
            }
            document.getElementById(t).innerHTML=batchNo+'<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(t).removeEventListener('dblclick', putSlot); document.getElementById(t).style.backgroundColor='cyan'; 
            newlyAddedSlotIds.add(t);
            document.getElementById(t).removeEventListener('dblclick', putSlot);
            addToDataBase(t);
        }
    }
}

function twoHoursTutorial(my_slot, id){
    if(my_slot==null){
        var tarId = id;
        if(tarId.split('-').length==4){
            document.getElementById(id).innerHTML=batchNo+'<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; 
            document.removeEventListener('dblclick', putSlot);  
            document.getElementById(id).style.backgroundColor='cyan';
            assignedMap.set('TUTORIAL',assignedMap.get('TUTORIAL')[parseInt(batchNo.split('')[0])-1]+1);
            newlyAddedSlotIds.add(id);
            addToDataBase(id);
        }
        else if(tarId.split('-').length==2 && (tarId.split('-')[1]=='three' || tarId.split('-')[1]=='seven')){
            alert('This slot cannot be 2 hour tutorial slot.');
        }
        else if(tarId.split('-').length==2){
            var next = '';
            switch(tarId.split('-')[1]){
                case 'one': next = 'two'; break;
                case 'two': next = 'three'; break;
                case 'three': next = 'four'; break;
                case 'four': next = 'five'; break;
                case 'five': next = 'six'; break;
                case 'six': next = 'seven'; break;
                default: break;
            }
            var day = tarId.split('-')[0];
            var t = document.getElementById(day+'-'+next);
            t.remove();
            IDset.delete(day+'-'+next);
            var id = tarId+'-'+next;
            document.getElementById(tarId).id = id;
            IDset.delete(tarId);
            document.getElementById(id).setAttribute('rowspan',2);
            IDset.add(id);
            document.getElementById(id).style.verticalAlign = 'baseline';
            var div = dvYr.split(' ')[2];
            document.getElementById(id).innerHTML+= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-1' height="100%">${div+'1'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-2' height="100%">${div+'2'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-3' height="100%">${div+'3'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-4' height="100%">${div+'4'}</td></tr></table>`; 
            var map = [];
            for(var j=1;j<=4;j++){
                IDset.add(id+'-'+j);
                map.push(id+'-'+j);
                document.getElementById(id+'-'+j).addEventListener('dblclick',putSlot);
            }
            practicalSlots.set(id,map);
            switch(batchNo){
                case dvYr.split(' ')[2]+'1': document.getElementById(id+'-1').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-1').removeEventListener('dblclick', putSlot); document.getElementById(id+'-1').style.backgroundColor='cyan'; assignedMap.set('TUTORIAL',assignedMap.get('TUTORIAL')[0]+1); newlyAddedSlotIds.add(id+'-1'); addToDataBase(id+'-1'); break;
                case dvYr.split(' ')[2]+'2': document.getElementById(id+'-2').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-2').removeEventListener('dblclick', putSlot); document.getElementById(id+'-2').style.backgroundColor='cyan'; assignedMap.set('TUTORIAL',assignedMap.get('TUTORIAL')[1]+1); newlyAddedSlotIds.add(id+'-2'); addToDataBase(id+'-2'); break;
                case dvYr.split(' ')[2]+'3': document.getElementById(id+'-3').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-3').removeEventListener('dblclick', putSlot); document.getElementById(id+'-3').style.backgroundColor='cyan'; assignedMap.set('TUTORIAL',assignedMap.get('TUTORIAL')[2]+1); newlyAddedSlotIds.add(id+'-3'); addToDataBase(id+'-3'); break;
                case dvYr.split(' ')[2]+'4': document.getElementById(id+'-4').innerHTML+='<br>'+subjName.split(':')[0]+'<br>'+facName.split(':')[0]+'<br>'+roomNo; document.getElementById(id+'-4').removeEventListener('dblclick', putSlot); document.getElementById(id+'-4').style.backgroundColor='cyan'; assignedMap.set('TUTORIAL',assignedMap.get('TUTORIAL')[3]+1); newlyAddedSlotIds.add(id+'-4'); addToDataBase(id+'-4'); break;
            }
        }
    }

    else{
        if(IDset.has(id)){
            var bt = dvYr.split(' ')[2]+my_slot[0];
            document.getElementById(id+'-'+my_slot[0]).innerHTML+= '<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3];
        }
        else{
            var t = document.getElementById(id.split('-')[0]+'-'+id.split('-')[2]);
            t = document.getElementById(id.split('-')[0]+'-'+id.split('-')[2]);
            if(t!=null){
                t.remove();
                IDset.delete(id.split('-')[0]+'-'+id.split('-')[2]);
            }
            if(t!=null){
                var td = document.createElement('td');
                td.setAttribute('id', id);
                td.setAttribute('rowspan', '2');
                td.setAttribute('align','center');
                IDset.add(id);
                document.getElementById(id.split('-')[0]+'-'+getIdAfter(id.split('-')[1])).after(td);
                var div = dvYr.split(' ')[2];
                document.getElementById(id).innerHTML+= `<table id="table"><tr><td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-1'>${div+'1'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-2'>${div+'2'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-3'>${div+'3'}</td> <td draggable="true" ondragstart="dragStart(event)" align="center" width="50px" id='`+id+`-4'>${div+'4'}</td></tr></table>`;   
                
                for(var j=1;j<=4;j++){
                    document.getElementById(id+'-'+j).addEventListener('dblclick',putSlot);
                    IDset.add(id+'-'+j);
                }
            }
            document.getElementById(id+'-'+my_slot[0]).innerHTML+='<br>'+my_slot[1]+'<br>'+my_slot[2]+'<br>'+my_slot[3]; document.getElementById(id+'-'+my_slot[0]).removeEventListener('dblclick', putSlot);
        }
    }
}

function addToDataBase(id){
    var fid;
    if(facName!=null)
        fid = facName.split(':')[0];
    else 
        fid='';
    var subjid = subjName.split(':')[0];
    var room = roomNo;
    var day = dayName(id.split('-')[0]);
    var bid = 0;
    if(flag=='lab' || flag=='tut')
      bid = batchNo.split('')[1];
    var start_time, end_time, time;
    if(flag=='ele-lab')
        time = twoHourTimeFinder(id.split('-')[1]);
    else if(id.split('-').length== 2 || id.split('-').length== 3)
      time = oneHourTimeFinder(id.split('-')[1]);
    else if(id.split('-').length==5){
        if(id.split('-')[4]=='first')
            time = oneHourTimeFinder(id.split('-')[1]);
        else
            time = oneHourTimeFinder(id.split('-')[2]);
    }
    else
      time = twoHourTimeFinder(id.split('-')[1]);
    start_time = time[0];
    end_time = time[1];
    console.log("fid=",fid,"subjid=",subjid,"room=",room,"day=",day,"bid=",bid,"start_time=",start_time,"end_time=",end_time,"flag=",flag);
    var xhr = new XMLHttpRequest();
    var url = 'php/addToDB.php';
    var resp;
    var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid+"&subjid="+subjid+"&room="+room+"&day="+day+"&start_time="+start_time+"&end_time="+end_time+"&flag="+flag+"&bid="+bid;
    xhr.open('POST', url+"?"+params,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var resp = this.responseText;
            console.log(resp);
        }
    }
    xhr.send();
}

function dayName(day){
    switch(day){
        case 'mon': return 'Monday';
        case 'tue': return 'Tuesday';
        case 'wed': return 'Wednesday';
        case 'thu': return 'Thursday';
        case 'fri': return 'Friday';
        default: return '';
    }
}

function oneHourTimeFinder(x){
  switch(x){
    case 'one': return ["09:30:00", "10:30:00"];
    case 'two': return ["10:30:00", "11:30:00"];
    case 'three': return ["11:30:00", "12:30:00"];
    case 'four': return ["01:15:00", "02:15:00"];
    case 'five': return ["02:15:00", "03:15:00"];
    case 'six': return ["03:15:00", "04:15:00"];
    case 'seven': return ["04:15:00", "05:15:00"];
    default: return [];
  }
}

function twoHourTimeFinder(x){
    switch(x){
    case 'one': return ["09:30:00", "11:30:00"];
    case 'two': return ["10:30:00", "12:30:00"];
    case 'four': return ["01:15:00", "03:15:00"];
    case 'five': return ["02:15:00", "04:15:00"];
    case 'six': return ["03:15:00", "05:15:00"];
    default: return [];
  }
}


if(new Date().getMonth()>=4 && new Date().getMonth()<=7){
    document.getElementById('semesterType').innerText+=' ODD';
}
if(new Date().getMonth()==10 || new Date().getMonth() == 11 || new Date().getMonth()==0 || new Date().getMonth()==1){
    document.getElementById('semesterType').innerText+=' EVEN';
}

var n = new Date().getFullYear() + 1;
document.getElementById('acad_year').innerText+=' '+new Date().getFullYear()+'-'+n;


var dragId;

function allowDrop(event){
    event.preventDefault();
}

function dragStart(event){
    dragId = event.target.id;
}

function deleteSlot(event){
    var fid, subjid, day, room, start_time, end_time, flag, bid, confirmResponse;
    var parameters = findParameters(dragId,"delete");
    console.log(parameters);
    confirmResponse = confirm('Do you want to delete slot?');
    if(confirmResponse){
        document.getElementById(dragId).innerText= '';
        if(parameters[8]!=null){
            var array = parameters[8];
            for(var i=0;i<array.length-1;i++)
                document.getElementById(dragId).innerText+= `${array[i]}|`;
        }
        else{
            if(parameters[0]!=0)
                document.getElementById(dragId).innerText = `${dvYr.split(' ')[2]}${parameters[0]}`;
        }
        bid = parameters[0];
        fid = parameters[1];
        subjid = parameters[2];
        room = parameters[3];
        day = parameters[4];
        start_time = parameters[5];
        end_time = parameters[6];
        flag = parameters[7];      

        var xhr = new XMLHttpRequest();
        var url = 'php/deleteSlot.php';
        var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid+"&subjid="+subjid+"&room="+room+"&day="+day+"&start_time="+start_time+"&end_time="+end_time+"&flag="+flag+"&bid="+bid;
        xhr.open('POST', url+"?"+params,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                var resp = this.responseText;
                console.log(resp);
            }
        }
        xhr.send();
    }
}

var bid1, fid1, subjid1, room1, day1, start_time1, end_time1, flag1;
var  bid2, fid2, subjid2, room2, day2, start_time2, end_time2, flag2;
var dragId1, dragId2;

function putFirstSlot(event){
    dragId1 = dragId;
    var parameters = findParameters(dragId,"swap");
    console.log(parameters);
    if(parameters[8]!=null &&parameters[9]!=null){
        var array = parameters[8];
        var storage = parameters[9];
        for(var i=0;i<array.length-1;i++){
            document.getElementById(dragId).innerText=`${array[i]}|`;
        }
        event.target.innerText = `${storage[0]} ${storage[1]} ${storage[2]}`;
    }
    else{
        event.target.innerText = document.getElementById(dragId).innerText;  
        if(parameters[0]!=0)
            document.getElementById(dragId).innerHTML=`${dvYr.split(' ')[2]}${parameters[0]}`;
        else
            document.getElementById(dragId).innerText='';
    }
    bid1 = parameters[0];
    fid1 = parameters[1];
    subjid1 = parameters[2];
    room1 = parameters[3];    
    day1 = parameters[4];
    start_time1 = parameters[5];
    end_time1 = parameters[6];
    flag1 = parameters[7];
}

function putSecondSlot(event){
    dragId2 = dragId;
    if(document.getElementById('first-slot').innerText=='Enter first slot here to swap'){
        alert("First Swap slot is empty. Fill that first");
        return;
    }
    var parameters = findParameters(dragId, "swap");
    if(parameters[8]!=null &&parameters[9]!=null){
        var array = parameters[8];
        var storage = parameters[9];
        for(var i=0;i<array.length-1;i++){
            document.getElementById(dragId).innerText=`${array[i]}|`;
        }
        event.target.innerText = `${storage[0]} ${storage[1]} ${storage[2]}`;
    }
    else{
        event.target.innerText = document.getElementById(dragId).innerText;  
        if(parameters[0]!=0)
            document.getElementById(dragId).innerHTML=`${dvYr.split(' ')[2]}${parameters[0]}`;
        else
            document.getElementById(dragId).innerText='';
    }
    setTimeout(function(){},500);
    bid2 = parameters[0];
    fid2 = parameters[1];
    subjid2 = parameters[2];
    room2 = parameters[3];
    day2 = parameters[4];
    start_time2 = parameters[5];
    end_time2 = parameters[6];
    flag2 = parameters[7];
    console.log(parameters);
    confirmResponse = confirm('Do you want to swap the slots?');
    if(confirmResponse){
        var xhr = new XMLHttpRequest();
        var url = 'php/deleteSlot.php';
        var params = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid2+"&subjid="+subjid2+"&room="+room2+"&day="+day2+"&start_time="+start_time2+"&end_time="+end_time2+"&flag="+flag2+"&bid="+bid2;
        xhr.open('POST', url+"?"+params,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                var resp = this.responseText;
                console.log(resp);
            }
        }
        xhr.send();

        var xhr1 = new XMLHttpRequest();
        var url1 = 'php/deleteSlot.php';
        var params1 = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid1+"&subjid="+subjid1+"&room="+room1+"&day="+day1+"&start_time="+start_time1+"&end_time="+end_time1+"&flag="+flag1+"&bid="+bid1;
        xhr1.open('POST', url1+"?"+params1,true);
        xhr1.onreadystatechange = function(){
            if(xhr1.readyState==4 && xhr1.status==200){
                var resp = this.responseText;
                console.log(resp);
            }
        }
        xhr1.send();
        setTimeout(addFirstSwapSlot, 500);
        setTimeout(addSecondSwapSlot, 1000);
        if(bid1!=0 && bid2!=0){
            document.getElementById(dragId1).innerHTML=`${dvYr.split(' ')[2]}${bid1}<br>${subjid2}<br>${fid2}<br>${room2}`; 
            document.getElementById(dragId2).innerHTML=`${dvYr.split(' ')[2]}${bid2}<br>${subjid1}<br>${fid1}<br>${room1}`; 
        }
        else{
            document.getElementById(dragId1).innerText=document.getElementById('second-slot').innerText;
            document.getElementById(dragId2).innerText=document.getElementById('first-slot').innerText;
        }
        document.getElementById('first-slot').innerText = 'Enter first slot here to swap';
        document.getElementById('second-slot').innerText = 'Enter second slot here to swap';
    }
}

function addFirstSwapSlot(){
    var xhr2 = new XMLHttpRequest();
    var url2 = 'php/addToDB.php';
    var params2 = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid2+"&subjid="+subjid2+"&room="+room2+"&day="+day1+"&start_time="+start_time1+"&end_time="+end_time1+"&flag="+flag2+"&bid="+bid1;
    xhr2.open('POST', url2+"?"+params2,true);
    xhr2.onreadystatechange = function(){
        if(xhr2.readyState==4 && xhr2.status==200){
            var resp = this.responseText;
            console.log(resp);
        }
    }
    xhr2.send();
}

function addSecondSwapSlot(){
    var xhr3 = new XMLHttpRequest();
        var url3 = 'php/addToDB.php';
        var params3 = "dept="+brnName+"&year="+dvYr.split(' ')[0]+"&div="+dvYr.split(' ')[2]+"&fid="+fid1+"&subjid="+subjid1+"&room="+room1+"&day="+day2+"&start_time="+start_time2+"&end_time="+end_time2+"&flag="+flag1+"&bid="+bid2;
        xhr3.open('POST', url3+"?"+params3,true);
        xhr3.onreadystatechange = function(){
            if(xhr3.readyState==4 && xhr3.status==200){
                var resp = this.responseText;
                console.log(resp);
            }
        }
        xhr3.send();
}

function findParameters(dragId,type){
    var parameters, storage;
    var fid, subjid, room, start_time, end_time, flag, bid, confirmResponse;
    var day = dayName(dragId.split('-')[0]);
    if(dragId.split('-').length==2){
        if(document.getElementById(dragId).innerText.split('|').length==1){
            var array = document.getElementById(dragId).innerText.split(' ');
            if(array[0].includes('PROJECT')){
                room = array[1];
                subjid = array[0];
                if(array[2]=='_')
                    fid = '';
                else    
                    fid = array[2];
                flag = 'proj';
            }   
            else{
                fid = array[1];
                subjid = array[0];
                room = array[2];
                flag = 'lec';
            }
            bid=0;
            time = oneHourTimeFinder(dragId.split('-')[1]);
            start_time = time[0];
            end_time = time[1];
            parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, null, null];
        }
        if(document.getElementById(dragId).innerText.split('|').length>1){
            var array = document.getElementById(dragId).innerText.split('|');
            if(type!=null)
                fid = prompt(`Enter faculty code whose lecture you want to ${type}!`);
            flag = 'ele-lec';
            bid=0;
            for(var i=0;i<array.length-1;i++){
                if(array[i].split(' ').includes(fid)){
                    subjid = array[i].split(' ')[0];
                    room = array[i].split(' ')[2];
                    storage = [subjid,fid,room];
                    time = oneHourTimeFinder(dragId.split('-')[1]);
                    start_time = time[0];
                    end_time = time[1];
                    array.splice(i,1);
                    break;
                }
            }
            parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, array,storage];
        }
    }
    if(dragId.split('-').length==4){
        var array = document.getElementById(dragId).innerText.split('\n');
        console.log(array);
        bid=array[0].split('')[1];
        fid = array[2];
        subjid = array[1];
        room = array[3];
        time = twoHourTimeFinder(dragId.split('-')[1]);
        start_time = time[0];
        end_time = time[1];
        flag = 'lab';
        parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, null, null];
    }
    if(dragId.split('-').length==5){
        var array = document.getElementById(dragId).innerText.split('\n');
        console.log(array);
        bid=array[0].split('')[1];
        fid = array[2];
        subjid = array[1];
        room = array[3];
        if(dragId.split('-')[4]=='first')
            time = oneHourTimeFinder(dragId.split('-')[1]);
        else
            time = oneHourTimeFinder(dragId.split('-')[2]);
        start_time = time[0];
        end_time = time[1];
        flag = 'tut';
        parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, null, null];
    }
    if(dragId.split('-').length==3){
        var temp = dragId.split('-');
        if(temp[2]=='1' || temp[2]=='2' || temp[2]=='3' || temp[2]=='4'){
            flag = 'tut';
            parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, null, null];
        }
        else{
            var array = document.getElementById(dragId).innerText.split('|');
            if(type!=null)
                fid = prompt(`Enter faculty code whose lecture you want to ${type}!`);
            flag = 'ele-lab';
            bid=0;
            for(var i=0;i<array.length-1;i++){
                if(array[i].split(' ').includes(fid)){
                    subjid = array[i].split(' ')[0];
                    room = array[i].split(' ')[2];
                    storage = [subjid,fid,room];
                    time = twoHourTimeFinder(dragId.split('-')[1]);
                    start_time = time[0];
                    end_time = time[1];
                    array.splice(i,1);
                    break;
                }
            }
            parameters = [bid, fid, subjid, room, day, start_time, end_time, flag, array,storage];
        }
    }    
    if(newlyAddedSlotIds.has(dragId)){
        newlyAddedSlotIds.delete(dragId);
        document.getElementById(dragId).style.backgroundColor='white';
    }
    return parameters;
}


// firstly adding event listener of dbclick on every cell...
slotListener('add');
document.getElementById('branch').addEventListener('change', branch);
document.getElementById('divYear').addEventListener('change', divYear);
document.getElementById('semester').addEventListener('change', semester);
document.getElementById('subject').addEventListener('change', subject);
document.getElementById('slotType').addEventListener('change', slotType);
document.getElementById('faculty').addEventListener('change', faculty);
document.getElementById('room').addEventListener('change', room);
document.getElementById('batch').addEventListener('change', batch);
document.getElementById('tut').addEventListener('change', tutorial);

