**Lecture Scheduling Node.js Project**


This project facilitates the scheduling of lectures by providing an intuitive web interface for administrators and instructors. It leverages Express.js for the server and MongoDB for the database, with EJS templates for frontend rendering.

**Project Structure ->**


![Project Logo](https://drive.google.com/uc?export=download&id=1lbpIZT2-4QTuutBAGqnvv0Hk2W52sCgZ)


**Running the Project**
1. Clone the repository.

2.Set up MongoDB on your local system and update the MongoDB URL in initDB.js to initialize the database.

3.Install nodemon globally for automatic server restarts: npm install -g nodemon.

4.Run the project: nodemon index.js.


**Project Features**


**- Administrator Access**

![Project Logo](https://drive.google.com/uc?export=download&id=1zWeQFuauf9KhkC8yRRaWqSaniK9sPiW4)

  
. **Login as Admin**: Use credentials ideamagix as username and idemagix as password.

. **Add Instructors**: Assign usernames and passwords to instructors.

. **Add Courses**: Add new courses to the system.

. **Assign Courses**: Assign courses to instructors for scheduling.

![Project Logo](https://drive.google.com/uc?export=download&id=16mmlsnnNVY9RfYdBR2UCKdEjT7xljwtt)


-**Instructor Access**
. **Login as Instructor**: Use the provided instructor credentials.

.**View Assigned Courses**: Access a dashboard displaying all assigned lecture lists.

  
- **Key Components**
. Express.js: Backend framework for handling HTTP requests and responses.
  
. MongoDB: NoSQL database for storing user login details, courses, and lecture lists.

. EJS Templates: Dynamic HTML rendering for frontend views.

**Project Usage**
  -**Admin Actions:**
  
   . Navigate to /login and log in with admin credentials.
   
   . Access admin dashboard for adding instructors, courses, and assigning courses.
   

 - **Instructor Actions:**


![Project Logo](https://drive.google.com/uc?export=download&id=1GjGasv5vudGXBQTM7mHWJhKaV_nwKW_w)

. Log in as an instructor using the provided credentials.

. View assigned courses on the instructor dashboard.


- **Notes**
. Basic UI and minimal validation have been implemented for functionality.
  
. Ensure proper MongoDB setup and connection for the project to function correctly.


**- Credentials**

**Admin:**

Username: ideamagix

Password: idemagix

**Instructor:**

Username: ideamagixInstructor

Password: ideamagixInstructor



**Feel free to explore and contribute to the project!**







