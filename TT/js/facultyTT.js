var brnName, sem, subjName, slot, facName, batchNo;
var facBusySlotIds = [];
var IDset = new Set ();
var newlyAddedSlotIds = new Set ();
var totalLoad = 0;
var theoryLoad = 0, practicalLoad = 0;

const getIdAfter = (x, y) => {
  var id = '';
  if (f == 'one') {
    return day;
  }
  if (f == 'two') id = day + '-one';
  else if (f == 'three') id = day + '-two';
  else if (f == 'four') id = day + '-three';
  else if (f == 'five') id = day + '-four';
  else if (f == 'six') id = day + '-five';
  else if (f == 'seven') id = day + '-six';
  if (IDset.has (id)) return id;
  else {
    if (f == 'three') id = day + '-one-two';
    else if (f == 'four') id = day + '-two-three';
    else if (f == 'six') id = day + '-four-five';
    return id;
  }
};

// Showing faculty assogned slots on the GUI....
const putfacultyAssignedSlot = () => {
  console.log (IDset);
  var xhr = new XMLHttpRequest ();
  var url = 'php/facultyTT.php';
  var resp;
  var params = 'fid=' + facName.split (':')[0].toString ();
  xhr.open ('GET', url + '?' + params, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      resp = xhr.responseText;
      var row = resp.split ('\n');
      for (var i = 0; i < row.length - 1; i++) {
        my_slot = row[i].toString ().split ('/');
        var id = findDay (my_slot[0]) + '-';
        id += findSlot (my_slot[1], my_slot[2]);
        // length of the id will be three if the slot is lab/2 hour tutorial slot.....
        if (id.split ('-').length == 3) {
          var sl = id.split ('-');
          var t = document.getElementById (sl[0] + '-' + sl[2]);
          if (t != null) {
            practicalLoad += 2;
            totalLoad += 2;
            IDset.delete (sl[0] + '-' + sl[2]);
            t.remove ();
            document
              .getElementById (sl[0] + '-' + sl[1])
              .setAttribute ('rowspan', 2);
            document.getElementById (sl[0] + '-' + sl[1]).id = id;
            IDset.delete (sl[0] + '-' + sl[1]);
            IDset.add (id);
            document.getElementById (id).innerHTML +=
              my_slot[3] +
              ' ' +
              my_slot[4] +
              ' ' +
              my_slot[5] +
              my_slot[6] +
              '<br>' +
              my_slot[7] +
              '<br>' +
              my_slot[8];
          }
        } else if (id.split ('-').length == 2) {
          totalLoad += 1;
          if (my_slot[9] == 'tut') practicalLoad += 1;
          else theoryLoad += 1;
          if (my_slot[6] == '') {
            document.getElementById (id).innerHTML +=
              my_slot[3] +
              ' ' +
              my_slot[4] +
              ' ' +
              my_slot[5] +
              '<br>' +
              my_slot[7] +
              '<br>' +
              my_slot[8];
            facBusySlotIds.push (id);
          } else {
            document.getElementById (id).innerHTML +=
              my_slot[3] +
              ' ' +
              my_slot[4] +
              ' ' +
              my_slot[5] +
              my_slot[6] +
              '<br>' +
              my_slot[7] +
              '<br>' +
              my_slot[8];
            facBusySlotIds.push (id);
          }
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
};

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

function branch () {
  let brn = document.getElementById ('branch');
  brnName = brn.options[brn.selectedIndex].text;
  document.getElementById ('branch').disabled = true;
  var xhr = new XMLHttpRequest ();
  var url = 'php/faculty.php';
  var resp;
  var params = 'dept=' + brnName.toString () + '&fid=0';
  xhr.open ('GET', url + '?' + params, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      resp = xhr.responseText;
      var row = resp.split ('\n');
      for (var i = 0; i < row.length - 1; i++)
        document.getElementById ('faculty').options[i + 1] = new Option (
          row[i]
        );
    }
  };
  xhr.send ();
}

function faculty () {
  let fc = document.getElementById ('faculty');
  facName = fc.options[fc.selectedIndex].text;
  document.getElementById ('nameDisplay').innerText +=
    ' ' + facName.split (':')[1] + ' (' + facName.split (':')[0] + ')';
  //$('#myTable').load('facultyTT.html');
  //document.getElementById('faculty').disabled = true;
  putfacultyAssignedSlot ();
  // window.setTimeout(function(){location.reload(true);}, 3000);
}

function slotIDAdder () {
  for (var i = 1; i <= 35; i++) {
    var id = '';
    if (i >= 1 && i <= 7) id = 'mon';
    else if (i >= 8 && i <= 14) id = 'tue';
    else if (i >= 15 && i <= 21) id = 'wed';
    else if (i >= 22 && i <= 28) id = 'thu';
    else if (i >= 29 && i <= 35) id = 'fri';
    if (i % 7 == 0) id += '-' + 'one';
    else if (i % 7 == 1) id += '-' + 'two';
    else if (i % 7 == 2) id += '-' + 'three';
    else if (i % 7 == 3) id += '-' + 'four';
    else if (i % 7 == 4) id += '-' + 'five';
    else if (i % 7 == 5) id += '-' + 'six';
    else if (i % 7 == 6) id += '-' + 'seven';
    IDset.add (id);
  }
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
  ' ' + new Date ().getFullYear () + '-' + n;

slotIDAdder ();
document.getElementById ('branch').addEventListener ('change', branch);
document.getElementById ('faculty').addEventListener ('change', faculty);
