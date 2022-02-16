# Welcome to The Reading Room!

![Screenshot](/images/screenshot.png)

Hello there! Welcome to our anonymous blogging website!<br/>

Note: Please ignore folder `fingerprintjs`. It has been left in on purpose but doesnt work.

## Table of Contents

- [Installation & Usage](#installation--usage)
- [Technologies](#technologies)
- [Changelog](#changelog)
- [Challenges](#challenges)
- [Bugs](#bugs)

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

## Changelog

- Initial commit
- (origin/feedback) GitHub Classroom Feedback
- Setting up GitHub Classroom Feedback
- Move dev_seeds to migrations
- Rearranged files to work
- Add --legacy-watch so nodemon works on windows
- Fix SQL JOIN command
- Working SHOW & CREATE routes
- Working author INDEX & SHOW routes
- Remove console.logs
- Set up destroy route
- Fix db to allow for null abstract, yrofpub
- Create README.md

## Challenges

- Attempting to implement fingerprintjs in order to identify the posts submitted by a particular user

## Bugs

-

## Future Implementations

- Implement fingerprintjs to remember users
