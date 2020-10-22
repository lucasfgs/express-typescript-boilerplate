# Typescript project starter :zap:
A boilerplate with all you need to create a typescript project.

## Libs :books:

**Express:** HTTP Framework  
**Morgan:** HTTP Request Logger  
**Swagger:** API Documentation  
**TypeORM:** ORM  
**PostgreSQL:** SQL Database  

## Project structure folder :file_folder:

- src/config: Config files
- src/routes: Declaration of routes 
- src/controllers: Routes functions
- src/database/entities: Entities from database 
- src/database/migrations: Migrations
- src/docs: Swagger api documentation

## Usage :rocket:

```
    npm install
```

After install modules you should config some files:

> **ormconfig.json:** Put here every database config.

Then make a copy of ".env-example" as ".env" and fill the environment variables.

## TODO :heavy_check_mark:

- Authentication routes/middleware
- Tests

---

Make with :heart: by [Lucas Ferreira](https://github.com/lucasfgs)