1. I initialize sequelize in my new project

```bash
➜ npx sequelize-cli init

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

Created "config/config.json"
Successfully created models folder at "/Users/rusinov/projects/oss/sequelize-model-example/models".
Successfully created migrations folder at "/Users/rusinov/projects/oss/sequelize-model-example/migrations".
Successfully created seeders folder at "/Users/rusinov/projects/oss/sequelize-model-example/seeders".
```

2. I create my first model with two columns: "firstName" and "lastName"

```bash
➜ npx sequelize-cli model:generate --name ExampleModel --attributes firstName:string,lastName:string
Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

New model was created at /Users/rusinov/projects/oss/sequelize-model-example/models/examplemodel.js .
New migration was created at /Users/rusinov/projects/oss/sequelize-model-example/migrations/20191010182858-ExampleModel.js .
```

3. I create database

```bash
➜ npx sequelize-cli db:create

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

Loaded configuration file "config/config.json".
Using environment "development".
(node:34753) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
Database database_development created.
```

4. Then run migrations

```bash
➜ npx sequelize-cli db:migrate

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

Loaded configuration file "config/config.json".
Using environment "development".
(node:34844) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
== 20191010182858-create-example-model: migrating =======
== 20191010182858-create-example-model: migrated (0.021s)
```

5. After a while I need new column -"email" on my table, so I try to regenerate model with `model:generate` command, after getting the error about `--force` flag I retry it and get my new model and migration created

```bash
➜ npx sequelize-cli model:generate --name ExampleModel --attributes firstName:string,lastName:string,email:string

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]


ERROR: The file /Users/rusinov/projects/oss/sequelize-model-example/models/examplemodel.js already exists. Run command with --force to overwrite it.

➜ npx sequelize-cli model:generate --name ExampleModel --attributes firstName:string,lastName:string,email:string --force

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

New model was created at /Users/rusinov/projects/oss/sequelize-model-example/models/examplemodel.js .
New migration was created at /Users/rusinov/projects/oss/sequelize-model-example/migrations/20191010183123-ExampleModel.js .
```

6. Then I undo migrations in my db

```bash
➜ npx sequelize-cli db:migrate:undo:all

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

Loaded configuration file "config/config.json".
Using environment "development".
(node:35286) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
== 20191010182858-create-example-model: reverting =======
== 20191010182858-create-example-model: reverted (0.017s)
```

7. And do migrations again

```
npx sequelize-cli db:migrate

Sequelize CLI [Node: 10.15.1, CLI: 5.5.1, ORM: 5.19.5]

Loaded configuration file "config/config.json".
Using environment "development".
(node:35377) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
== 20191010182858-create-example-model: migrating =======
== 20191010182858-create-example-model: migrated (0.022s)

== 20191010183123-create-example-model: migrating =======
== 20191010183123-create-example-model: migrated (0.006s)
```

Here is what I have in SequelizeMeta table after that:

```
name
-----
20191010182858-create-example-model.js
20191010183123-create-example-model.js
```

Model and latter migration both have "email" declared, but "email" column is not present in table "ExampleModels"


Note that I use the postgres db. Dont know if that matters, tho.
