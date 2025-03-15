
# Pokemon App

## Table of Contents
1. [How to Start](#how-to-start)
2. [What is in the App](#what-is-in-the-app)
3. [Technologies Used](#technologies-used)

## How to Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharadiasharad/firefly-pokemon-app.git
   cd firefly-pokemon-app
   ```

2. **Install dependencies**:
   Navigate to the project folder and run:
   ```bash
   npm install
   ```

3. **Start the app**:
   After installing dependencies, run:
   ```bash
   npm run dev
   ```

4. **Change the API endpoint**:
   To connect the frontend app to the correct API endpoint, update the `ENDPOINT` value in the `utils/constants.ts` file to your desired backend URL.

## What is in the App

- **Pokemon List**: The app displays a list of Pokémon on the left side.
  - The list is **scrollable**, and Pokémon data is fetched as the user scrolls, using an **offset** to load more data.
  - You can **filter the list** to display only your **favorite Pokémon**.

- **Favorites**: 
  - Users can mark a Pokémon as their favorite.
  - If a user is logged in, the favorite Pokémon is **stored in a database**.
  - If the user is **not logged in**, the favorites are stored **locally in the browser**.

- **Pokemon Search**: Users can search for Pokémon by name, and results will be filtered dynamically.

- **Pokemon Details**: 
  - The details of the selected Pokémon are displayed on the right side in a **card**.
  - Users can hover over moves and abilities to get more information.

- **Optimization**:
  - The list of Pokémon is optimized using **React.memo** to reduce unnecessary re-renders, improving the app's performance and load time.
  - **Debouncing** is used to ensure that infinite scrolling works smoothly.
  - **Redux** is used to store and manage Pokémon details. Once data is fetched, no additional API calls are made unless required.
  
- **Card Effect**: The card displaying Pokémon details has a **transition effect** on hover for a more interactive experience.

## Technologies Used

- **React** with **TypeScript** for building the frontend.
- **Vite** as the bundler for fast development and optimized builds.
- **Ant Design** (AntD) is used for base components and modals.
- **Tailwind CSS** is used for styling the Pokémon detail card and other components.
- **Axios** for making API calls.
- **Redux** for state management and caching Pokémon details.
- **React.memo** for optimizing the rendering of the Pokémon list.
- **Debouncing** for infinite scrolling to improve user experience.
