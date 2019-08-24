create database timetable;

create table faculty(
	fid varchar(4) not null primary key,
    fac_name varchar(200) not null,
    dept varchar(5) not null,
    max_work_hrs integer default 20, 
    worked_for_hrs integer default 0
);

create table subject(
	subjid varchar(10) not null primary key, 
    subj_name varchar(100) not null
);
drop table subject;

create table subj_dept_sem
(
	subjid varchar(10) not null,
    dept varchar(5) not null,
    sem integer not null,
    lec integer default 0,
    lab integer default 0,
    tut integer default 0,
    foreign key(subjid) references subject(subjid) ON UPDATE CASCADE ON DELETE CASCADE
);

alter table subj_dept_sem modify dept varchar(5) default null;
alter table subj_dept_sem modify sem integer default null;
drop table subj_dept_sem;

create table teaches (
	fid varchar(10) not null,
    subjid varchar(7) not null,
	foreign key(fid) references faculty(fid),
    foreign key(subjid) references subject(subjid) 
);

drop table teaches;

create table class(
	cid integer not null primary key,
    dept varchar(6) not null,
    year_of_study varchar(15) not null,
    division varchar(2) not null
);

create table batch(
	bid integer not null primary key,
    cid integer not null,
    batch_no integer not null,
    foreign key(cid) references class(cid)
);
create table slot(
    slot_id integer not null primary key,
    bid integer,
    cid integer not null,
    fid varchar(4) not null,
    subjid varchar(7) not null,
	room_no varchar(5), 
    weekday varchar(10),
    start_time time not null,
    end_time time not null,
    flag varchar(3) not null, 
    foreign key(bid) references batch(bid),
    foreign key(cid) references class(cid),
    foreign key(fid) references faculty(fid),
    foreign key(subjid) references subject(subjid)
);

alter table slot modify subjid varchar(12) not null;
alter table slot modify flag varchar(12) not null;
create table projectSlots(
	slot_id integer not null primary key,
    cid integer not null,
	room_no varchar(5), 
    weekday varchar(10),
    start_time time not null,
    end_time time not null, 
    foreign key(cid) references class(cid)
);

select * from projectSlots;

/*alter table faculty add constraint hourcheck check (worked_for_hrs<fac_max_hrs);*/
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';  

create table room(
	room_no  varchar(8) not null primary key,
    room_type varchar(15)
);

create table loginDetails(
	email varchar(50) not null primary key,
    pswd varchar(10) not null
);

drop table logindetails;
insert into logindetails values('girish.t@somaiya.edu', '1234');
insert into logindetails values('vaibhav.vasani@somaiya.edu', '5678');









