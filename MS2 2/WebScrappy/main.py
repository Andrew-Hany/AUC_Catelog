import pandas as pd
import re


def handling_some_Entering(input):
    o = input.split()
    output = ''
    i = 0
    while i < len(o):
        output = output + ' ' + o[i]
        i = i + 1
    return output


coursess = {
    'code': {},
    'cr': {},
    'name': {},
    'description': {},
    'Prerequisites': {},
    'when_offered': {},
    'Notes': {},
    'cross_listes': {},
    'major': {}

}

# ----------------------------------------------------------

Course_data = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/courseData_2.csv')
Course_d = Course_data['description']

mylist = []

for Course_d_split in Course_d:  # indicate pages

    c = re.findall('([A-Z]+\s[0-9]+.+\s-\s.+\s\s.+)', Course_d_split)  # puting all course data inside one elemet
    mylist.extend(c)  # then concatenate all the courses in one list
    # print(c)

m = 0  # for majors
i = 0
for course in mylist:
    if re.findall('^(.+),Prerequisites', course):
        code_name_cr = re.findall('^(.+),Prerequisites', course)
    elif re.findall('^(.+),Notes', course):
        code_name_cr = re.findall('^(.+),Notes', course)
    else:
        code_name_cr = re.findall('^(.+),Description', course)
    # print(code_name)
    # code=code_name.split('\xa0-\xa0')[0]
    try:

        code = re.findall('^(.+)\s\s-\s', code_name_cr[0])
        coursess['code'][i] = code[0]
        name = re.findall('\s\s-\s\s(.+)\s\([0-9]', code_name_cr[0])
        coursess['name'][i] = name[0]
        cr = re.findall('\((.+)\W\)', code_name_cr[0])
        coursess['cr'][i] = cr[0]
        # ----------------Prerequisites-------------------//

        if re.findall('Prerequisites,(.+),Description', course):
            Prerequisites = re.findall('Prerequisites,(.+),Description', course)
        elif re.findall('Prerequisites,(.+),When Offered', course):
            Prerequisites = re.findall('Prerequisites,(.+),When Offered', course)
        elif re.findall('Prerequisites,(.+),Notes', course):
            Prerequisites = re.findall('Prerequisites,(.+),Notes', course)
        elif re.findall('Prerequisites,(.+),Cross-listed', course):
            Prerequisites = re.findall('Prerequisites,(.+),Cross-listed', course)
        elif re.findall('Prerequisites,(.+),Repeatable', course):
            Prerequisites = re.findall('Prerequisites,(.+),Repeatable', course)
        elif re.findall('Prerequisites,(.+)', course):
            Prerequisites = re.findall('Prerequisites,(.+)', course)
        else:
            Prerequisites = "N"
        coursess['Prerequisites'][i] = handling_some_Entering(Prerequisites[0])
        # ----------------description-------------------//
        if (re.findall('Description,(.+),Cross-listed', course)):
            Description = re.findall('Description,(.+),Cross-listed', course)
        elif (re.findall('Description,(.+),When Offered', course)):
            Description = re.findall('Description,(.+),When Offered', course)
        elif (re.findall('Description,(.+),Notes', course)):
            Description = re.findall('Description,(.+),Notes', course)
        elif (re.findall('Description,(.+),Repeatable', course)):
            Description = re.findall('Description,(.+),Repeatable', course)
        elif re.findall('Description,(.+)\.', course):
            Description = re.findall('Description,(.+)\.', course)
        else:
            Description = "N"

        coursess['description'][i] = handling_some_Entering(Description[0])

        # ----------------when_offered-------------------//
        if (re.findall('When Offered,(.+),Notes', course)):
            when_offered = re.findall('When Offered,(.+),Notes', course)
        elif (re.findall('When Offered,(.+),Cross-listed', course)):
            when_offered = re.findall('When Offered,(.+),Cross-listed', course)
        elif (re.findall('When Offered,(.+),Repeatable', course)):
            when_offered = re.findall('When Offered,(.+),Repeatable', course)
        elif re.findall('When Offered,(.+)', course):
            when_offered = re.findall('When Offered,(.+)', course)
        else:
            when_offered = "N"
        coursess['when_offered'][i] = handling_some_Entering(when_offered[0])
        # ----------------Cross-listed-------------------//
        if (re.findall('Cross-listed,(.+),Cross-listed', course)):
            Cross_listed = re.findall('Cross-listed,(.+),Cross-listed', course)
        elif (re.findall('Cross-listed,(.+),When Offered', course)):
            Cross_listed = re.findall('Cross-listed,(.+),When Offered', course)
        elif (re.findall('Cross-listed,(.+),Notes', course)):
            Cross_listed = re.findall('Cross-listed,(.+),Notes', course)
        elif (re.findall('Cross-listed,(.+),Repeatable', course)):
            Cross_listed = re.findall('Cross-listed,(.+),Repeatable', course)
        elif re.findall('Cross-listed,(.+)', course):
            Cross_listed = re.findall('Cross-listed,(.+)', course)
        else:
            Cross_listed = "N"
        coursess['cross_listes'][i] = handling_some_Entering(Cross_listed[0])
        # ----------------notes-------------------//
        if (re.findall('Notes,(.+),Cross-listed', course)):
            notes = re.findall('Notes,(.+),Cross-listed', course)
        elif (re.findall('Notes,(.+),Repeatable', course)):
            notes = re.findall('Notes,(.+),Repeatable', course)
        elif re.findall('Notes,(.+)', course):
            notes = re.findall('Notes,(.+)\.', course)
        else:
            notes = "N"
        coursess['Notes'][i] = notes[0]

        i = i + 1
        # print(Description[0])
        # print(i)
    except:

        x = 1

    # ----------------major-------------------//
