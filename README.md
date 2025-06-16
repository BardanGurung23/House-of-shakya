# Tech Nirvana Website 🚀  
## Project Setup Guide for New Developers  

Follow the steps below to set up the project on your local machine.  

---

## 1️⃣ Clone the Repository  
Run the following command in your terminal:  

```sh
git clone git@github.com:TechNirvana2024/TechNirvanaCore.git
cd nirvana-commerce
```

## Install Dependencies in root
```sh
npm install
```

## Set Up Husky (Pre-commit Hooks)
```sh
npx husky init
```

## Configure Pre-commit Hook

Inside .husky/pre-commit, replace the existing content with the following script:
```sh
#!/bin/bash

# Exit on any command failure
set -e

# Run Prettier for backend
cd backend || exit 1
npm run prettier || { echo 'Backend Prettier failed'; exit 1; }

# Run Prettier for admin
cd ../admin || exit 1
npm run prettier || { echo 'Admin Prettier failed'; exit 1; }

# Run Prettier for public 
cd ../public || exit 1
npm run prettier || { echo 'Public Prettier failed'; exit 1; }
```
## Configure Backend

```sh 
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```
# 5 Run setup route in browser 
This will run the setup.json file and seed the database
```sh
localhost:8080/setup
```

## 🌿 Git Branch Naming Convention Guidelines  

Before creating a new branch, follow these naming conventions to maintain clarity and consistency in the repository. Choose the appropriate prefix based on the type of change you are making.  

### ✅ **Branch Naming Rules**  

- **`feature/`** → For new features  
  - 📌 *Example:* `feature/notification-syst`  

- **`bugfix/`** → For fixing bugs  
  - 🛠 *Example:* `bugfix/fix-login-error`  

- **`hotfix/`** → For critical production fixes  
  - 🚨 *Example:* `hotfix/payment-crash`  

- **`refactor/`** → For improving existing code without changing functionality  
  - 🔄 *Example:* `refactor/cleanup-auth-module`  

- **`chore/`** → For maintenance tasks (e.g., updating dependencies)  
  - 🧹 *Example:* `chore/update-dependencies`  

- **`test/`** → For adding or improving tests  
  - 🧪 *Example:* `test/add-unit-tests-for-api`  

- **`docs/`** → For documentation updates  
  - 📖 *Example:* `docs/update-readme`  

By following this convention, we ensure a structured and easily understandable commit history. 🚀  

# email key for customer
``` sh
 - For register :
  key: registrationOtp
  placeholders :[
  name,
  email,
  otp,
  ]

- For regenerate otp :
  key: regenerateOtp
  placeholders :[
  name,
  email,
  otp,
  ]

- For generate forget password opt :
  key: generateFPOtp
  placeholders :[
  name,
  email,
  otp,
  ]

- For Contact Us :
  key: contactEnquiry
  placeholders :[
  name,
  email,
  ]
```
# tech-nirvana-core
