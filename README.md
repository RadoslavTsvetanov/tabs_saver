_SELF HOSTED_

- will make a docker compose which just runs the laravel backend and a mysql db container
- will need to install the extension and there to configure the url to which you are sending snapshots

_NOT SELF HOSTED_

- just download the extension and create an account

_CHANGING THINGS_

- if you want to change the db so that its self hosted you need to change the db fields in .env
- after every change to the schema.graphql you need to

```bash
php artisan migrate
```

- and also write the implementations in the models folder and define the migration

- to start the backend by yourself run

```bash
php artisan server
```

-
