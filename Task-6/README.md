# Internship Tasks - SaiKet Systems

Welcome to the central documentation for my internship tasks at SaiKet Systems. I have successfully completed 6 structured tasks, culminating in a highly polished, production-ready Full Stack Application.

---

## 📅 Completed Tasks Overview

### **Task 1: Create a Static Portfolio Website with a Theme**
**Overview:** Designed a static portfolio featuring a homepage, a "Projects" placeholder section, and a contact form with JavaScript validation.
**Skills Used:** HTML, CSS, JavaScript
**Outcome:** A pristine, responsive layout ready for future dynamic data integration.

### **Task 2: Responsive E-Commerce Landing Page**
**Overview:** Used HTML, CSS, and styling frameworks to map out a responsive e-commerce landing page. Added interactive features like JS-powered toggles and fluid form validation.
**Skills Used:** UI/UX Design, CSS Frameworks, DOM Manipulation.
**Outcome:** Mobile-first architecture that easily scales across devices.

### **Task 3: Front-End Framework Basics (To-Do App)**
**Overview:** Established the fundamentals in React.js by building a complex To-Do List Application allowing users to Add, Edit, Delete tasks dynamically.
**Skills Used:** React Hooks (useState, useEffect), Component Lifecycle.
**Outcome:** Mastered component-based UI engineering.

### **Task 4: Build a Basic REST API**
**Overview:** Used Node.js and Express to formulate a robust API architecture. Generated endpoints for CRUD operations targeting a "User" entity.
**Skills Used:** Node.js, Express, Postman Testing, JSON Mapping.
**Outcome:** Developed the server logic necessary to handle complex user data schemas.

### **Task 5: Database Integration**
**Overview:** Attached the prior REST API to a MongoDB Database, persisting the payload configurations seamlessly. 
**Skills Used:** MongoDB, Mongoose, Data Schemas, Secure Integration.
**Outcome:** Reliable data storage replacing ephemeral arrays.

---

## 🌟 Task 6: Build a Full Stack Application (Ultra Update - DevTrack)
**Overview:** In this final task, I unified the React Front-End and the Express/MongoDB Back-End into a **stunning, futuristic DevOps platform called DevTrack**. DevTrack seamlessly marries a robust **User Management System** with an advanced **Issue Tracker / Kanban Board**, propelling this from a standard CRUD app to an exceptionally impressive piece for my resume. Data is piped securely, displayed dynamically, and augmented by a custom AI Assistant widget.

### **✨ New Features & Enhancements (v3.0 - DevTrack)**
- **Complex Ticket & Bug Tracking Module:** Added a fully-integrated issue tracker where authenticated users can open, monitor, self-assign, and close bugs/tickets in real-time.
- **Role-Based Dynamic Layout:** A completely new UI utilizing a responsive sidebar navigation that conditionally renders independent modules (Dashboard, User Directory, Issue Tracker).
- **Glassmorphic Premium UI**: Total redesign of the application using ultra-modern Glassmorphism, deep dark mode, gradient highlights, and fluid CSS animations.
- **Dynamic Stats Engine:** Real-time analytical calculation of Total Active Tickets, Total Users, and Average Age dynamically recalculating when the database mutates.
- **Search & Filtering Logic**: Instantaneous filtering of both the user directory and the bug tracker natively interacting with React `useMemo` hooks.
- **Integrated AI Assistant Chatbot**: Access an internal bot styled to seamlessly blend with the futuristic layout.
- **Secure Persistence:** Fully routed into the remote MongoDB Atlas cluster for continuous cloud storage.

### **🛠️ Workflow & How to Run**

1. **Bootstrapping the Backend Server:**
   - Open a terminal and navigate to: `cd Task-6/backend`
   - Install dependencies: `npm install`
   - Start the API (Ensure `.env` contains your `MONGO_URI`): `npm run dev`
   - APIs available at `http://localhost:5000/api/users`, `/api/tickets`, and `/api/ai`.

2. **Bootstrapping the Frontend UI:**
   - Open a new terminal instance and navigate to: `cd Task-6/frontend`
   - Start the React Development Server: `npm start`
   - The DevTrack application will launch at `http://localhost:3000`.

3. **User Flow Simulation:**
   - **Authentication:** Establish an identity in the system via standard Registration and JWT retrieval.
   - **Issue Tracking:** Navigate to `Issue Tracker` via the Sidebar to formulate new Bug Tickets and assign priorities (Low/Medium/High/Critical).
   - **Team Management:** Use the `User Directory` tab to manage coworkers.
   - **Analytics:** Observe holistic changes within the `Dashboard` overview natively computed from live fetched data.
