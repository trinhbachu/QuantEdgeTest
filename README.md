# QuantEdgeTest
To test and run this project, do the below steps:
1- connect mongodb to database folder:
	Install mongodb.
	Open cmd (Command line).
	Drag mongod.exe file into command line.
	Type "--dbpath".
	Drag database folder into command line.
	The complete command in command line looks like "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath C:\Users\Administrator\Desktop\QuantEdgeTest-master\database
depend on your own folder.	
	Press Enter, wait until it stops and last line contain number 27017.
	That means database connected.
	
2- npm install in client folder and server folder.
	This step requires nodejs installed global.
	
	Open cmd (Command line) in client folder.
	Run command npm install.
	Wait until it finished.
	Do the same to server folder.
	
3- use jest command to do unit test or npm test to do coverage test in client/server folder.
	This step requires jest package installed global.
	
	Open cmd (Command line) in the client folder.
	Run command jest to do unit test.
	Run command npm test to do coverage test.
	Do the same to server folder.

4- run command ng build in client folder and then use npm start in server folder to run project.
	This step requires angular and nodejs installed global.
	
	Open cmd (Command line) in the client folder.
	Run command ng build.
	Wait until it finished.
	Open cmd (Command line) in the server folder.
	Run command npm start.
	Wait until console line show "Server is running".
	Open browser with url: localhost:3000 or whatever port you set to check the result.
	