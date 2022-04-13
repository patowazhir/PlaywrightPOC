# Plawright POC

[![Playwright Tests](https://github.com/patowazhir/PlaywrightPOC/actions/workflows/playwright.yml/badge.svg?branch=master&event=status)](https://github.com/patowazhir/PlaywrightPOC/actions/workflows/playwright.yml)

Set of tests for https://www.saucedemo.com/ using Playwright as a POC for friendly interviewers :)

Disclaimer: _I do not work with Playwright on a daily basis, this was created both for interviewing purposes and to learn how to use Playwright. The only copy-pasted items on this repo have been marked with their appropiate source._

## Features
- Nice usage of POM
- Lots of comments
- Continuous Integration for our tests ([See the Github Actions for this repo](https://github.com/patowazhir/PlaywrightPOC/actions))
    - Tests running on each push (can't take credit for that, it was autogenerated).
    - Linting checks on each push
- Reports (provided by Playwright)
- Documentation on each relevant method
- Linting (ESLint)

## Tech
This POC was created with:
- Javascript / Typescript
- ESLint
- Node
- NPM
- Playwright
- Github Actions

## Tests covered
So far, I've only added tests to add items to the cart and verify, this was enough to cover the original purpose of this project, but may add more tests in the future.

## Installation
1. Install the latest version of [node](https://nodejs.org/).
2. Install the latest version of the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) Visual Studio Code extension.
2. Download the repo.
3. Run ```npm install```.
4. Using the previously installed extension, run the tests.

Disclaimer: _I haven't tested the installation process from scratch. Steps may be missing._

## Roadmap
- Display the HTML Reports on the repo
- Switch to CSS locators instead of some complex xPaths we are using
- Add more tests around other screens
- Solve TODOs
- Add validations and checks for non TS files
- Add unit tests maybe?
- **Fix the test status badge**
- Add branch security
