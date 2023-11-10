## DEAL  (Hiring Task)


**Author: Mohammad Attallah**

---

### Getting Started
Before starting the project, ensure that both the backend and frontend are set up.
```bash
npm install
```


#### Back end  
1- Create a .env file containing the following:

```
PORT=3000
DATABASE_URI = postgres://bla:5252@localhost:1234/Example
SECRET = "bla"

```
2- Run the server
```nodemon ```

#### Front-end  
1- Create a .env file containing the following:

```
VITE_BASE_URL=http://localhost:3000
```

2- Run the server 
  - ```npm run dev ```



*Create an admin user directly in the database to access the full website.*


## Routes 
#### Auth 
  - **Signup** 
    - **Route:** POST :/signup
    - **Description:** Creates a new user .
    - **Request Body:** JSON object containing user details 
```Json
    {
    "Name":"moh",
    "Username":"moh",
    "Password":"123",
    "Role":"admin",
    "Birthday":"11-12-1999",
    "Img":"https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Gender":"male",
    "email":"mohattallah@gmail.com"
}
```




### Tools & Technologies


#### Back-end 

```JavaScript, Node.js, Express.js, PostgreSQL,  JWT , REST API Design```

#### Front-end
```Javascript, React.js, Redux.js, Bootstrap, Cookies,JWT, Vite ```
