# GuAPPi

A pet kintergarten

Info: A personal exercise of data exchange between angular components in front-end, and back-end and DB, responsive. Use of google API for angular 2 maps. Load and delete of image files. In the header with pull-down menu redirects to signup and user login and to dog management, made in the right part of the central zone. In the central left hand side, a map is shown that allows to mark the position of the registered dogs, the logged user and to mark the route between this and the last adopted dog or total adopted dos. In the lower part, dogs sent to a "kintergarten" are shown, which a user can "adopt".

# Client

This project client folder was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.1.
to Angular 2.

Later updated to Angular 4, and Angular 6.

# Server
This proyect Server folder was generated with [Express-Layout]()


# If you want to run this code in your PC:
## Development mode

(client with Angular and server with node/express)

You must add in client, folder /src a new folder /environment with two files
with your googlemap api KEY:


#### environment.prod.ts  with:
```
export const environment = {
  production: true,
  apiUrl:"",
  MY_APIKEY:<Your GOOGLEMAP API KEY>
}
```
### environment.ts with:
```
export const environment = {
  production: false,
  apiUrl:"http://localhost:3000",
  MY_APIKEY: <your GOOGLEMAP API KEY>
}
```

From your console:

Run your mongoDB data base.

In /server, run `npm start` or `npm run start-dev` for a dev Server on `http://localhost:3000. With start-dev you have nodemon and chrome inspect. Look at package.json.

In /client, run `ng serve` for a dev client. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the client source files.


## Production mode

After adding the two files (enviroment.ts and environment.prod.ts) as before

you must build the prod files, run in the client Angular:

`ng build --aot --prod`

Then, took from /dist folder the index.html and the four bundles files *.js and *.css and place o replace its in /public folder of the server. Note: You can see that files in this moment, but they are not functional because the googlemap api Key.

Run MongoDB.

Run `npm start` for a prod server (angular client is in prod files in /public folder). Navigate to `http://localhost:3000/`.
