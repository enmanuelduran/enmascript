# [EnmaScript](https://enmascript.com/)
This repo contains the source code and documentation behind [enmascript.com](https://enmascript.com/).

### Prerequisites

1. Git (for version management).
1. Node: any 8.x or greater (I also recommend using [NVM](https://github.com/creationix/nvm) to manage multiple versions).
1. Yarn: a very powerfull package manager, check [Yarn's website](https://yarnpkg.com/lang/en/docs/install/)  to learn how to install it.
1. You'll need to fork the repo and clone it locally if you want to contribute.

### Installation

1. Go to the folder `cd enmascript`.
1. `yarn install` to install all the dependencies needed.

### Running locally

1. `gatsby develop` to start the development server (you may need `sudo` if you're a linux user).
1. The site will start in `http://localhost:8000`.

## Contributing

### Guidelines
Contributing to the site is very simple.

#### Work in your changes
1. `git checkout master`
1. `git pull origin master`
1. `git checkout -b your-branch-name` (use any descriptive name for your branch, not too long)
1. Work in your changes.

#### Test your implementation
Once you have finished working on your changes, test the implementation by following the next steps:
1. run `gatsby build` to generate a productive version of the site.
1. run `gatsby serve` and check your changes on `http://localhost:9000`

#### Create a Pull Request
If after testing everything looks good you can proceed to create a pull request:
1. Commit your changes and push them to your branch.
1. Create a pull request pointing to the master branch on the main repo.
1. Add the labels related to your Pull Request.

That's it, I'll be checking your changes shortly and if everything goes well and the changes make sense, I'll merge your pull request.

## Troubleshooting
If you get problems when building the project try the following:
- `rm -rf .cache` to remove the local cache.
- `rm -rf public` to delete the public folder (it's generated when building the site).