# for code in coursess['code']:
#     # coursess['major'][i] = Major[m]
#     # print(coursess['code'][i][0:3])
#     try:
#         # print(coursess['code'][code+1][0:3])
#         if coursess['code'][code][0:3] != coursess['code'][code - 1][0:3]:
#             m = m + 1
#             if(coursess['code'][code][0:3]=="ALN"):
#                 m=m+1
#             elif (coursess['code'][code][0:3] == "ALW"):
#                 m = m - 1
#             elif (coursess['code'][code][0:3] == "ALI"):
#                 m = m + 1
#             # print(coursess['code'][code][0:3] + "  " + coursess['code'][code - 1][0:3] + " " + coursess['code'][
#             #     code] + " " + Major[m - 1])
#         else:
#             x = 1
#         coursess['major'][code] = Major[m]
#     except:
#         x = 1
# ------------ writing to csv-------------------

# print(coursess['code'][16])
# print(description)
# print(coursess['description'])
# print(coursess['code'][1])

# this contains all the data of the courses
df = pd.DataFrame(coursess,
                  columns=['code', 'name', 'cr', 'Prerequisites', 'description', 'cross_listes', 'when_offered',
                           'Notes'])
df.to_csv('./AUC_Catelog/AUC_Catelog/csv/Organized_Course_data.csv')

# ------------ writing to csv-------------------
# this contains the data of the prequists
prequ = {
    'code': {},
    'number': {},
    'Pre_code': {},
    'Prenumber': {},
    'conc': {}
}

