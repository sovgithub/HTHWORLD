# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project "adheres" to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Since our client software doesn't have an API, we should try to _mostly_ follow a release strategy that indicates how user-impacting our changes will be:

`major`: changes that REALLY impact what we do, or something completely shifting (either a brand new ui/layout/pivot)  
`minor`: new features, redesigned existing features, etc  
`patch`: fixes and not-really-impacting-user-experience changes

## [Unreleased]

### Added

### Changed

### Removed

# [v1.3] - 2018-06-01

### Added
* Adds ability to change default currency to AUD
* Adds ability to modify purchase price on send screen
* Adds open source thanks page
* Adds MIT license
* Adds external links to about & get help screens
* Adds loading spinner to initial app load, to indicate when app is actually interactable
* Adds loading spinners to signup/login buttons, to indicate that an action has been registered
* Adds bitcoin transaction history support

### Changed
* Fixes BOAR wallet sends
* Fixes unscrollable pages
* Fixes page padding bug
* Fixes duplicate "DEF" key in Pin creation
* Fixes large BOAR logo in View Address screen
* Fixes looping animations for mnemonic confirmation inputs

### Removed

# [v0.1.0-alpha] - 2018-04-05

### Added

* [NEW] Improved Input labels (#91)
* [NEW] Recover via private key, and persist wallets across refreshes (#78)
* [NEW] Added splash page (#82)
* [NEW] added Jumio support (#77)
* [FIX] Price restructure (#68)
* [NEW] Add Wallet Recovery flow (#72)
* [NEW] Add boar wallet support (#61)
* [NEW] Mnemonic recovery (#53)
* [NEW] Add testing to authentication saga (#56)
* [NEW] Add send and receive modals, triggered by dashboard. (#52)
* [NEW] Add Ethereum wallet generation support (#51)
* [NEW]Standardize styling for some buttons and basic typography components, add correct fonts (#47)
* [NEW]Add ICO screen (#26)
* [NEW]Add ability for users to use the app without logging in (#35)
* [NEW] Add loading spinner to necessary screens (#24)
* [FIX] add missing saga packages (#33)
* [NEW] Add Redux-Saga for Smaug authentication (#27)
* [NEW] eslint support (#23)
* [NEW] initial settings screen form (#13)
* [DELETE] Take TypeScript off the project
* [NEW]Feature/remove invite referral screen (#12)
* [FIX] update readme for better dev instructions (#9)
* [DELETE] removed unused sections and comment out newsfeed
* [NEW] Add unstyled, roughed in sections of Wallet page
* [NEW] Allow scrolling of coin information page
* [NEW] Add CoinInformation screen nested under Wallet
* [NEW] Add onPress handler for CurrencyOverview
* [NEW] Change data requested from api based on the interval selected
* [NEW] Add chart with time interval selectors to dashboard
* [NEW] Change status bar text color based on theme
* [NEW] Update README to include information for building the TS files
* [NEW] Allow switching of theme from landing page
* [FIX] Missed styles in dashboard and header
* [FIX] Use getter for accessing current theme
* [FIX] Add backgroundColor to Referral page
* [REFACTOR] Adjust colors based on currently set theme
* [FIX] Use ImageBackground instead of deprecated use of Image
* [NEW] Give Landing screen a basic loading state after auth attempt
* [NEW] Give sparklines color, toggled on if start < end
* [NEW] Make DotChart into SparkLine, use on Wallet + Dashboard
* [NEW] Add react-native-svg dependency
* [REFACTOR] Create generic Fetch component
* [NEW] Add basic wallet screen
* [REFACTOR] Adjust price fetching components to allow multiple coins
* [REFACTOR] Fill out proptypes for currency fetching components
* [NEW] Add basic currency overview line item component
* [NEW] Allow limit to be passed into GetCurrencyHistory
* [REFACTOR] Make loading indicator just ...
* [REFACTOR] Rename title of dashboard
* [REFACTOR] Remove unknowable user wallet listing for now
* [NEW] Hook up currency value to live data
* [NEW] Add component to retrieve currency history
* [NEW] Add placeholder chart component
* [STYLE] Remove heavy margin from Dashboard title
* [NEW] Add basic value statement component
* [NEW] Add basic currency selection to dashboard
* [NEW] Default to different Auth0 pages for login/create account
* Update hoard for new auth0 client
* [NEW] Add and configure HockeyApp
* [NEW] Add basic hamburger menu functionality
* [NEW] Add basic dashboard screen
* [FIX] Eject from CRNA into default React Native app
* [NEW] Add flow:watch script
* [NEW] Setup basic auth reducer
* [NEW] Add redux to project
* [NEW] Add aliases to top-level folders
* [NEW] navigate to Referral screen after create account/login
* [NEW] Add referral screen component
* [NEW] Use StackNavigator as entry point of app
* [REFACTOR] Pull App.js contents into Landing.js, so App be the router
* [ADD] react-navigation library
* [NEW] Add background image to splash screen
* [REFACTOR] Move logo/header combo into Header component
* [ADD] Add LabeledInput component
* [ADD] Rough out styling for basic sections of landing
* [FIX] Bring borderRadius of RoundedButton down to a reasonable size
* [NEW] Add babel-plugin-flow-react-proptypes to throw PropType errors in yarn test
* [NEW] Add placeholder "create account" button to app home screen
* [NEW] Add RoundedButton component
* [NEW] Add logo to home screen
* [NEW] Add Logo component
* [NEW] Add flow package for opt-in type checking
* [Genesis 1:1] Initialize default create-react-native-app repository
