# Welcome to BlogIt!

![Screenshot](/images/screenshot.png)

Hello there! Welcome to our anonymous blogging website!<br/>

Note: Please ignore folder `fingerprintjs`. It has been left in on purpose but doesnt work.

## Table of Contents

- [Installation & Usage](#installation--usage)
- [Technologies](#technologies)
- [Changelog](#changelog)
- [Challenges](#challenges)
- [Bugs](#bugs)
- [Future Implementations](#future--implementations)

## Installation & Usage

- Clone or download the repo
- Navigate to the `bloggers-anon` folder at the command line
- Run `bash _scripts/start.sh` to install dependencies and start the client and server
- When finished run `bash _scripts/stop.sh` to remove containers and volumes

### Testing

- Currently unable to run the test suite. You can trust us that all the tests would pass!

## Technologies used

- Docker
- Nodemon
- Cors
- Express
- pg
- http-server
- dayjs

## Changelog

Note: Read TRUTH.md for our initial ideas!

IN REVERSE ORDER FOR YOUR CONVENIENCE!

- Implement dayjs
- Add dayjs to package.json
- Delete unneeeded comments
- Rearrange fingerprint files
- (upstream/dev-richard) current system stats
- make SPA using 404.html w/ http-server
- add fetch requests to server
- Attempt to set up fingerprinting
- Rename variables
- Update single test
- Got INDEX, SHOW, and CREATE routes working
- Add --legacy-watch to npm start command
- Changed blogs_year_check to correct value
- Minor test suite updates
- Set up INDEX, SHOW, and CREATE routes
- Remove unwanted line
- Set up Blog class for GET, POST requests
- Set up integration tests for blog routes
- Set up test seeds and app - integrstion tests
- Renamed tables
- Add outline for DELETE route
- change input margins to paddings
- website layout complete
- Set up server.js
- Set up outline for blog routes
- Install npm packages
- Setup docker-compose.yaml
- Create db setup&seed files
- move index.html inside of client
- Create filebase
- basic setup for README and index.html
- source of truth

## Challenges

- Attempting to implement fingerprintjs in order to identify the posts submitted by a particular user

## Bugs

- dayjs doesn't work

## Future Implementations

- Implement fingerprintjs to remember users
  - Allow said users to edit posts
  - Allow them to delete posts
- Allow searching of posts by day, month, and year