i = 0
for pre in coursess['Prerequisites']:
    if re.findall('([A-Z]+\s[0-9]+)', coursess['Prerequisites'][pre]):
        code = re.findall('([A-Z]+)\s[0-9]+', coursess['Prerequisites'][pre])
        number = re.findall('[A-Z]+\s([0-9]+)', coursess['Prerequisites'][pre])
        if re.findall('(concurrent)', coursess['Prerequisites'][pre]):
            concr = True
        elif re.findall('(Concurrent)', coursess['Prerequisites'][pre]):
            concr = True
        elif re.findall('(concurrently)', coursess['Prerequisites'][pre]):
            concr = True
        else:
            concr = False;
        counter=0
        for  c in code :
            prequ['code'][i] = re.findall('([A-Z]+)\s[0-9]+',coursess['code'][pre])[0]
            prequ['number'][i] = re.findall('[A-Z].+/([0-9]+)', coursess['code'][pre])[0]
            prequ['Prenumber'][i] = number[counter]
            prequ['Pre_code'][i] = code[counter]
            try:
                if(code[counter+1]!=None):
                    prequ['conc'][i] = 0
            except:
                prequ['conc'][i] = int(concr)
                x=1
            counter = counter + 1
            i=i+1
        counter = 0
    # else:
    #     prequ['code'][i] = coursess['code'][pre]
    #     prequ['Pre_code'][i] = coursess['Prerequisites'][pre]
    #     i = i + 1

preq = pd.DataFrame(prequ, columns=['code', 'number','Pre_code','Prenumber', 'conc'])
preq.to_csv('./AUC_Catelog/AUC_Catelog/csv/preq_table.csv', index=False)

# ------------ writing to csv-------------------
# this contains the data of the majors

MajorName = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/Major_name.csv')

major = {
    'name': {},
    'code': {}
}
majors = MajorName["major"]
i = 0
for m in majors:
    major['name'][i] = m
    i = i + 1
