# Negadras-Backend

A Node API backend for a Flutter-Node fullstack. The backend handles user authentication, user preferences, business management, business-owner data analytics, account management and data storage for the frontend. The repository for a frontend built with Flutter can be found [here](https://github.com/Aymen-Mohammednur/Negadras-Frontend).

This project uses MongoDB and Mongoose for data storage and data management.
For authentication, this project uses JWT authentication.

The api has been hosted [here](https://morning-tor-42791.herokuapp.com/api). Documentation has not been prepared, but is being worked on.


## How to run
1. Clone this repository <br>
>```git clone https://github.com/Aymen-Mohammednur/Negadras-Backend```
2. Set the following environment variables.
>MONGO_HOSTNAME=(`API host IP`)<br>
MONGO_PORT=(`DB Port`)<br>
MONGO_DB=negadras(`Recommended DB name`)<br>
ACCESS_KEY=(`DB access key`)<br>
API_PORT=(`API Port`)<br>
>
3. Install dependencies.<br>
 >`npm i`
4. Run the API. <br>
>`npm start`