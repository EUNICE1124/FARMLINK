# FarmLink - Farmer-to-Buyer Marketplace

FarmLink is a full-stack web application designed to bridge the gap between local farmers and consumers. It allows farmers to manage inventory, track orders, and view financial analytics, while providing buyers with a marketplace to browse and purchase fresh produce.

## 🚀 System Architecture
The application follows a **Client-Server architecture**:
* **Frontend**: Built with HTML5, CSS3, and Vanilla JavaScript. It uses `fetch` for API communication and `localStorage` for session management.
* **Backend**: A RESTful API built with Node.js and Express.js.
* **Database**: MySQL relational database for persistent storage of users, products, and orders.



## 🛠️ Tech Stack
* **Frontend**: JavaScript (ES6+), Chart.js (for analytics), jsPDF (for receipts), FontAwesome.
* **Backend**: Node.js, Express, Multer (for image uploads), Dotenv.
* **Database**: MySQL (relational schema).

## 📂 Project Structure
* `/Front_End`: Contains the role-based dashboards for Farmers and Buyers.
* `/Back_End/controllers`: Contains the logic for processing data (e.g., `orderController.js`, `marketplaceController.js`).
* `/Back_End/routes`: Defines the API endpoints.
* `/Back_End/config/db.js`: Database connection configuration.

## ⚙️ Key Features
1.  **Role-Based Access**: Specialized onboarding and login flows for Farmers and Buyers.
2.  **Inventory Management**: Farmers can upload products with images and monitor stock levels.
3.  **Order Life-Cycle**: Real-time status updates (Pending → Processing → Completed/Cancelled).
4.  **Financial Dashboard**: Visual representation of sales data and order counts using Chart.js.
5.  **Global Search**: Adaptive search logic based on the logged-in user's role.



## 🔧 Installation & Setup
1.  **Database**: Import the provided SQL schema into your MySQL Workbench.
2.  **Environment Variables**: Create a `.env` file in the `/Back_End` folder with your DB credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=farmlink
    PORT=3001
    ```
3.  **Install Dependencies**:
    ```bash
    cd Back_End
    npm install
    ```
4.  **Run Server**:
    ```bash
    node server.js
    ```

## 📝 API Endpoints
* `POST /api/users/login`: Authenticates users and returns role data.
* `GET /api/orders/latest/:userId`: Fetches the most recent order for a specific farmer.
* `POST /api/marketplace/add`: Allows farmers to upload new products with images.
* `GET /api/messages`: Retrieves unread messages for the notification center.