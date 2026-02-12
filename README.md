# Zest

Zest is a comprehensive, cross-platform mobile application designed to facilitate recipe discovery, organization, and preparation. Built with React Native and Expo, it leverages a modern technology stack to deliver a high-performance, native user experience. The application features a custom implementation of an edge-to-edge design system, ensuring visual immersion while strictly adhering to safe area guidelines across diverse device form factors.

## Key Features

- **Advanced Recipe Discovery**: Implements a responsive Bento Grid layout for browsing recipes, optimized for visual engagement and information density.
- **Interactive Cooking Mode**: specific "Cooking Mode" interface that provides large-format typography and step-by-step guidance, designed for distance visibility during food preparation.
- **Custom Design System**: A proprietary theme engine supporting "Warm Savory" and "Dark Coffee" palettes, with automated dark mode adaptation and semantic color tokenization.
- **Edge-to-Edge UI**: Full implementation of edge-to-edge layout principles, rendering content behind system bars (status and navigation) for a seamless aesthetic.
- **Performance Optimization**: Utilizes React Native Reanimated for 60fps UI transitions and Zustand for efficient, atomic state management to minimize re-renders.
- **Local Persistence**: Integrated favorite system with asynchronous storage for offline access to preferred recipes.

## Technical Architecture

The application focuses on maintainability and scalability through a modular architecture:

- **Routing**: File-based routing via Expo Router, mirroring Next.js patterns for intuitive navigation structure.
- **State Management**: Zustand is employed for global state, providing a lightweight alternative to Redux with minimal boilerplate.
- **Styling**: A hybrid approach using React Native's StyleSheet API and a custom theme provider, ensuring type safety and consistent design tokens.
- **Component Design**: Atomic design principles applied to UI components (e.g., `FavoriteButton`, `RecipeCardItem`) to maximize reusability.

## Technology Stack

- **Core Framework**: React Native 0.81.5, Expo SDK 52
- **Language**: TypeScript 5.x
- **Navigation**: Expo Router (built on React Navigation)
- **State Management**: Zustand
- **Animation**: React Native Reanimated
- **Blur Effects**: Expo Blur
- **HTTP Client**: Axios

## Prerequisites

Ensure the following tools are installed in your development environment:

- **Node.js**: LTS version recommended (v18 or higher)
- **npm** or **yarn**: Package manager
- **Expo Go**: Application installed on a physical Android/iOS device for testing
- **Android Studio / Xcode**: (Optional) For running on local simulators/emulators

## Installation and Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/zest.git
    cd zest
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Start Development Server**

    ```bash
    npm start
    ```

    or

    ```bash
    npx expo start
    ```

4.  **Run Application**
    - **Physical Device**: Scan the QR code displayed in the terminal using the Expo Go app (Android) or Camera app (iOS).
    - **Emulator**: Press `a` to launch on Android Emulator or `i` for iOS Simulator.

## Project Structure

The project follows a standard Expo layout with source code separation:

```
zest/
├── app/                 # Expo Router application entry points and screens
│   ├── (tabs)/          # Tab-based navigation stack (Home, Favorites, Settings, etc.)
│   ├── cooking/         # Dynamic routes for Cooking Mode screens
│   └── recipe/          # Dynamic routes for Recipe Detail screens
├── src/                 # Application source code
│   ├── components/      # Reusable UI components (Atomic design)
│   ├── hooks/           # Custom React hooks for logic reuse
│   ├── store/           # Global state definitions (Zustand stores)
│   ├── theme/           # Design system tokens (Colors, Typography, Spacing)
│   ├── types/           # Global TypeScript interface definitions
│   └── utils/           # Helper functions and utilities
├── assets/              # Static assets (Images, Fonts)
└── package.json         # Project metadata and dependencies
```

## Available Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Starts the app on a connected Android device or emulator.
- `npm run ios`: Starts the app on an iOS simulator (macOS only).
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run reset-project`: Resets the project to a blank state (caution: destructive).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
