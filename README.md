# Seats.io React Demo

This is a demonstration of how to integrate the Seats.io seating chart into a React application. It showcases a basic booking flow where a user can select seats, hold them, and then "book" them.

## Features

*   Display a Seats.io seating chart for a specific event.
*   Select and deselect seats.
*   Automatically hold seats upon selection.
*   A "Book now" button to simulate booking the selected seats.
*   A "Release seats" button to simulate releasing the held seats.

## Setup

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add your Seats.io workspace key and event key:
    ```
    VITE_SEATSIO_WORKSPACE_KEY=<your_workspace_key>
    VITE_SEATSIO_EVENT_KEY=<your_event_key>
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at http://localhost:5173.

## Workflow

The application follows a simple workflow that simulates the frontend part of a booking process:

1.  **Initialization**: The application starts with a hardcoded `holdToken`. In a real-world application, this token would be fetched from a backend service.
2.  **Seat Selection**: The user selects one or more seats on the seating chart.
3.  **Automatic Hold**: Upon selection, the `holdOnSelect={true}` prop automatically triggers a hold request to the Seats.io API using the provided `holdToken`.
4.  **Feedback**: The `onHoldSucceeded` and `onHoldFailed` callbacks provide feedback on the hold operation in the browser console.
5.  **Booking/Releasing**: The user can then click the "Book now" or "Release seats" buttons to simulate the next steps. In this demo, these actions log information to the console and clear the selected seats.

## Why is the `holdToken` fetched from the backend?

That's an excellent question, and it gets to a crucial point about how Seats.io works.

You are correct that the application *appears* to be working with the hardcoded value. However, this is only a simulation of the frontend logic. The hardcoded `'a-dummy-hold-token'` is not actually creating a real, secure hold on the seats in the Seats.io system.

Here's why the hold token **must** be fetched from a backend in a real application:

1.  **Security**: The `holdToken` is a unique key that proves a specific user has the right to book a specific set of seats. If this token were generated on the frontend (in the browser), a malicious user could potentially interfere with another user's booking process. By generating the token on your backend, you create a secure and trusted link between your user's session and the Seats.io system.

2.  **State Management**: Seats.io's servers manage the state of held seats, including the 15-minute expiration timer. Your backend is responsible for communicating with the Seats.io API to create this hold. The `holdToken` is the result of that successful communication.

3.  **The Correct Workflow**: The intended workflow is as follows:
    *   A user selects seats on your website (the frontend).
    *   Your frontend sends a request to **your backend** with the selected seats.
    *   Your backend then makes a secure API call to the **Seats.io API** to create a hold, and the Seats.io API returns a unique `holdToken`.
    *   Your backend sends this `holdToken` back to your frontend.
    *   The frontend then uses this real `holdToken` to proceed with the booking.

So, while our dummy token is great for developing and testing the frontend user interface, it's a placeholder for a critical backend process that ensures your booking system is secure and reliable.

## List of Actions in Order

1.  The application loads, and the seating chart is displayed.
2.  Select one or more seats. The selected seats will appear in the "Selected Seats" list.
3.  Observe the console for messages from the `onHoldSucceeded` or `onHoldFailed` callbacks.
4.  Click the "Book now" button. This will log the selected seats and the hold token to the console and clear the selection.
5.  Click the "Release seats" button. This will log a message to the console and clear the selection.

## Code Documentation

### `App` component (`src/App.jsx`)

This is the main component of the application. It manages the state of the seating chart and handles the booking flow simulation.

#### State

*   `selectedSeats`: An array of the seats that the user has selected.
*   `holdToken`: The hold token to use for the session. In this demo, it is hardcoded.

#### Methods

*   `handleObjectSelected(seat)`: This function is called when a seat is selected. It adds the seat to the `selectedSeats` array.
*   `handleObjectDeselected(seat)`: This function is called when a seat is deselected. It removes the seat from the `selectedSeats` array.
*   `handleHoldSuccess(holdToken, selectedObjects)`: This function is called when seats are successfully held. It logs the `holdToken` and the selected objects to the console.
*   `handleHoldFailed(holdToken, selectedObjects)`: This function is called when an error occurs while holding seats. It logs the `holdToken` and the selected objects to the console.
*   `bookSeats()`: This function simulates a booking. It logs the `selectedSeats` and `holdToken` to the console and then clears the `selectedSeats` array.
*   `releaseSeats()`: This function simulates releasing held seats. It logs a message to the console and then clears the `selectedSeats` array.

#### `SeatsioSeatingChart` Props

*   `workspaceKey`: Your Seats.io workspace key.
*   `event`: The key of the event for which to display the seating chart.
*   `region`: The region of your Seats.io workspace.
*   `holdToken`: The hold token to use for the session.
*   `onObjectSelected`: A callback function that is called when a seat is selected.
*   `onObjectDeselected`: A callback function that is called when a seat is deselected.
*   `onHoldSucceeded`: A callback function that is called when seats are successfully held.
*   `onHoldFailed`: A callback function that is called when an error occurs while holding seats.
*   `holdOnSelect`: A boolean that determines whether seats are held automatically when they are selected.
