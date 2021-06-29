# Family Crypto App (Crypfam)

Cyprfam is a free tool that allows families to keep track of different cryptocurrency accounts. Each family is made up of users that can track their crypto accounts regardless of custodian. We even support cold storage wallets such as Trezor and Ledger. In addition, family members can specify what accounts are shared between members. This makes it very easy for parents, legal guardians, and even passionate kiddos to keep track of their crypto securely and easily. 



## Database Schema
 * https://dbdiagram.io/d/60da4649dd6a597148239046

# User and API Routes

## `/`

This will be the initial page once a user visits the page and is not authenticated. It will be a general spash page with highlights of the app with a detailed navbar. 


## Log in page
This page displays a log in form if the user is not logged in
* `GET /users/login`
* `POST /users/login`
## `/user/new`
This page displays a signup form.
### Sign up page
* `GET /users/new`
* `POST /api/users/new`
## `/`
This page will render the users account balance and associated accounts. This will act as the "home" page when a user has successfully authenticated. If the user was not invited by a family they will also be promted to enter family information. 
* `GET /api/user` 
* `GET /api/family` || `POST /api/family`


## `/family/:id`
This page display's a list of family accounts and balances. The user can click on associated accounts and users to drill down further. In addition to the navbar and settings tab a series of charts and graphs will display relevant crypto data.
* `GET /api/family/id`

## `/user/:id`
This page display's a list of user accounts and balances. In addition to the navbar this page will also display a list of detailed transactions (regardless of account) 


*  ` GET /api/user/:id`


## `/account/:familyId/:accountName`

The user will see the balance and transactional data associated on a per account level on this page. So, for example, if a user wanted to see data from all Coinbase accounts, they would navigate here. The user can also filter by a family member to drill down by user.

*  `GET /api/account/:familyId/:accountName`

## `/settings/:userId`
Here a user will be able to make changes to their account. The following changes are as follows:

### If head of household:
 * Change head of household: ` PATCH /api/family/:id`
 * Add user to family: `POST /api/user`
 * Delete the family: `DELETE /api/family/:familyId`
 * Delete family members: `DELETE /api/user/:id`
 * Modify visibility settings:
    * View visibility settings `GET /api/visibility/family/:familyId`
    * Edit visibility settings `PATCH /api/visibility/family/:familyId`
    

### If not head of household:
 * Delete user account: `DELETE /api/user/:id
 * Get user visibility settings `GET /api/visibility/user/:id`
 * Edit user visibility settings `PATCH /api/visibility/user/:id`

 
 # MVP Feature List

* Families
    * Create a new family with a head of household (user)
    * Delete a family
    * Allow head of household to move to a different family
    * Add a new user to the family
* User 
    * Allow a user to connect to their different crypto wallets via zabo
    * Allow a user to modify what accounts/balances / transactions are visible by other family members (head of households will have global access)
    * Allow a user to delete their account
    * Allow a user to move to a new family
* Accounts 
    * Allow for the head of the household to view all family accounts
    * Allow for family members to see relevant accounts
* Balances 
    * Allow for the head of the household to view all family balances
    * Allow for family members to see relevant balances

* Transactions
    * Allow for the head of the household to view all family transactions
    * Allow for family members to see relevant transactions


 

