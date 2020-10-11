# Mo.Zen Mansuri
# DAIICT - 201912026

to run
    npm install
    nodemon

# set port to 3000.
# database file is in util folder (toddle.sql) - MySql( User:root, password:"")
# /login --- POST
    --> http://localhost:3000/login
            {"username":"zain","password":"password"}

    verify user from database.
        name of the database is toddle. Created using MySql. 
        database configuration file is located in util folder - database.js
Login Detail :
    -Id:Password
        zain:password
        user1:password
        user2:password

# if a user is not verified than you can't access user page.
# /user -- POST
    this page can be access by 4 option
        1. create survey(By current user) 
        2. view(of any user) 
        3.take(by current user) 
        4.result
` 1 create survey`
{
    "choice" : [
        {
            "no":1,
            "question":"one"
        },
         {
            "no":2,
            "question":"one two"
        }
    ]
}

` 2 View created Survey`
{
    "choice": [
        {
            "no": 2,
            "username": "zain"
        }
    ]
}

` 3 Take Survey`
{
    "choice": [
        {
            "no": 3,
            "surveyId": 1,
            "answer" : 0
        }, 
        {
            "no": 3,
            "surveyId": 2,
            "answer" : 1
        }
    ]
}

` 4 survey result `
{
    "choice": [
        {
            "no": 4
        }
    ]
}

# Download image and convert into 50X50px
# http://localhost:3000/imageDownloader -- POST
    {"imgURL" : "http://www.google.com/images/srpr/logo11w.png"}

    image are store into image folder with current-time_50x50.png format.

i am facing some issues with SqlLite :`( so i decided to use MySql instead : )
database file is in util folder in .sql and .json format.

# for API call i used Postman to send request.
