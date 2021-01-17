drop database if exists `sql12379028`;

create database if not exists `sql12379028`;

use `sql12379028`;



create table if not exists major (
major_name varchar(50),
major_code varchar(5) primary key 

);


create table if not exists course(
course_name varchar(100) , #DataBase
major_code varchar(5), #ACCT
course_number int,     #2002
credits_nom integer, 
description TEXT,  
notes Text,

constraint course_Pk primary key (major_code,course_number),
foreign key (major_code) references major(major_code)

);



create table if not exists courseSemester (
major_code varchar(5), #ACCT
course_number int,     #2002
semester varchar(50),
constraint courseSemester_Pk primary key (major_code,course_number,semester),
 foreign key (major_code,course_number) references course (major_code,course_number) 
);

create table if not exists 	CoursePreq (
major_code varchar(5), #ACCT
course_number int,     #2002
Preq_major_code varchar(5),
Preq_course_number int,     #2002
concurrently  bool,
 constraint CoursePreq_Pk primary key (major_code,course_number,Preq_major_code,Preq_course_number),
  foreign key (major_code) references course (major_code) ,
   foreign key (Preq_major_code) references course (major_code)
 );
 
 


 create table if not exists	Students (
 st_name varchar(50),
 ID BIGINT primary key,
 GPA FLOAT
 );
 

create table if not exists	StudentsMajor (
 ID BIGINT,
major_code varchar(5)  ,
 constraint StudentsMajor_Pk primary key (ID,major_code),
  foreign key (major_code) references major (major_code),
    foreign key (ID) references Students (ID)
 );
 
create table if not exists Took_course (
 ID BIGINT  ,
major_code varchar(5) ,
course_number int,
 letter_grade varchar(2),
 year YEAR,
 semester varchar(50),
   constraint Took_course_Pk primary key (ID,major_code,course_number),
foreign key (major_code,course_number) references course (major_code,course_number),
 foreign key (ID) references Students (ID)
  );

  create table if not exists	Review (
major_code varchar(5) ,
course_number int,
 ID BIGINT ,
 rating int , 
 Text_review text,
  constraint Review_Pk primary key (major_code,ID,course_number),
    foreign key (major_code,course_number) references course (major_code,course_number),
      foreign key (ID) references Students (ID)
   );
   

   create table if not exists Crosslisted (
    major_code varchar(5) ,
	course_number int ,
	cross_major_code varchar(5) ,
	cross_course_number int,
   constraint Crosslisted_Pk primary key (major_code,course_number,cross_major_code,cross_course_number),
    foreign key (major_code,course_number) references course(major_code,course_number),
      foreign key (cross_major_code,cross_course_number) references course (major_code,course_number) 
   );
 

