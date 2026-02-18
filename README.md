# ConsensusMind

A professional web-based decision-making platform that simulates multi-perspective reasoning to help you make better, more balanced decisions.

## 🧠 What is ConsensusMind?

ConsensusMind analyzes your decisions through four distinct perspectives:

- **🛡️ Risk** – Evaluates potential dangers and uncertainties
- **📈 Impact** – Assesses the potential effects and outcomes  
- **💰 Cost** – Analyzes financial and resource implications
- **⚖️ Ethics** – Considers moral and ethical dimensions

These perspectives are then synthesized into a **consensus recommendation** to support clearer, more balanced decision-making.

## ✨ Features

- **Public Landing Page** – Introduces the platform and its capabilities
- **User Authentication** – Secure login and signup system
- **Dashboard** – Overview of your decision-making activity
- **New Decision Analysis** – Submit decisions for multi-perspective evaluation
- **Decision Results** – View detailed analysis with perspective cards
- **Decision History** – Track and review past decisions
- **Protected Routes** – Secure access to authenticated features

## 🛠️ Tech Stack

- **React 18** – UI framework
- **TypeScript** – Type-safe JavaScript
- **Vite** – Fast build tool and dev server
- **React Router v6** – Client-side routing
- **CSS3** – Custom styling with modern aesthetics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ConsensusMind.git
   cd ConsensusMind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── ConsensusPanel.tsx
│   ├── PerspectiveCard.tsx
│   └── ProtectedRoute.tsx
├── pages/             # Route pages
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── Dashboard.tsx
│   ├── NewDecision.tsx
│   ├── DecisionResult.tsx
│   └── DecisionHistory.tsx
├── context/           # React context providers
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📄 License

This project is private.
