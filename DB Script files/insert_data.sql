insert into class values(1,'SSH','FY','A');
insert into class values(2,'SSH','FY','B');
insert into class values(3,'SSH','FY','C');
insert into class values(4,'SSH','FY','D');
insert into class values(5,'SSH','FY','E');
insert into class values(6,'SSH','FY','F');
insert into class values(7,'SSH','FY','G');
insert into class values(8,'SSH','FY','H');
insert into class values(9,'SSH','FY','I');
insert into class values(10,'SSH','FY','J');
insert into class values(11,'COMPS','SY','A');
insert into class values(12,'COMPS','SY','B');
insert into class values(13,'COMPS','TY','A');
insert into class values(14,'COMPS','TY','B');
insert into class values(15,'COMPS','LY','A');
insert into class values(16,'COMPS','LY','B');
insert into class values(17,'IT','SY','A');
insert into class values(18,'IT','SY','B');
insert into class values(19,'IT','TY','A');
insert into class values(20,'IT','TY','B');
insert into class values(21,'IT','LY','A');
insert into class values(22,'IT','LY','B');
insert into class values(23,'EXTC','SY','A');
insert into class values(24,'EXTC','SY','B');
insert into class values(25,'EXTC','TY','A');
insert into class values(26,'EXTC','TY','B');
insert into class values(27,'EXTC','LY','A');
insert into class values(28,'EXTC','LY','B');
insert into class values(29,'ETRX','SY','A');
insert into class values(30,'ETRX','SY','B');
insert into class values(31,'ETRX','TY','A');
insert into class values(32,'ETRX','TY','B');
insert into class values(33,'ETRX','LY','A');
insert into class values(34,'ETRX','LY','B');
insert into class values(35,'MECH','SY','A');
insert into class values(36,'MECH','SY','B');
insert into class values(37,'MECH','TY','A');
insert into class values(38,'MECH','TY','B');
insert into class values(39,'MECH','LY','A');
insert into class values(40,'MECH','LY','B');

/*Inserting data into faculty table*/
insert into faculty values('SNM','Swati Mali','COMPS',18,0);
insert into faculty values('ARJ','Anooja Joy','IT',16,0);
insert into faculty values('RBS','Ravindra Salvi','SSH',17,0);
insert into faculty values('VPV','Vaibhav Vasani','COMPS',17,0);
insert into faculty values('ASC','Anjali Chachra','COMPS',15,0);
insert into faculty values('MMK','Manasi Kambli','COMPS',17,0);
insert into faculty values('ASD','Algonda Desai','SSH',15,0);
insert into faculty values('GSS','Gopal Sonune','COMPS',16,0);
insert into faculty values('PSP','Suchita Patil','COMPS',16,0);
insert into faculty values('RAN','Rohini Nair','COMPS',16,0);
insert into faculty values('AAG','Archana Gupta','COMPS',16,0);
insert into faculty values('RNP','Rajani Pamnani','COMPS',16,0);
insert into faculty values('PMB','Poonam Bhogale','COMPS',16,0);
insert into faculty values('BDA','Babaso Aldar','COMPS',16,0);
insert into faculty values('JVJ','Jyoti Joglekar','COMPS',16,0);
insert into faculty values('BHN','Bharati H N','COMPS',16,0);
insert into faculty values('BNP','Bhakti Palkar','COMPS',16,0);
insert into faculty values('PJS','Prasanna Shette','COMPS',16,0);
insert into faculty values('SCP','Swapnil Pawar','COMPS',16,0);
insert into faculty values('SDC','Shweta Chachra','COMPS',16,0);
insert into faculty values('PYB','Pradnya Bhangale','COMPS',16,0);
insert into faculty values('RRP','Ruchika Patil','COMPS',16,0);
insert into faculty values('SIP','Sheetal Pereira','COMPS',16,0);
insert into faculty values('UBJ','Uday Joshi','COMPS',16,0);
insert into faculty values('','','',0,0);
select * from faculty;

/*Inserting data into subject*/
insert into subject values('A-BDASpark','Big Data Analysis with Spark');
insert into subject values('A-DAUT','Data Analysis Using Tableau');
insert into subject values('IOT','Internet Of Things');
insert into subject values('CSM','Computer Simulation and Modelling');
insert into subject values('DWM','Data warehousing & Mining');
insert into subject values('PROJECT-I','Project-I');
/* Comps sem V */
insert into subject values('OS','Operating Systems');
insert into subject values('DN','Data Networks');
insert into subject values('TCS','Theory of Computer Science');
insert into subject values('ADBMS','Advanced Database Management System');
insert into subject values('SE','Software Engineering');
insert into subject values('WT','Web Technology');

/* Comps sem IV */
insert into subject values('AM-IV','Maths IV');
insert into subject values('DCN', 'Data Communication and Networking');
insert into subject values('AOA', 'Analysis of Algorithms');
insert into subject values('MP', 'Microprocessor');
insert into subject values('DBMS', 'Database Management Systems');
insert into subject values('SL', 'System Lab');

/* Comps sem III */
insert into subject values('AM-III','Maths III');
insert into subject values('DS','Data Structures');
insert into subject values('COA','Computer Organisation & Architecture');
insert into subject values('DSGT','Discrete Structure & Graph Theory');
insert into subject values('OOPM','Object Oriented Programming Methodology');
insert into subject values('DD','Digital Design');