MajorCode = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/Major_code.csv')
code = MajorCode['code']
i = 0
for m in majors:
    if m == "Accounting":
        major['code'][i] = "ACCT"
    elif m == "American Studies":
        major['code'][i] = "AMST"
    elif m == "Anthropology":
        major['code'][i] = "ANTH"
    elif m == "Applied Linguistics":
        major['code'][i] = "APLN"
    elif m == "Arab and Islamic Civilizations":
        major['code'][i] = "ARIC"
    elif m == "Arabic Language":
        major['code'][i] = "ALNG"
    elif m == "Arabic Language Intensive":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Colloquial Arabic":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Egyptian Culture":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Literature":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Media Arabic":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Reading the Qur’an":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Supervised Readings":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Translation":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive - Writing Arabic":
        major['code'][i] = "ALIN"
    elif m == "Arabic Language Intensive Summer":
        major['code'][i] = "ALIS"
    elif m == "Arabic Writing":
        major['code'][i] = "ALWT"
    elif m == "Architectural Engineering":
        major['code'][i] = "ARCH"
    elif m == "Biology":
        major['code'][i] = "BIOL"
    elif m == "Biotechnology":
        major['code'][i] = "BIOT"
    elif m == "Business Administration":
        major['code'][i] = "BADM"
    elif m == "Business School":
        major['code'][i] = "BUSC"
    elif m == "Center For Arabic Studies Abroad":
        major['code'][i] = "AIAS"
    elif m == "Chemistry":
        major['code'][i] = "CHEM"
    elif m == "Comparative Religion":
        major['code'][i] = "CREL"
    elif m == "Computer Science and Engineering":
        major['code'][i] = "CSCE"
    elif m == "Construction Engineering":
        major['code'][i] = "CENG"
    elif m == "Core Curriculum":
        major['code'][i] = "CORE"
    elif m == "Data Science":
        major['code'][i] = "DSCI"
    elif m == "Economics":
        major['code'][i] = "ECON"
    elif m == "Education":
        major['code'][i] = "EDUC"
    elif m == "Egyptology":
        major['code'][i] = "EGPT"
    elif m == "Electronics and Communications Engineering":
        major['code'][i] = "ECNG"
    elif m == "Engineering":
        major['code'][i] = "ENGR"
    elif m == "English":
        major['code'][i] = "ENGL"
    elif m == "English & Comparative Literature":
        major['code'][i] = "ECLT"
    elif m == "Entrepreneurship":
        major['code'][i] = "ENTR"
    elif m == "Environmental Engineering":
        major['code'][i] = "ENVE"
    elif m == "Executive Business Administration":
        major['code'][i] = "EMBA"
    elif m == "Film":
        major['code'][i] = "FILM"
    elif m == "Finance":
        major['code'][i] = "FINC"
    elif m == "Gender and Women’s Studies":
        major['code'][i] = "GWST"
    elif m == "Global Public Health":
        major['code'][i] = "GHHE"
    elif m == "Graphic Design":
        major['code'][i] = "DSGN"
    elif m == "History":
        major['code'][i] = "HIST"
    elif m == "Intensive English":
        major['code'][i] = "ELIN"
    elif m == "International Business":
        major['code'][i] = "INTB"
    elif m == "International Human Rights Law":
        major['code'][i] = "LAW"
    elif m == "International Management":
        major['code'][i] = "CEMS"
    elif m == "Journalism & Mass Communication":
        major['code'][i] = "JRMC"
    elif m == "Libraries and Learning Technologies":
        major['code'][i] = "LALT"
    elif m == "Linguistics":
        major['code'][i] = "LING"
    elif m == "LAW":
        major['code'][i] = "LAW"
    elif m == "Management":
        major['code'][i] = "MGMT"
    elif m == "Management of Information Systems":
        major['code'][i] = "MOIS"
    elif m == "Marketing":
        major['code'][i] = "MKTG"
    elif m == "Mathematics and Actuarial Science":
        major['code'][i] = "MACT"
    elif m == "Mechanical Engineering":
        major['code'][i] = "MENG"
    elif m == "Middle East Studies":
        major['code'][i] = "MEST"
    elif m == "Migration & Refugee Studies":
        major['code'][i] = "MRS"
    elif m == "Music":
        major['code'][i] = "MUSC"
    elif m == "Nanotechnology":
        major['code'][i] = "NANO"
    elif m == "Operations Management":
        major['code'][i] = "OPMG"
    elif m == "Petroleum Engineering":
        major['code'][i] = "PENG"
    elif m == "Ph.D. in Applied Sciences":
        major['code'][i] = "PHDS"
    elif m == "Ph.D. in Engineering":
        major['code'][i] = "PHDE"
    elif m == "Philosophy":
        major['code'][i] = "PHIL"
    elif m == "Physics":
        major['code'][i] = "PHYS"
    elif m == "Political Science":
        major['code'][i] = "POLS"
    elif m == "Production /Operations Management":
        major['code'][i] = "OPMG"
    elif m == "Psychology":
        major['code'][i] = "PSYC"
    elif m == "Public Policy and Administration":
        major['code'][i] = "PPAD"
    elif m == "Rhetoric and Composition":
        major['code'][i] = "RHET"
    elif m == "Robotics, Control and Smart Systems":
        major['code'][i] = "RCSS"
    elif m == "Sociology":
        major['code'][i] = "SOC"
    elif m == "Sociology-Anthropology":
        major['code'][i] = "SOC/ANTH"
    elif m == "Sustainable Development":
        major['code'][i] = "GREN"
    elif m == "Teaching & Learning":
        major['code'][i] = "TEAL"
    elif m == "Theatre":
        major['code'][i] = "THTR"
    elif m == "Television and Digital Journalism":
        major['code'][i] = "TVDJ"
    elif m == "Translation Studies":
        major['code'][i] = "TRST"
    elif m == "Visual Arts":
        major['code'][i] = "ARTV"
    elif m == "Science":
        major['code'][i] = "SCI"
    elif m == "Seminar":
        major['code'][i] = "SEMR"
    else:
        major['code'][i] = "N"

    i = i + 1

maj = pd.DataFrame(major, columns=['name', 'code'])
maj.to_csv('./AUC_Catelog/AUC_Catelog/csv/Major_table.csv', index=False)

# -------------------Course_Table Table-----------------
courses_Dataa = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/Organized_Course_data.csv')
Course_Table = {
    'code': {},
    'number': {},
    'name': {},
    'cr': {},
    'description': {},
    'Notes': {},
    'cross_listes_code':{},

}
i = 0
for c in courses_Dataa['code']:
    Course_Table['code'][i] = re.findall('([A-Z]+)', c)[0]
    Course_Table['number'][i] = re.findall('/([0-9]+)', c)[0]
    Course_Table['cr'][i] = re.findall('([0-9])', courses_Dataa['cr'][i])[0]
    Course_Table['name'][i] = courses_Dataa['name'][i]
    Course_Table['description'][i] = courses_Dataa['description'][i]
    Course_Table['Notes'][i] = courses_Dataa['Notes'][i]
    i = i + 1

