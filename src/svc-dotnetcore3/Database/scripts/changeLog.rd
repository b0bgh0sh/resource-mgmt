Change 1: I will add projectStatus in seed_projectStatus. 
Assumptions for ProjectStatusTable: 
Presumably, the Project Status table is to used in conjunction with the projectStatus table.
Henceforth, the id of Project Status is a foreign key which refers to the Project Table. 

Assumptions for ProjectStatusTuples:
The range of id for Project is from 1-100. Henceforth, this is what I used. 
A random function was used to assign the statuses. 
There is no FromDate within UserHasProjects. Henceforth, this is not added. 
All ToDate wihtin UserHasProjects have '2021-11-11'. Henceforth, this is used. 
Here is the script that I made for populating: https://repl.it/repls/SpottedSimilarList

Change 2: I have added the columns FromDateYear,FromDateMonth, FromDateDay, ToDateYear, ToDateMonth, ToDateDay, so that it is easier
to select year, month and day for the backend. 
The user 'turcotter' the id is 3 and the locationId is 75. I have added all the projects with the corresponding locationID
The scripts are here: 
https://repl.it/repls/LeftWoodenCustomer
https://repl.it/repls/UnconsciousSpectacularOpentracker