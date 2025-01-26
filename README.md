# React + TypeScript + Vite + Supabase + AWS Deployment

## **Overview**

This project is a **React + TypeScript** web application built with **Vite**. It provides user authentication using **Supabase** and allows users to manage a product list through basic CRUD operations. The application is designed to be easily deployable using **Docker** and **AWS ECS**, with CI/CD automation handled via **GitHub Actions**.

---

## **Key Features**

- **Modern Frontend Stack**: Uses React with TypeScript and Vite for a fast and efficient development experience.
- **User Authentication**: Secure login/logout system powered by Supabase.
- **Product Management**: Allows users to create, update, read, and delete products.
- **Tailwind CSS**: Provides a clean, responsive, and easily customizable UI.
- **CI/CD Integration**: GitHub Actions automate testing, linting, and deployment.
- **Dockerized Setup**: The entire app runs and deploys via Docker for easy scalability.
- **AWS Deployment**: Uses AWS ECS to ensure reliable and scalable hosting.

---

## **Technology Stack & Reasoning**

- **React + TypeScript**: Ensures type safety and maintainability.
- **Vite**: Provides a faster and leaner development experience compared to Create React App.
- **Supabase**: Chosen as the backend due to its Firebase-like capabilities but with PostgreSQL support, making it scalable and flexible.
- **Tailwind CSS**: Allows for rapid UI development with utility-first styling, reducing the need for custom stylesheets.
- **Docker**: Simplifies the development and deployment processes by containerizing the application.
- **AWS ECS**: Used for deployment due to its high availability, automatic scaling, and integration with other AWS services.
- **GitHub Actions**: Automates code quality checks and deployments to AWS, ensuring smooth and consistent updates.

---

## **Setup Instructions**

### **1. Prerequisites**

- Node.js (v18 or later)
- npm or yarn installed
- Docker installed
- AWS CLI configured (for deployment)

### **2. Installation**

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.

### **3. Environment Variables**

Create a `.env.local` file in the root directory with the necessary Supabase credentials and AWS secrets.

### **4. Running the Application Locally**

1. Start the development server using `npm run dev`.
2. Open `http://localhost:5173` in your browser.

### **5. Running with Docker**

1. Build the Docker image using `docker build -t my-app .`.
2. Start a container using `docker run -p 5173:5173 my-app`.
3. Alternatively, use `docker-compose up` for multi-container orchestration.

### **6. Running Tests**

Run `npm test` to execute unit and integration tests.

---

## **Application Usage**

### **Login**

- Users must authenticate using their Supabase credentials.
- If login fails, an error message will be displayed.

### **Product Management**

- **Add Product**: Enter a name and price, then click the Add button.
- **Update Product**: Click the Edit button next to a product, modify the fields, and save.
- **Delete Product**: Click the Delete button to remove a product permanently.
- Changes are automatically reflected in the UI without requiring a page refresh.

---

## **CI/CD & Deployment**

### **1. Continuous Integration (CI)**

- GitHub Actions runs tests and lints the code on every push.
- If tests fail, the code is not merged into the main branch.

### **2. Continuous Deployment (CD)**

- On merging a pull request into the `main` branch:
  - The app is built and tested.
  - A Docker image is created and pushed to AWS Elastic Container Registry (ECR).
  - The AWS ECS service is updated to deploy the new version.

---

## **Final Notes**

- This project is designed for **scalability and maintainability**, making it easy to expand.
- The use of **Supabase, Tailwind, and AWS** ensures a modern and efficient development workflow.
- The entire application is containerized for **portability and easy deployment**.