couTable = pd.DataFrame(Course_Table, columns=['code', 'number', 'name', 'cr', 'description', 'Notes'])
couTable.to_csv('./AUC_Catelog/AUC_Catelog/csv/Course_table.csv', index=False)
# -------------------CourseSem_Table Table-----------------

courses_Dataa = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/Organized_Course_data.csv')
Course_Table = {
    'code': {},
    'number': {},
    'sem': {},
}
cc = 0
i = 0
for c in courses_Dataa['code']:
    if re.findall('(fall)', courses_Dataa['when_offered'][cc]):
        Course_Table['code'][i] = re.findall('([A-Z]+)', c)[0]
        Course_Table['number'][i] = re.findall('/([0-9]+)', c)[0]
        Course_Table['sem'][i] = re.findall('(fall)', courses_Dataa['when_offered'][cc])[0]
        i = i + 1
    if re.findall('(spring)', courses_Dataa['when_offered'][cc]):
        Course_Table['code'][i] = re.findall('([A-Z]+)', c)[0]
        Course_Table['number'][i] = re.findall('/([0-9]+)', c)[0]
        Course_Table['sem'][i] = re.findall('(spring)', courses_Dataa['when_offered'][cc])[0]
        i = i + 1
    if re.findall('(winter)', courses_Dataa['when_offered'][cc]):
        Course_Table['code'][i] = re.findall('([A-Z]+)', c)[0]
        Course_Table['number'][i] = re.findall('/([0-9]+)', c)[0]
        Course_Table['sem'][i] = re.findall('(winter)', courses_Dataa['when_offered'][cc])[0]
        i = i + 1
    if re.findall('(summer)', courses_Dataa['when_offered'][cc]):
        Course_Table['code'][i] = re.findall('([A-Z]+)', c)[0]
        Course_Table['number'][i] = re.findall('/([0-9]+)', c)[0]
        Course_Table['sem'][i] = re.findall('(summer)', courses_Dataa['when_offered'][cc])[0]
        i = i + 1
    cc = cc + 1

CourSem = pd.DataFrame(Course_Table, columns=['code', 'number', 'sem'])
CourSem.to_csv('./AUC_Catelog/AUC_Catelog/csv/CourseSem_Table.csv', index=False)
# -------------------crossListed_Table Table-----------------
courses_Dataa = pd.read_csv('./AUC_Catelog/AUC_Catelog/csv/Organized_Course_data.csv')
CourseListed_Table = {
    'code': {},
    'number': {},
    'Cross_code': {},
    'Cross_number': {},
}

i = 0

for pre in coursess['cross_listes']:
    if re.findall('([A-Z]+\s[0-9]+)', coursess['cross_listes'][pre]):
        code = re.findall('([A-Z]+)\s[0-9]+', coursess['cross_listes'][pre])
        number = re.findall('[A-Z]+\s([0-9]+)', coursess['cross_listes'][pre])
        counter = 0
        for  c in code :
            CourseListed_Table['code'][i] = re.findall('([A-Z]+)\s[0-9]+',coursess['code'][pre])[0]
            CourseListed_Table['number'][i] = re.findall('[A-Z].+/([0-9]+)', coursess['code'][pre])[0]
            CourseListed_Table['Cross_number'][i] = number[counter]
            CourseListed_Table['Cross_code'][i] = code[counter]
            counter=counter+1
            i = i + 1
    counter = 0
crossListed = pd.DataFrame(CourseListed_Table, columns=['code', 'number', 'Cross_code','Cross_number'])
crossListed.to_csv('./AUC_Catelog/AUC_Catelog/csv/crosListed_Table.csv', index=False)