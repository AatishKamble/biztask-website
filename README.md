<div align="center">

# BizTask – Local Services & Job Finding Platform

BizTask is a **local services marketplace and job finding platform** that connects **service providers, customers (service seekers), job seekers, and businesses** on a single platform.The system allows businesses to offer services, hire workers, manage bookings, and receive payments, while customers can easily book services, apply for jobs, and track their activity.


🔗 **Live Demo**: https://biztask.vercel.app  
📂 **GitHub Repository**: https://github.com/AatishKamble/biztask-website

</div>

---

## 🌟 Key Features Overview

* Local service discovery and booking
* Job posting and job applications
* Business profile and service management
* Secure authentication with email OTP & Google login
* Booking lifecycle with OTP-based service completion
* Review, rating, and work image uploads
* Admin-controlled payment verification

---

## 🧰 Tech Stack

| Category                   | Technologies                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| **Frontend**               | React.js, Redux Toolkit, Tailwind CSS, Framer Motion, React Toastify, HTML, CSS, JavaScript, Axios |
| **Backend**                | Node.js, Express.js                                                                         |
| **Database**               | MongoDB                                                                                     |
| **Authentication**         | JWT, Email OTP, Google OAuth                                                                |
| **Payments**               | Admin-verified payments (Transaction ID based)                                              |
| **Other Tools & Services** | Cloud storage for images(Cloudinary), Email service for OTPs & notifications                            |

---

## 👤 User Roles

1. **Service Provider / Business Owner**
2. **Customer / Service Seeker**
3. **Job Seeker / Applicant**
4. **Admin**
5. **New / Existing Users**

---

## 🏢 Service Provider / Business Owner Flow

### 1. Business Registration

* Register a business by providing required details
* Path: **Profile → My Business → Register Business**
* Can **view, update, or delete** business details

### Business Registration Form
![Business Registration](screenshots/business-registration-form.png)


### 2. Service Management

* Add new services from the **Business Detail Page**
* Fill service details and submit
* Can **view, update, or remove** services

### Service Registration Form
![Service Registration](screenshots/service-registration-form.png)

### 3. Job Posting (Hiring Workers)

* From **Service Detail Page**, post job openings
* Add job details (role, salary, type, location, etc.)
* Can **view, update, or delete** job posts

### Job Registration Form
![Job Registration](screenshots/job-registration-form.png)

### 4. Work Images & Reviews Control

* Upload previous work images for services
* Can delete:

  * Own uploaded images
  * Images uploaded by other users (to maintain quality)
* Cannot review or rate own service

### Work Image Section
![Work Image Section](screenshots/work-image-section.png)

### 5. Job Applications Management

* Go to **Job Detail Page → Applications**
* View all applicants with filters:

  * Pending
  * Shortlisted
  * Interview Scheduled
  * Hired
  * Rejected
* Update application status with a **reason**
* Status update message is sent to the applicant

### Job Aplications Dashboard
![Job Aplications Dashboard](screenshots/Application-job-dashboard.png)


### 6. Service Bookings Management

* Path: **Business Detail → Customer Bookings**
* View bookings with filters:

  * Total
  * Pending
  * Completed
  * Rejected
* Mark booking as **Completed** only after OTP verification from customer
* Payment is released only after successful OTP confirmation


### Service Bookings Management
![Service Bookings Management Page](screenshots/Service-Bookings-Management-Page.png)

---

## 🔍 Job Seeker / Applicant Flow

### 1. Job Search & Apply

* Search jobs using filters:

  * Job title
  * Employment type (Full-time / Part-time)
  * Salary range
  * Location
  * Recently posted jobs
* Featured recent jobs visible on the **Home Page**
* Fill job application form and submit


### Job Search Page
![Job Search Page](screenshots/Search-jobs.png)

### Job Application Form
![Job Application Form](screenshots/Job-Application-Form.png)

### 2. Application Tracking

