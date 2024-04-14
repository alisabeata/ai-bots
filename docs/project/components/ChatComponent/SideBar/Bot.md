# Bot Component Documentation

This document outlines the structure and functionality of the `Bot` component used in a React-based chat application. The component includes interactive features such as initiating a new chat, sharing the chat, and closing the bot interface.

## Overview

`Bot` is a functional React component that utilizes various hooks and child components to manage state and interactions within a chat application's bot interface.

## Props

### `BotProps`

| Property | Type       | Description                          |
|----------|------------|--------------------------------------|
| `onClose`| `() => void` | Callback function that is called when the close button is clicked. |

## Component Structure

The component consists of several key elements:

- **Logo**: A clickable logo that redirects to the homepage.
- **Identity Card**: Displays the bot's image and name, with a description.
- **Chat Selector**: Allows the user to select different chats (if available).
- **Close Button**: Closes the bot interface.
- **Share Button**: Opens a popup for sharing the chat.
- **New Chat Button**: Initiates a new chat conversation.

## Internal State

The component maintains the following states:

| State                 | Type      | Description                           |
|-----------------------|-----------|---------------------------------------|
| `shownSharePopup`     | `boolean` | Controls the visibility of the share popup. |

## Hooks Used

- **useURL**: Custom hook to get URL parameters like `name` and `id`.
- **useDialog**: Accesses functions from the `DialogContext`, specifically `addNewChat` to handle initiating a new chat.
- **useState**: Manages the visibility state of the sharing popup.

## Child Components

- **LogoIcon**: SVG component used for the site logo.
- **PlusIcon**: SVG component used to represent the new chat button.
- **CloseIcon**: SVG component used for the close button.
- **SelectChat**: Component to select between different chats.
- **SocialShare**: Component displayed when sharing the chat.
- **Button**: A utility component styled for different contexts (share and new chat buttons).

## Functions

### `handleShowSharePopup`
- Sets `shownSharePopup` to `true`, making the share popup visible.

### `handleCloseSharePopup`
- Sets `shownSharePopup` to `false`, hiding the share popup.

### `handleNewChat`
- Calls `addNewChat` from `useDialog` to initiate a new chat.

## Example Usage

```jsx
<Bot onClose={() => console.log('Close bot interface')} />
```

## Styling

The component uses a CSS module for styling, referred to in the component as `classes`. The styles are defined in `index.module.css` located in the same directory as the component.

## Remarks

- The component should be used within a context where `useDialog` and `useURL` hooks are properly configured to fetch and manage chat data.
- The `Bot` component is designed for interactive use, particularly in scenarios involving chat operations and social interactions.
