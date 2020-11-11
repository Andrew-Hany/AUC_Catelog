import mysql.connector
import pandas as pd



# print(courses['name'])

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='paterhany',
    database='catelog'
)
curr = conn.cursor()
i = 0
# -----------Major--------------------#
Major_table = pd.read_csv('./csv/Major_table.csv')
for c in Major_table['code']:
    try:

        curr.execute("""insert into `major` value (%s,%s)""", (
            Major_table['name'][i],
            Major_table['code'][i]
        ))
        i = i + 1
    except:
        # print(Major_table['code'][i])
        i = i + 1
        # -----------course--------------------#
        courses = pd.read_csv('./csv/Course_table.csv')
i = 0
for c in courses['name']:

    try:
        curr.execute("""insert into `course` value (%s,%s,%s,%s,%s,%s)""", (
            courses['name'][i],
            courses['code'][i],
            int(courses['number'][i]),
            int(courses['cr'][i]),
            courses['description'][i],
            courses['Notes'][i]
        ))

        i = i + 1

    except:
        # print(courses['code'][i] + " " + str(courses['number'][i]))
        i = i + 1
 # -----------courseSEM--------------------#
courseSem = pd.read_csv('./csv/CourseSem_Table.csv')
i = 0
for c in courseSem['code']:

    try:
        curr.execute("""insert into `courseSemester` value (%s,%s,%s)""", (
            courseSem['code'][i],
            int(courseSem['number'][i]),
            courseSem['sem'][i]

        ))

        i = i + 1

    except:
        # print(courseSem['code'][i] + " " + str(courseSem['number'][i]))
        i = i + 1
 # -----------Preq--------------------#
Preq = pd.read_csv('./csv/preq_table.csv')
i = 0
for c in Preq['code']:
    try:
        curr.execute("""insert into `CoursePreq` value (%s,%s,%s,%s,%s)""", (
            Preq['code'][i],
            int(Preq['number'][i]),
            Preq['Pre_code'][i],
            int(Preq['Prenumber'][i]),
            bool(Preq['conc'][i])

        ))

        i = i + 1

    except:
        # print(Preq['code'][i] + " " + str(Preq['number'][i])+" "+Preq['Pre_code'][i]+" "+str(Preq['Prenumber'][i]))
        i = i + 1

 # -----------Croslisted--------------------#
cross = pd.read_csv('./csv/crosListed_Table.csv')
i = 0
for c in cross['code']:
    try:
        curr.execute("""insert into `Crosslisted` value (%s,%s,%s,%s)""", (
            cross['code'][i],
            int(cross['number'][i]),
            cross['Cross_code'][i],
            int(cross['Cross_number'][i]),


        ))

        i = i + 1

    except:
        # print(cross['code'][i] + " " + str(cross['number'][i])+" "+cross['Cross_code'][i]+" "+str(cross['Cross_number'][i]))
        i = i + 1
conn.commit()
conn.close()
