create view facSubjTeaching as
select faculty.fid , fac_name, faculty.dept as fac_dept, subj_dept_sem.dept as subjForDept, subj_name, sem, lab, lec, tut 
from faculty inner join teaches on faculty.fid = teaches.fid 
inner join subject on teaches.subjid = subject.subjid
inner join subj_dept_sem on subj_dept_sem.subjid = subject.subjid;

select * from facSubjTeaching;

create or replace view facultyAssignedSlot as
select faculty.fid, fac_name, class.dept as class_dept, year_of_study, division, bid, subject.subjid, subj_name, room_no, weekday, start_time, end_time, flag as slotType
from faculty inner join slot on faculty.fid = slot.fid
inner join subject on subject.subjid = slot.subjid
inner join class on class.cid = slot.cid;  

select * from facultyAssignedSlot;

create or replace view classLectureSlot as
select class.cid, slot.fid, dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'lec'
inner join subject on subject.subjid = slot.subjid;

select * from classlectureslot;

create or replace view batchLabSlot as
select class.cid, slot.bid, slot.fid, class.dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'lab'
inner join subject on subject.subjid = slot.subjid
inner join faculty on slot.fid = faculty.fid;

select * from batchLabSlot;

create or replace view batchTutorialSlot as
select class.cid, slot.bid, slot.fid, class.dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'tut'
inner join subject on subject.subjid = slot.subjid 
inner join faculty on slot.fid = faculty.fid;

select * from batchTutorialSlot;

create or replace view subjectForDeptSem as
select subject.subjid, subj_name, dept, sem 
from subject inner join subj_dept_sem 
on subject.subjid = subj_dept_sem.subjid;

select * from subjectForDeptSem;

create or replace view roomAssignedSlot as
select room_no, slot.fid, class.dept, year_of_study, division, bid, flag, subject.subjid, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid
inner join subject on subject.subjid = slot.subjid 
inner join faculty on slot.fid = faculty.fid;

select * from roomAssignedSlot;

select * from classlectureslot;

create or replace view projectAssignedSlot as
select class.cid, class.dept, slot.fid, slot.subjid, year_of_study, division, room_no, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid where flag='proj';

select * from projectAssignedSlot;

create or replace view auditSlot as
select class.cid, slot.fid, dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'ac'
inner join subject on subject.subjid = slot.subjid;

select * from auditSlot;

create or replace view electiveLectureSlot as
select class.cid, slot.fid, dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'ele-lec'
inner join subject on subject.subjid = slot.subjid;

select * from electiveLectureSlot;

create or replace view electiveLabSlot as
select class.cid, slot.bid, slot.fid, class.dept, year_of_study, division, room_no, subject.subjid, subj_name, weekday, start_time, end_time
from class inner join slot on slot.cid = class.cid and slot.flag = 'ele-lab'
inner join subject on subject.subjid = slot.subjid
inner join faculty on slot.fid = faculty.fid;

select * from electiveLabSlot;