* Path: **Profile → Job Seeker Tab**
* View all applied jobs and their statuses
* Open job details to see:

  * Application status
  * Message or reason from provider (if any)


### Job Application History Page
![Job Application History Page](screenshots/Job-Application-History-Page.png)

### Job Details
![Job Details](screenshots/Job-Details.png)


### 3. Next Steps

* Based on application status, provider will contact applicant via email

---

## 🛠️ Service Seeker / Customer Flow

### 1. Search & Book Services

* Search services using filters:

  * Service type
  * Price range
  * Location
  * Ratings
* View business and service details
* Click **Book Service**
* Confirm or update address and personal details
* Choose package:

  * Basic
  * Premium
* Make payment and submit transaction ID for verification


### Service Search
![Service Search](screenshots/Service-Search.png)

### Service Details
![Service Details](screenshots/Service-Details.png)


### Booking Page
![Booking Page1](screenshots/Booking-Page1.png)

![Booking Page2](screenshots/Booking-Page2.png)

### 2. Booking Rules

* Booking status initially **Requested**
* Can cancel booking **before payment verification** and receive refund
* Once payment is verified and status becomes **Confirmed**, cancellation is not allowed

### 3. Booking History

* Path: **Profile → Service Booking History**
* View all bookings and their statuses


### Booking History Page
![Booking History Page](screenshots/Booking-History-Page.png)


### 4. Service Completion & Review

* Provider completes service after OTP confirmation
* Once status is **Completed**:

  * Customer can give review and rating
  * Customer can upload work images
* Review is mandatory before uploading images
* Customer can delete own uploaded images


### Review & Rating Section
![Review & Rating Sectione](screenshots/Review-Rating-Section.png)

---


## 🌐 Live Application

You can access the deployed application here:

🔗 **Live Demo**: https://biztask.vercel.app

> For local setup, follow the steps below.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm

### Setup Steps

```bash
git clone https://github.com/AatishKamble/biztask-website.git

# Frontend
cd biztask-frontend
npm install
npm run dev

# Backend
cd ../biztask-backend
npm install
node server.js


> Configure environment variables for database connection, email service, authentication secrets, and cloud storage before running the project.

```
---

## 🛡️ Admin Flow

* Admin has a dedicated dashboard
* Responsibilities:

  * Verify or reject payments
  * Release payments to service providers
  * View all bookings (pending, completed, cancelled)


### Admin Dashboard
![Admin Dashboard](screenshots/Admin-Dashboard.png)

---

## 🔐 Authentication & User Management

### User Registration

* New user registers using email
* Receives OTP on email
* Verifies OTP and sets password
* Logs into the platform

### New user registeration
![New user registeration](screenshots/New-user-registeration.png)


### Login Options

* Email & Password login
* Continue with Google


### Login
![Login](screenshots/Login.png)


### Password Recovery

* Forgot password option
* Reset password link sent to registered email

### Forgot password
![Forgot password](screenshots/Forgot-password.png)
---

## 📄 Static Pages & Support

* **About Us**: Displays developer and platform details
* **Home Page**: Shows platform flow and recently posted jobs
* **Support Page**:

  * FAQs
  * Platform usage guidance


### About Us
![About Us](screenshots/About-Us.png)


### Home Page
![Home Page](screenshots/Home-Page.png)

### Support Pages
![Support Pages](screenshots/Support-Pages.png)



---

## 📌 Project Status

🚧 Actively developed

Planned enhancements:

* Automated payment gateway integration
* In-app chat between users

---

## 👨‍💻 Developer

Developed by **Aatish Shesherav Kamble**
* Email: Atishk2454@gmail.com

---

## 🚀 Conclusion

BizTask provides an end-to-end solution for **local services, hiring, and job searching** with transparency, security, and ease of use. It bridges the gap between businesses, customers, and job seekers while ensuring smooth operations through admin-controlled payment verification.

---
