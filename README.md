## Installation

Install the dependencies and devDependencies and start the server.
Import the database, attached to the repo, the name is "atm_omnidoc.sql"
Change the environment variables of the .env file

```sh
PORT=3000 'default'
DB_NAME = 'nameDatabse'
DB_HOST = 'localhost',
DB_USER = 'user from database'
DB_PSW= 'password from database'
```

then run the following commands in the root folder

```sh
npm i
npm start
```

The documentation is generated in the enpoint {{url}}:port/api/doc || http://localhost:3000/api/doc

I personally use Postman to test the API, I leave the configuration file called "APIOmniPostman.json"
