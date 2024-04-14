# Message Component Documentation

This document outlines the structure and functionality of the `Message` component used in a React-based chat application to display individual messages.

## Overview

`Message` is a functional React component that displays a message within the chat interface. It supports different message types, such as text and files, and includes a typing animation effect for messages from bots that have not fully appeared yet.

## Component Structure

The component is designed to conditionally render based on the message type and the sender. It includes:
- **Logo/Image**: Displays the sender's image.
- **Text Message**: Shows text messages with optional HTML content.
- **File Message**: Shows file messages with an icon and file name or description.

## Props

The `Message` component takes the following props:

| Property | Type                | Description                                  |
|----------|---------------------|----------------------------------------------|
| `sender` | `{ url: string; type: 'bot' | 'user' }` | Object containing the sender's details, including the image URL and type (bot or user). |
| `type`   | `string`            | The type of message being rendered (`text` or `file`). |
| `text`   | `string`            | The text of the message, which can include HTML content. |

## Hooks Used

- **useState**: Manages the visibility of the text, initially hiding it and showing it after a short delay (500 ms) to simulate typing or loading effect.
- **useEffect**: Manages the lifecycle of the timeout used for the typing simulation.

## Styling

The component uses CSS modules for styling, defined in `index.module.css`. The styles differentiate between different types of messages and also apply a typing animation effect for bot messages before they are fully shown.

## Example Usage

```jsx
import { Message } from './path-to-Message';

function ChatInterface() {
  const messageData = {
    sender: { url: 'path/to/image.png', type: 'user' },
    type: 'text',
    text: 'Hello, world!'
  };

  return (
    <div>
      <Message {...messageData} />
    </div>
  );
}
```

## Remarks

- The typing effect is only applied to bot messages that are not yet shown. For user messages or messages that have fully appeared, no typing effect is used.
- It's important to sanitize any HTML content in the `text` property to prevent cross-site scripting (XSS) attacks, especially since `dangerouslySetInnerHTML` is used to insert HTML directly into the DOM.
