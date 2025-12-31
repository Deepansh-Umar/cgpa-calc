# Academic Utility App – CGPA Calculator & Grade Tools

## Overview

This project is a browser-based academic utility application designed to help students calculate their CGPA, compute final grades, and predict outcomes based on partial assessment data. It is specifically structured around a multi-level academic program consisting of a Foundation level and two Diploma pathways (Diploma in Programming and Diploma in Data Science). The application focuses on correctness, clarity, and ease of use, while remaining lightweight and entirely client-side.

The app is implemented using HTML, CSS, and JavaScript only. All calculations are performed in the browser, which removes the need for a backend server or database. This makes the project easy to deploy on static hosting platforms and ensures that no user data is stored or tracked.

---

## Project Goals and Scope

The primary goal of this project is to provide students with a reliable way to:
- Calculate CGPA for Foundation courses
- Calculate CGPA for each Diploma independently
- Calculate an overall CGPA that correctly combines Foundation and Diploma credits
- Handle partially completed courses without distorting CGPA calculations
- Compute final grades for individual subjects using official grading formulas
- Predict grade outcomes by estimating required End Term (ET) marks

The project intentionally avoids advanced frameworks and backend dependencies in order to remain simple, transparent, and easy to understand.

---

## Design Decisions

One major design decision was to avoid using a database. Since the application does not require user accounts, historical storage, or authentication, persisting data was unnecessary. All inputs are provided by the user during a session, and results are computed instantly in JavaScript. This keeps the system stateless and significantly reduces complexity.

Another important decision was to use JavaScript-driven dynamic rendering instead of static forms. Subject lists, grade point selectors, and grading inputs are generated programmatically. This allows consistent handling of credits, grading schemes, and optional subjects, while also making future updates easier.

The project also supports incomplete academic progress. Many students calculate CGPA before finishing all subjects. To handle this correctly, an explicit `N/A` grade option is provided. Subjects marked as `N/A` are excluded from both grade point totals and credit totals, ensuring that CGPA calculations remain mathematically and academically valid.

---

## File Structure and Responsibilities

### `cgpa.html`

This file defines the CGPA calculator page. It contains:
- A navigation bar for switching between CGPA and Grade tools
- Sections for Foundation, Diploma in Programming, and Diploma in Data Science
- A track selector for the Data Science diploma
- Buttons that trigger CGPA calculations

The file contains no business logic. Its purpose is to provide a structured layout that is populated and controlled by JavaScript.

---

### `cgpa.js`

This file implements all CGPA-related functionality. Its responsibilities include:
- Defining subject lists and their credit values for each level
- Dynamically rendering subject rows and grade point selectors
- Supporting an `N/A` grade option for incomplete subjects
- Calculating credit-weighted CGPA
- Computing overall CGPA by combining Foundation and Diploma credits correctly
- Handling diploma-specific logic such as Data Science track selection

All calculations are credit-weighted and follow standard CGPA computation rules.

---

### `grades.html`

This file defines the grade calculator and grade predictor interface. It includes:
- Dropdowns for selecting academic level and subject
- Buttons for switching between grade calculation and grade prediction modes
- A container where assessment inputs are dynamically rendered

Like `cgpa.html`, this file focuses on structure rather than logic.

---

### `grades.js`

This file contains the grading logic. It:
- Stores grading formulas and required components for each subject
- Dynamically generates input fields based on the selected subject
- Calculates final grades using weighted formulas
- Predicts grade outcomes by computing the End Term marks required for each possible grade
- Hides the End Term input during grade prediction to avoid confusion

A single mode flag is used to distinguish between calculation and prediction behavior, keeping the logic clean and consistent.

---

### `style.css`

This file provides basic styling for layout, spacing, navigation, and readability. The design is intentionally simple, prioritizing clarity and usability over heavy visual effects( LLM support was used for this).

---

## Key Features

- Accurate CGPA calculations with proper credit weighting
- Support for incomplete subjects via `N/A`
- Separate CGPA reporting for Foundation and each Diploma
- Overall CGPA computation reflecting academic progression rules
- Subject-specific grading formulas
- Grade prediction based on required End Term performance
- Fully client-side execution with no data storage

---

## Conclusion

This project demonstrates how a moderately complex academic utility can be built using only core web technologies. It emphasizes correctness, transparency, and usability while remaining simple to deploy and maintain. The structure allows easy extension and modification, making it suitable both as a practical tool and as a learning project.
