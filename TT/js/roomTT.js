var brnName, sem, subjName, slot, facName, batchNo;
var IDset = new Set ();
var roomNo;
var totalLoad = 0, theoryLoad = 0, practicalLoad = 0;
var newlyAddedSlotIds = new Set ();
function getIdAfter (day) {
  if (day == 'two') return 'one';
  if (day == 'three') return 'two';
  if (day == 'four') return 'three';
  if (day == 'five') return 'four';
  if (day == 'six') return 'five';
  if (day == 'seven') return 'six';
}

// Putting already assigned slots of a division on GUI...
function getRoomAssignedSlot () {
  let r = document.getElementById ('room');
  roomNo = r.options[r.selectedIndex].text;
  document.getElementById ('roomNumber').innerText +=
    ' ' + roomNo.split ('')[0] + '-' + roomNo.substring (1, 4);
  var xhr = new XMLHttpRequest ();
  var url = 'php/room.php';
  var params = 'room=' + roomNo;
  xhr.open ('GET', url + '?' + params, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var resp = xhr.responseText;
      var row = resp.split ('\n');
      console.log (row);
      for (var i = 0; i < row.length - 1; i++) {
        my_slot = row[i].toString ().split ('/');
        // Flag of the returned data will be lec if its a lecture slot...
        if (my_slot[4] == 'lec') {
          totalLoad += 1;
          theoryLoad += 1;
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          document.getElementById (id).innerHTML =
            my_slot[1] +
            ' ' +
            my_slot[0] +
            ' ' +
            my_slot[2] +
            '<br>' +
            my_slot[5] +
            ' ' +
            my_slot[6];
        } else if (my_slot[4] == 'ac') {
          totalLoad += 1;
          theoryLoad += 1;
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          console.log ('id = ', id);
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          document.getElementById (id).innerHTML =
            my_slot[5] + ' ' + my_slot[6];
        } else if (my_slot[4] == 'ele-lec') {
          totalLoad += 1;
          theoryLoad += 1;
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          document.getElementById (
            id
          ).innerText += `${my_slot[5]} ${my_slot[6]}`;
        } else if (my_slot[4] == 'ele-lab') {
          totalLoad += 2;
          practicalLoad += 2;
          // Flag of the returned data will be ele-lab if its a elective-practical slot...
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          console.log ('id = ', id);

          if (id.split ('-').length == 3) {
            var eleToRemove = id.split ('-')[0] + '-' + id.split ('-')[2];
            var t = document.getElementById (eleToRemove);
            t.remove ();
            document.getElementById (
              id.split ('-')[0] + '-' + id.split ('-')[1]
            ).id = id;
            document.getElementById (id).setAttribute ('rowspan', 2);
            document.getElementById (
              id
            ).innerText += `${my_slot[5]}  ${my_slot[6]}`;
          }
        } else if (my_slot[4] == 'lab') {
          totalLoad += 2;
          practicalLoad += 2;
          // Flag of the returned data will be lab if its a lab slot...
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          var eleToRemove = id.split ('-')[0] + '-' + id.split ('-')[2];
          var t = document.getElementById (eleToRemove);
          t.remove ();
          document.getElementById (
            id.split ('-')[0] + '-' + id.split ('-')[1]
          ).id = id;
          document.getElementById (id).setAttribute ('rowspan', 2);
          document.getElementById (id).innerHTML =
            my_slot[1] +
            ' ' +
            my_slot[0] +
            ' ' +
            my_slot[2] +
            my_slot[3] +
            '<br>' +
            my_slot[5] +
            '<br>' +
            my_slot[6];
        } else if (my_slot[4] == 'tut') {
          // Flag of the returned data will be tut if its a tutorial slot...
          var id = '';
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);

          // If it is a 2hr tutorial slot
          if (id.split ('-').length == 3) {
            totalLoad += 2;
            practicalLoad += 2;
            var eleToRemove = id.split ('-')[0] + '-' + id.split ('-')[2];
            var t = document.getElementById (eleToRemove);
            t.remove ();
            document.getElementById (
              id.split ('-')[0] + '-' + id.split ('-')[1]
            ).id = id;
            document.getElementById (id).setAttribute ('rowspan', 2);
            document.getElementById (id).innerHTML =
              my_slot[1] +
              ' ' +
              my_slot[0] +
              ' ' +
              my_slot[2] +
              my_slot[3] +
              '<br>' +
              my_slot[5] +
              ' ' +
              my_slot[6];
          } else if (id.split ('-').length == 2) {
            totalLoad += 1;
            practicalLoad += 1;
            console.log ('id = ', id);
            // If it is a 1hr tutorial slot
            document.getElementById (id).innerHTML =
              my_slot[1] +
              ' ' +
              my_slot[0] +
              ' ' +
              my_slot[2] +
              my_slot[3] +
              '<br>' +
              my_slot[5] +
              ' ' +
              my_slot[6];
          }
        } else if (my_slot[4] == 'proj') {
          var id = '';
          theoryLoad += 1;
          totalLoad += 1;
          id += findDay (my_slot[7]) + '-';
          id += findSlot (my_slot[8], my_slot[9]);
          document.getElementById (
            id
          ).innerText += `${my_slot[1]} ${my_slot[0]} ${my_slot[2]} ${my_slot[5]} ${my_slot[6]}`;
        }
      }
    }
    document.getElementById (
      'theory-load'
    ).innerText = `THEORY LOAD: ${theoryLoad} HOURS/WEEK`;
    document.getElementById (
      'practical-load'
    ).innerText = `PRACTICAL LOAD: ${practicalLoad} HOURS/WEEK`;
    document.getElementById (
      'total-load'
    ).innerText = `TOTAL LOAD: ${totalLoad} HOURS/WEEK`;
  };
  xhr.send ();
}

