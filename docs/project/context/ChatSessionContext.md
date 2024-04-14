# ChatSessionsContext Documentation

This documentation covers the usage of the `ChatSessionsContext` and `ChatSessionsProvider` components designed for managing chat sessions in a React application.

## Overview

The file defines:
- A `ChatSession` interface describing the structure of a chat session object.
- A `ContextType` interface defining the shape of the context including methods and properties.
- A `ChatSessionsContext` created with React's `createContext`.
- A `ChatSessionsProvider` component that provides the chat session context to its child components.
- A custom hook `useDialogSessions` for consuming the context.

## Interfaces

### ChatSession

`ChatSession` represents the details of a chat session.

| Property    | Type   | Description          |
| ----------- | ------ | -------------------- |
| `access_key` | string | The access key for the chat session. |
| `name`       | string | The name of the chat session. |

### ContextType

`ContextType` outlines the structure of the chat sessions context.

| Property     | Type                 | Description                          |
| ------------ | -------------------- | ------------------------------------ |
| `chatSessions` | `ChatSession[]`     | Array of chat sessions.              |
| `loadData`     | `() => void`        | Function to load chat sessions data. |
| `isLoading`    | `boolean`           | Indicates if the loading is in progress. |

## ChatSessionsContext

A React context initialized with default values.

- **Default Value:**
  - `chatSessions`: Empty array
  - `loadData`: No-op function
  - `isLoading`: false

## ChatSessionsProvider

A provider component that encapsulates logic for fetching chat sessions and updates the context value.

### Props

| Property  | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `children` | `ReactNode` | The child components that will consume the context. |
| `id`       | `string`   | Identifier used to fetch chat sessions. |

### Behavior

- Fetches chat sessions from an API on mount and whenever `id` changes.
- Handles loading state and errors internally.

## useDialogSessions

A custom hook for accessing the `ChatSessionsContext`.

- **Returns:** An object containing `chatSessions`, `loadData`, and `isLoading` from the context.

## Example Usage

```jsx
import { ChatSessionsProvider, useDialogSessions } from './path-to-your-file';

function App() {
  return (
    <ChatSessionsProvider id="123">
      <YourComponent />
    </ChatSessionsProvider>
  );
}

function YourComponent() {
  const { chatSessions, isLoading } = useDialogSessions();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {chatSessions.map(session => (
        <p key={session.access_key}>{session.name}</p>
      ))}
    </div>
  );
}
```