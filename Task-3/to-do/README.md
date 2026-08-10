# Task 3 - React To-Do List Application

## Purpose
The purpose of this task is to create a dynamic, single-page To-Do List application using React.js. It reinforces core React concepts such as state management, component composition, prop drilling, and side-effects.

## Flow
1. **Adding a Task**: Users type into the `TodoForm` input. Submitting triggers the `addTodo` method, updating the global `todos` state array.
2. **Displaying Tasks**: The `TodoList` actively renders the array as individual `TodoItem` components.
3. **Modifying Tasks**: Users can click the checkbox to toggle completion status, click "Edit" to modify the text in place, or "Delete" to remove it.
4. **Persistence**: Every time the global `todos` state changes, an effect synchronizes the data tightly with the browser's LocalStorage.

## Fixes Implemented
- **Data Loss on Refresh**: Previously, whenever the user refreshed the browser window, all to-do items would disappear because state was only kept in memory. I fixed this bug by implementing `localStorage` hydration and parsing inside `App.js` using `useEffect` so tasks persist securely across sessions!

## How to Run
1. Open a terminal and navigate to the `Task-3/to-do` directory.
2. Run `npm install` to install all React dependencies.
3. Run `npm start` to spawn the development server.
4. Your browser will automatically open the application at `http://localhost:3000`. Add a few tasks, refresh the page, and notice they don't disappear!