/*FY*/
insert into subject values('AM-I','Maths I');
insert into subject values('AP-I','Physics I');
insert into subject values('AC-I','Applied Chemistry I');
insert into subject values('ED','Engineering Drawing');
insert into subject values('EVS','Environmental Studies');
insert into subject values('CS','Communication Skills');
insert into subject values('AM-II','Maths II');
insert into subject values('AP-II','Physics II');
insert into subject values('AC-II','Applied Chemistry II');
insert into subject values('FCP','Fundamentals of Computer Programming');
insert into subject values('BEEE','Basics of Electronics & Electrical Engineering');


/*inserting into subj_dept_sem table*/
insert into subj_dept_sem(subjid,dept,sem) values('A-BDASpark','COMPS','5');
insert into subj_dept_sem(subjid,dept,sem) values('A-DAUT','COMPS','5');

insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('OS','COMPS',5,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('DN','COMPS',5,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('TCS','COMPS',5,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('ADBMS','COMPS',5,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('SE','COMPS',5,3,2);
insert into subj_dept_sem(subjid,dept,sem,lab,tut) values('WT','COMPS',5,2,1);

insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('DBMS','COMPS',4,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('AOA','COMPS',4,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('DCN','COMPS',4,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('AM-IV','COMPS',4,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('MP','COMPS',4,3,1);
insert into subj_dept_sem(subjid,dept,sem,lab) values('SL','COMPS',4,2);


insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('AM-I','SSH',1,4,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('AP-I','SSH',1,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('AC-I','SSH',1,3,2);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('AM-II','SSH',2,4,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('AP-II','SSH',2,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('AC-II','SSH',2,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('AOA','IT',4,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('DCN','IT',4,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,tut) values('AM-III','COMPS',3,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('IOT','COMPS',7,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('CSM','COMPS',7,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec,lab) values('DWM','COMPS',7,3,1);
insert into subj_dept_sem(subjid,dept,sem,lec) values('A-BDASpark','COMPS',5,2);
insert into subj_dept_sem(subjid,dept,sem,lec) values('A-DAUT','COMPS',5,2);
insert into subj_dept_sem(subjid,dept,sem,lec) values('PROJECT-I','COMPS',7,4);
insert into subj_dept_sem(subjid,dept,sem,lec) values('PROJECT-I','IT',7,4);
insert into subj_dept_sem(subjid,dept,sem,lec) values('PROJECT-I','ETRX',7,4);
insert into subj_dept_sem(subjid,dept,sem,lec) values('PROJECT-I','EXTC',7,4);
insert into subj_dept_sem(subjid,dept,sem,lec) values('PROJECT-I','MECH',7,4);
select * from subj_dept_sem where subjid='DWM';



/*Inserting data into teaches table*/
insert into teaches values('MMK','MP');
insert into teaches values('VPV','DBMS');
insert into teaches values('SNM','OS');
insert into teaches values('SNM','DS');
insert into teaches values('ARJ','AOA');
insert into teaches values('GSS','DCN');
insert into teaches values('ASC', 'AOA');
insert into teaches values('ASC', 'AM-IV');
insert into teaches values('RBS','AM-III');
insert into teaches values('RBS','AM-IV');

insert into batch values(1,11,4);
insert into batch values(2,12,1);
insert into batch values(3,17,3);
insert into batch values(4,17,2);
insert into batch values(5,11,3);

insert into slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(1,13,'RAN','SE','B205','Monday','10:30','11:30','lec');
    
insert into slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(2,13,'RNP','TCS','B205','Monday','11:30','12:30','lec');
    
insert into slot(slot_id, cid, bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(3,13,1,'GSS','DN','B217','Monday','1:15','3:15','lab');
    
insert into slot(slot_id, cid, bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(4,13,2,'JVJ','ADBMS','B116','Monday','1:15','3:15','lab');
    
insert into slot(slot_id, cid, bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(5,13,3,'PMB','SE','B210B','Monday','1:15','3:15','lab');
    
insert into slot(slot_id, cid, bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(6,13,4,'BDA','WT','B115','Monday','1:15','3:15','lab');
    
insert into slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(7,13,'AAG','ADBMS','B205','Monday','3:15','4:15','lec');
    
insert into slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(8,13,'AAG','ADBMS','B205','Tuesday','11:30','12:30','lec');
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(9,13,1,'BHN','ADBMS','B116','Tuesday','1:15','3:15','lab'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(10,13,2,'RAN','SE','B109','Tuesday','1:15','3:15','lab');  
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(11,13,3,'VPV','WT','B115','Tuesday','1:15','3:15','lab'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(12,13,4,'PSP','OS','B216','Tuesday','1:15','3:15','lab'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(13,13,1,'RNP','TCS','B205','Tuesday','3:15','4:15','tut'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(14,13,1,'BDA','WT','B115','Tuesday','4:15','5:15','tut'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(15,13,2,'BNP','DN','B217','Tuesday','3:15','5:15','lab'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(16,13,3,'AAG','ADBMS','B116','Tuesday','3:15','5:15','lab'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(17,13,4,'BDA','WT','B115','Tuesday','3:15','4:15','tut'); 
    
insert into slot(slot_id, cid,bid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(18,13,4,'RNP','TCS','B205','Tuesday','4:15','5:15','tut'); 
    
insert into slot(slot_id, cid, fid, subjid, room_no, weekday, start_time, end_time, flag)
	values(19,13,'AAG','ADBMS','B205','Friday','1:15','2:15','lec'); 
select count(*) from slot;
select * from slot order by slot_id desc;

select * from slot where flag='ele-lab';

delete from slot where slot_id in (125);

update slot
set bid = 3
where slot_id=117;
