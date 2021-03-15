### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

```
cp .env.local .env
```

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create new database (let's say i'm going to use mysql and my database name is **encora-test**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=enocra-test   # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port

```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port
SECRET=secret           # secret key for encrypt/decrypt JWT token
```


### Migration and Seeders run
After creating database and updating .env file run below commands
```
> node_modules/.bin/sequelize db:migrate
> node_modules/.bin/sequelize db:seed:all

`npm start` to run your project 

>Everythig is setup and you are good to go now. Happy Coding :)
