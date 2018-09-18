# Ji_Home_Node_Server

##Technical requirements
* MySQL (Client + server);
* NodeJS 10+;

##First things first OR how to start working with the server side:
1.  Install the  typescript and ts-node globally by running the following command in the terminal:
    ```console
    npm install -g typescript ts-node
    ```
    
2. Шnstall the application by running the following command in the terminal:
    ```console
    npm install
    ```

3. Сreate .env file in root directory. Еhis file should contain the following data:
    ```PORT=your_db_name

    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
    DB_PORT=3306
    ```

4. Кun the server in the development mode by running the following command in the terminal:
    ```console
    npm run dev
    ```