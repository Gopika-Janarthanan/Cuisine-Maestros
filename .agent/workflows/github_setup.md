---
description: How to push this project to GitHub
---

# How to Push to GitHub

Since your project is already a git repository (checked via `.git` folder existence), follow these steps to push it to GitHub.

1.  **Create a Repository on GitHub:**
    *   Go to [GitHub.com](https://github.com/new).
    *   Create a new repository (e.g., `ChefBookingApp`).
    *   **Do not** initialize it with a README, .gitignore, or license (keep it empty).

2.  **Add the Remote Origin:**
    Open a terminal in your project root (`c:\Users\unknown user\OneDrive\Documents\ChefBookingApp`) and run:
    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/ChefBookingApp.git
    ```
    *(Replace `<YOUR_USERNAME>` with your actual GitHub username)*

3.  **Stage and Commit Changes:**
    ```bash
    git add .
    git commit -m "Initial commit of Chef Booking App"
    ```

4.  **Push to GitHub:**
    ```bash
    git branch -M main
    git push -u origin main
    ```
