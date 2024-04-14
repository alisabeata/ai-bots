# PersonasContext Documentation

This documentation covers the `PersonasContext` and `PersonasProvider` components, which are designed for managing persona data in a React application.

## Overview

The file defines:
- `PersonaType` interface describing the structure of a persona object.
- `PersonasContextType` interface defining the context's state.
- `PersonasContext` created with React's `createContext`.
- `PersonasProvider` component that provides persona data to its children.
- A custom hook `usePersonas` for consuming the context.

## Interfaces

### PersonaType

Defines the properties of a persona object.

| Property | Type   | Description           |
|----------|--------|-----------------------|
| `id`     | string | Unique identifier for the persona. |
| `name`   | string | Name of the persona.  |
| `descr`  | string | Description of the persona. |
| `image`  | string | URL of the persona's image. |

### PersonasContextType

Outlines the structure of the context holding persona data.

| Property        | Type           | Description                           |
|-----------------|----------------|---------------------------------------|
| `charactersData`| `PersonaType[]`| Array of personas.                    |
| `isLoading`     | `boolean`      | Indicates if data fetching is in progress. |

## PersonasContext

A React context initialized with default values:
- `charactersData`: Empty array
- `isLoading`: false

## PersonasProvider

A provider component that encapsulates logic for fetching persona data and updating the context.

### Props

| Property  | Type       | Description                  |
|-----------|------------|------------------------------|
| `children`| `ReactNode`| The child components that will consume the context. |

### Behavior

- Fetches persona data from an API or cache on mount.
- Periodically updates the data every 5 minutes.
- Handles loading state and errors internally.
- Caches fetched data to local storage.

## usePersonas

A custom hook for accessing the `PersonasContext`.

- **Returns:** An object containing `charactersData` and `isLoading` from the context.

## Example Usage

```jsx
import { PersonasProvider, usePersonas } from './path-to-your-file';

function App() {
  return (
    <PersonasProvider>
      <YourComponent />
    </PersonasProvider>
  );
}

function YourComponent() {
  const { charactersData, isLoading } = usePersonas();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {charactersData.map(persona => (
        <div key={persona.id}>
          <h1>{persona.name}</h1>
          <p>{persona.descr}</p>
          <img src={persona.image} alt={`Image of ${persona.name}`} />
        </div>
      ))}
    </div>
  );
}
```