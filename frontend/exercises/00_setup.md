# Setup the workshop workspace

## Steps

### Initial checks

- Please make sure ports **3000** and **7200** are available on your machine
- Please make sure you have a recent version of Node.JS (22.x or later) installed

### Step 1: Clone the repo
1. Clone the workshop repository from Github: https://github.com/nilshartmann-workshops/2025-10-31-tanstack
2. Please **do NOT** open the repository in your editor/IDE!
3. Instead, only open the `frontend` folder in your editor/IDE!

### Step 2: Setup the "Backend"

The API Backend is a simple express-based node.js application that lives in the `backend`-folder

1. Go into the `backend` folder
2. Run `npm install`
3. Run `npm start`
4. Verify that it works by opening http://localhost:7200/api/donuts in your browser (or cURL, wget)
    - You should see a JSON response in your browser

### Step 3: Setup our frontend workspace

1. Open the `frontend` folder in your IDE/editor
2. Run `npm install` in `frontend`
3. Run `npm run dev` in `frontend`
4. Verify that the frontend is running by opening "http://localhost:3000" in your browser
    - When you see a blank screen with "Not Found" **everything works**!

### Step 4: Enjoy the workshop 🍩

- If you have any questions or problems during the workshop, please feel free to ask.

## A Note on TanStack Code generator

In our workshop we will use file-based routing with TanStack Router. To do so there is a vite plugin that generates some code after you created a new route.
When your editor does not pick up the changes, please **manually sync** your files, _before_ making changes to the route file.

(In IntelliJ for example File -> Reload all from Disc)
