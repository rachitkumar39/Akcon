schema={
        "user":   
        {   
        "role": "",
        "email": "",
        "passing_year": "",
        "first_name": "",
        "last_name": "",
        "dob":  "",
        "gender":  "",
        "roll": "",
        "city":  "",
        "state":  "",
        "country":  "",
        "contact": "",
        "image": ""
        },
        "current_college":"",
        "current_organization":"",
        "current_position":"",
        "otp":"",
        "token": "",
        "password":"",
        "social_plateform": [],
        "education": [],
        "skills": [],
        "experience": []   
    }
social_plateform=[
                    {
				     "plateform_name":"",
				     "url":""
                    }   
                ]

education=[
            {
                "college_name": "",
				"degree_type": "",
                "degree_name": "",
                "year_from": "",
                "year_to":""
            }
        ]
skills=[
            {
                "name": ""
            }
        ]
experience=[
            {
                "company_name": "",
                "job_title": "",
                "exp_from": "",
                "exp_to": "",
                "currently_working_here": ""
            }
        ]
#required fields for API
register_=['role','email','passing_year','first_name','last_name','gender','contact']
login_=['email','password']
generateOtp_=['id']
verifyOtp_=['otp','id']
setpassword_=['new_password','confirm_password','id']
login_=['id','password']
social_plateform_=["name","url"]
education_=["college_name","degree_type","degree_name","year_from","year_to"]
skills_=["name"]
experience_=["id","company_name","job_title","exp_from","exp_to","currently_working_here"]
personal_=["first_name","last_name","current_college","current_organization","current_position","city","state","country"]


