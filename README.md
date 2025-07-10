# SmartPlantPanel™


## intro
SmartPlantPanel is a simple plant database that allows plant parents to look at every info they need to take care of their plants.

Users can watch all the available plants and save them in a nursery to easilly read everything they need.

SmartPlantPanel™ offers 3 account types:
|          |
|----------|
|No Account|
|User      |
|Admin     |

Each account has access to different functionalities; continue reading to know more!



## Pages
The main pages are the 'Homepage' and 'My Nursery'.


### Home
'Homepage' displays all the available plants; each plant has a '👁️' button that allows to open the detail page of the plant, from which you can add
any plant to your nursery.

Full access to Homepage is granted for every account type!


### My Nursery
Here's where things get interesting.

Do you remember the plants you added from the Homepage? Here you can look at them without having to search in the whole database!

By clicking on the '👁️' icon of a plant you can see a pop-up displaying all the plant details and a button that, when clicked, will remove the plant to your nursery.

Here what each account type can do:
|Account   |Permissions|
|:---------|:---|
|No Account|Store and remove plants saved in the current session|
|User      |Store and remove plants saved in current and previous sessions|
|Admin     |Store and remove plants saved in current and previous sessions|


### Login
This is the plain old login page.

If you don't already have an account, you just need to click on 'Create an account' to create a personal nursery that you can access anywhere at any time you want.


### 404
We all know what 404 means, but in case you don't, just know that you're trying to reach something that is not there 😉.

Don't worry: just click on the only button you can click on and you will go back to the HomePage.


## Restricted area
You decided that you are too great of a plant parent to take care only of your plants? Welcome in the SmartPlantPanel team!

If you managed to become an admin, on your first login you will notice the navbar looks a little different: you've unlocked the 'Admin' page.

From here you can use the dropdown to navigate through 3 pages:
- Add a plant
- Manage plants
- Manage users


### Add a plant
This simple form allows you to add a new plant to our database.

Unfortunately the database itself is a mock Json db, so images can't actually be uploaded from there.


### Manage plants
Here you can see the whole plants database, but this time, when clicking on '👁️', you will see a pop-up with two buttons:
- **Edit Plant** allows to modify the plant. this changes will be available on the database as soon as submitting the changes, and users will be able to see them after reloading the component showing it.
- 🗑️ allows to delete the plant. Before the plant will be deleted a popup will ask for your password for confirmation.


### Manage users
From this page you can see every user and either delete it or change his user role.

The 'Admin' column conditionally shows '❌' if the user is a regular user and '✅' if he's an admin.


# Behind the scenes
Here's a rundown of every component of SmartPlantPanel:

## API
in the api directory there are plantsApi and usersApi, which allow to abstract the fetching logic from the actual components.


### plantsApi
here are defined functions to interact with plants in the database:
- `addPlant(newPlant)` allows to add a plant to the database and returns a message signaling success or errors and a resetFlag to reset the plant object in the component
- `editPlant({})` is used to modify an existing plant and returns a message signaling success or errors
- `removePlant(plant)` removes a plant from the database and returns a message signaling success or errors
- `getPlantById(plantId)` uses a plant ID to fetch it. If fetched, the plant gets returned, otherwise the function returns null


### usersApi
here are defined functions to interact with users in the database:
- `deleteUsers({id})` iteratively deletes one or more users from the database. in case of a failed fetch the function returns a message, interrupting further deletion of selected users to prevent multiple failed fetches. In case of success it returns a success message.
- `setAdmin({})` iteratively changes the `isAdmin` value of one or more selected users. Interrupts execution and returns a success message in case of a failed value update, returns a success message if no problems are found.
- `userSignUp({user})` adds a new user to the database. returns a message and a loginFlag (if true the login action can be dispatched)
- `verifyLoggedUser({username, rawPassword})` takes a username and a password as parameters, sanitizes the password and check if an user with matching username and password exists in the database. returns a boolean indicating success or failure.
- `removeFromUserNursery({ userId, plantId})` removes a plant from the users' nursery on the database. Returns a boolean indicating success or failure.

## hooks
usePlants and useUsers are hooks that allows to fetch respectively plants and users.


### usePlants
`useGetPlants({ id, category, plantName, limit, reloadTrigger = null })` fetches plants from the database, applying filters if specified; the reloadTrigger is used to manually re-fetch the plants. returns a list of plant objects and a loading flag.


### useUsers
`useGetUsers({ limit = "20", reloadFlag = false })` is similar to `useGetPlants`, but returns a list of users instead of plants.


## AddPlant
AddPlant component manages the form to add a new plant to the database.

- The `handlechange(e)` function is called each time a form value is changed
- `async handleNewPlant(e)` handles the form submit, calling the `addPlant` API function


## EditPlants
EditPlants features a form identical to the one from AddPlant, but it's values are pre-filled thanks to the plant object passed as a parameter.
- The `handlechange(e)` function is called each time a form value is changed
- `async handleEditPlant(e)` handles the form submit, calling the `editPlant` API function


## FetchPlants
This is one of the most important components: it is responsible for fetching the plants from the database; can accept a trigger parameter to be passed to the `useGetPlants` hook call.

plants and loading are taken by destructuring the `useGetPlants` return values; furthermore, FetchPlants applies filters to the `useGetPlants` call thanks to the `PlantFilters` component.

Finally, FetchPlants returns a table containing all the fetched plants together with the '👁️' button, passing the responsibility of handle it to the parent component through the `onSelectPlant`.


## PlantFilters
PlantFilters is a simple component that allows to filter plants by category and searching them by their name.
It doesn't provide any logic, allowing it to be used for both fetching plants and for displaying locally stored plants (in the nursery page)


## Plant
Plant is another basic component used to display a given plant object. It also features an exit button for the parent component to handle.


## CreateAccount
An apparently simple component that takes input from a form, validates it, creates a new user object to use as the parameter for `userSignUp()`; if the account is successfully created, the LogIn dispatch occurs.


## LoginComponent
Similarly to CreateAccount, the LoginComponent features a form, validates it and dispatches the LogIn function.


## ManageUsers
This component displays a table containg all the users from the database.

Clicking on the user's id displays a pop-up containing some informations about the user, including a hidden password that can be displayed by clicking on '***'.

Each user is selectable individually and a check box in the table header allows to select/uselect all the users. for selected users










