DCD Explorer
============================================

### Deployment instructions:

First, you need to clone the repository.
This can be done with a command from the console (command line):

``git clone git@github.com:GrapheneLab/DCD_explorer.git``

After executing the command, you will have a project folder, inside which you need to execute several commands:

``npm install``

this command will download packages and install all project dependencies (information for installation is taken from the package.json file)

``npm start``

this command will run the webpack build (utility for building the project) and the local dev server with https:// protocol, available at https://localhost:8080

``npm run dev``

this command will run the webpack build (utility for building the project) and the local dev server available at http://localhost:8080

In general, the project is ready to go.
You need to go to the browser and follow the link to see the deployed project.

### Possible installation problems:

*if the `git clone` command also failed, you need to install GIT by going to the official site and downloading the latest up-to-date version.

*if the command `npm install` is not accepted by the command line, then the computer does not have Node.js version 8.11 stable preinstalled, in which the npm package manager is also supplied. You need to download the distribution kit and install [Node.js] (https://nodejs.org/en/download/) following the instructions of the installer.

*during the execution of the `npm install` command, errors may occur related to the missing package node-gyp, which is required to update some dependencies necessary for the project and fix compatibility problems with Unix systems. To fix, you need to have [Python version 2.7.14] (https://www.python.org/downloads/) installed on the machine where the project is deployed
