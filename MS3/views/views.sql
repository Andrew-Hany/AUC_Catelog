


create view sql12379028.verifid_review as (
select r.ID,r.major_code,r.course_number,r.rating,r.Text_review,IF((tc.ID=r.ID and tc.major_code=r.major_code and tc.course_number =r.course_number), 1, 0) as verified from sql12379028.Review r
 left join  sql12379028.Took_course tc
 on tc.ID=r.ID and tc.major_code=r.major_code and tc.course_number =r.course_number);



select * from sql12379028.verifid_review 