// function for getting part of id(day) of the cell based on data...
function findDay (day) {
  switch (day) {
    case 'Monday':
      return 'mon';
    case 'Tuesday':
      return 'tue';
    case 'Wednesday':
      return 'wed';
    case 'Thursday':
      return 'thu';
    case 'Friday':
      return 'fri';
    default:
      return '';
  }
}

// function for getting part of id(slot_time) of the cell based on data...
function findSlot (start, end) {
  if (start == '09:30:00' && end == '10:30:00') return 'one';
  if (start == '10:30:00' && end == '11:30:00') return 'two';
  if (start == '11:30:00' && end == '12:30:00') return 'three';
  if (start == '01:15:00' && end == '02:15:00') return 'four';
  if (start == '02:15:00' && end == '03:15:00') return 'five';
  if (start == '03:15:00' && end == '04:15:00') return 'six';
  if (start == '04:15:00' && end == '05:15:00') return 'seven';
  else if (start == '09:30:00' && end == '11:30:00') return 'one-two';
  else if (start == '10:30:00' && end == '12:30:00') return 'two-three';
  else if (start == '01:15:00' && end == '03:15:00') return 'four-five';
  else if (start == '02:15:00' && end == '04:15:00') return 'five-six';
  else if (start == '03:15:00' && end == '05:15:00') return 'six-seven';
  else return '';
}
if (new Date ().getMonth () >= 4 && new Date ().getMonth () <= 7) {
  document.getElementById ('semesterType').innerText += ' ODD';
}
if (
  new Date ().getMonth () == 10 ||
  new Date ().getMonth () == 11 ||
  new Date ().getMonth () == 0 ||
  new Date ().getMonth () == 1
) {
  document.getElementById ('semesterType').innerText += ' EVEN';
}

var n = new Date ().getFullYear () + 1;
document.getElementById ('acad_year').innerText +=
  ` ${new Date ().getFullYear ()}` + '-' + `${n}`;
document
  .getElementById ('room')
  .addEventListener ('change', getRoomAssignedSlot);
