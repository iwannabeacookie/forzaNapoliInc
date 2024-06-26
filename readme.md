# Forza Napoli Inc.

Online selling platform.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)

## Introduction

We decided to develop a Delivery E-Commerce platform. In particular, we want to develop an e-commerce focused mainly on selling alcohol with the fastest delivery possible. But in this case our project it’s only about the online selling platform.

## Technologies Used

List the main technologies used in the project, both on the frontend and backend.

- Frontend:
  - Vue 3 + Vite
- Backend:
  - NodeJS

## Installation

Provide step-by-step instructions on how to install and set up the project locally. This may include installing dependencies, setting up databases, etc.

```bash
# Clone the repository
git clone https://github.com/AldoRed/forzaNapoliInc

# Install dependencies
cd forzaNapoliInc/frontend
npm install
cd ../backend
npm install
```

## Usage

```bash
# Run the backend
cd backend && npm run dev
# On a separate terminal, run the frontend
cd frontend && npm run dev
```

When running both, as part of our CI suite, there will be a linter and formatter that scan all files and lint and format them. Specifically, that would be eslint and prettier.
