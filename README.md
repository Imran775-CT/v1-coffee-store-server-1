# ☕ Coffee Store Server (Backend)

This is the server-side of the Coffee Store web application built using Node.js, Express.js, and MongoDB. It provides RESTful APIs for managing coffee information (Create, Read, Update, Delete). Data is stored in MongoDB Atlas.

Live API (if deployed): https://coffee-store-server.onrender.com

## Technologies Used: Node.js, Express.js, MongoDB, dotenv, cors

## How to Run Locally:
1. Clone this repo  
   `git clone https://github.com/Imran775-CT/v1-coffee-store-server-1.git`  
2. Go into the project folder  
   `cd v1-coffee-store-server-1`  
3. Install dependencies  
   `npm install`  
4. Create a `.env` file with the following:  
PORT=5000
DB_USER=your_user
DB_PASS=your_password

5. Start the server:  
`npm run dev`

Server will run at: http://localhost:5000

## API Routes:
- GET `/coffees` → All coffee list  
- GET `/coffees/:id` → Single coffee by ID  
- POST `/coffees` → Add a new coffee  
- PUT `/coffees/:id` → Update a coffee  
- DELETE `/coffees/:id` → Delete a coffee

## My Other Projects:
🔹 Frontend for this Server: [v1-coffee-store-client-new](https://github.com/Imran775-CT/v1-coffee-store-client-new)  
🔹 Portfolio Website: https://imran775-ct.github.io/developer-imran-portfolio/  
🔹 Form Master React Project: https://form-master-imran2025.surge.sh  
🔹 Dragon News Project: https://dragon-news-355a7.web.app

## Developer Info:
**Imran Hossain**  
GitHub: [@Imran775-CT](https://github.com/Imran775-CT)  
Email: trximran775@example.com  

Specialized in JavaScript | MERN Stack Developer  
