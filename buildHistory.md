<style>
    c { color: firebrick; font-weight: bold; font-style: normal; display: block; }
    r { color: green; font-weight: bold; font-style: normal; display: block; }
</style>

## 27-01-2024

- Built out BackEnd from template previously used.
- Sourced links and material for the gallery screen.

## 28-01-2024

- Add collections for Socials and NavBar as these will be the first pulled through to the frontend.
- Moved issues and jobs to GITHub issues
  <c>Challenge - Mongodb have changed they authencation process so had to fix</c>

## 30-01-2024

- moved the app to version 2 as implementing authenication, .env file and structure like used previously.
- re-installed all dependancies to latest versions.

## 07-02-2024

- renamed repo from 03-PinkPantherBackEnd to justCoder-Node-Server
- updated the git file references to new name
- renamed the project too

## 10-02-2024

- Created a pinkpanther folder for routes
- redirected HTTP paths to pinkpanther prefix as this BE will be used for multiple FE now.
  <r>BE - Merged issue 13 into main - HTTP update</r>
  <c>Had to think how this would get split between FE apps now using 1 BE for all apps.</c>

## 11-02-2024

- Updated application to ES6 modules
  <r>BE - Merged issue 10 into main - ES6 Modules</r>
  <c>This was challenge to make sure all was working</c>

## 13-02-2024

- Updated app to use TypeScript

## 14-02-2024

- Add Typescript typing to project
  <r>BE - Merged issue 9 into main - TypeScript</r>
- checked build was OK in Cyclic
- Added linting and prettier to standardise formating of the code
  <r>BE - Merged issue 11 into main - Liniting</r>
- bug fix in History page pushed staright to main

handy video for express and typescript
https://youtu.be/KgnJNJk9-to?si=Dj3ZS98DQ5CYSID5

## 05-03-2024

- Updated models
- Added some helper widdleware

## 06-03-2024

- Added roles that users will be allocated
- register working
- login working
- all tested in postman
- put the token and fingerprint in cookies

## 07-03-2024

- Protected routes
- Added filter to navbar based on user role
- assisted user to the request object
