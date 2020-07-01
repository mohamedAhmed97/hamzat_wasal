# Hamzet-wasl-ITI-Graduation-project

**It is a project that represents professional platform that supports Arab creative content creators, The main aim is to enrich the knowledge about the latest and most efficient writing techniques, establish interactive online workshops with experienced writers who would act as mentors to guide them and produce innovative content.**

### Prerequisites

You should have `composer` installed. If you don't, install composer from [here](https://getcomposer.org/download/)
and for better understanding concerning how to setup the environment kindly watch (https://www.youtube.com/watch?v=QEZwOCCXask)
You should have npm or yarn installed from [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)


### Installation

**our Project consists of two branches (Backend -> Laravel) , (Frontend -> React) so please follow the all the followings steps to open our project**

### **1) Backend**

1. Clone Backend
    ```sh
    git clone --branch Backend https://github.com/mohamedAhmed97/hamzat-wasl-ITI-Graduation-project.git
    ```
2. cd into the project. 
    ```sh
    cd hamzet_wasl_backend
    ```
3.  Run this command to update composer packages
    ```sh
    composer update
    ```
4. Create a copy of your .env file
    ```sh
    cp .env.example .env
    ```
5. Generate an app encryption key
    ```sh
    php artisan key:generate
    ```
6. Create an empty database for our project
    Example: open mysql then run
    ```sh
    create database ITI_Graduation_Project;
    ```
    OR you can create an empty database with a different name and then you must change DB_DATABASE field in .env file.

7. In the .env file, add database information like (DB_USERNAME,DB_PASSWORD) to allow Laravel to connect to the database.

8. Migrate the database
    ```sh
    php artisan migrate
    ```
9. Seed the database (seed our permissions)
    ```sh
    php artisan db:seed --class PermissionSeeder
    ```
    
   Seed the database (seed the admin)
    ```sh
    php artisan db:seed --class CreateAdmin
    ```
     After the seed you can login as admin using the following credentials
    Email:
      ```sh
    admin@admin.com
    ```
    Password:
      ```sh
    password
    ```
    
10. Create symbolic link for images
    ```sh
    php artisan storage:link
    ```
11. Open up the server
    ```sh
    php artisan serve
    ```
12. Keep the server up and open a new window in terminal and type
     ```sh
    php artisan queue:work
    ```
    Please keep it up and don't close it.

### **2) Frontend**

1. Clone Frontend
    ```sh
    git clone --branch Frontend https://github.com/mohamedAhmed97/hamzat-wasl-ITI-Graduation-project.git
    ```
2. cd into the project. 
    ```sh
    cd hamzat-wasel-front-end
    ```
3.  Run this command to update npm packages
    ```sh
    npm update
    ```
4. Open up the server
    ```sh
    npm start
    ```
OR 
    ```
    yarn start
    ```
    
## Contributors
    * Mayar Yasser Lotfy Mohamed Elabbasy (Team Leader)
    * Mohamed Ahmed Ramadan Abd Allal Hamed
    * Ahmed Mamdouh Mohamed Morsi Shehab
    * Ahmed Tawfieck Mohamed Kamal
    
## Recommendation
* In order to understand how to use the website i recommend that you watch this video
 (https://drive.google.com/file/d/1eJbkqqykxF9iof0fMloa2RmwrarDUL1f/view?usp=sharing)

