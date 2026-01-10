# ERPro

- # Inventory Management System

## Technologies
- React.js
- Node.js
- Express
- MongoDB

## Project Overview

This is a full-stack inventory management system designed to manage products, suppliers, customers, purchases, sales, expenses, and income.  
Currently, the **authentication module** is implemented.

## Authentication Module
- Developed a secure authentication module with user registration and email verification via OTP
- User registration and email verification via OTP
- Login using JWT access & refresh tokens stored in cookies
- Token refresh, logout, and OTP resend for secure user experience

## Master Modules (CRUD)
- Designed and implemented reusable CRUD modules for:
  - Warehouse
  - Category
  - Brand
  - Tax Rate
- Integrated these modules as dynamic, manageable dropdowns in the Product module
- Applied soft delete and status-based filtering to ensure data integrity

## Product Module (In Progress)
- Warehouse, category, brand, and tax rate mapping
- Tax-inclusive and tax-exclusive pricing
- Discount handling (percentage and fixed amount)
- Opening stock, purchase price, MOQ, quantity alerts
- Multi-unit handling (purchase unit, sale unit, conversion factor)

## Customer & Supplier Management
- Built create, update, delete, and list functionality for customers and suppliers
- Implemented comprehensive form validations:
  - Mobile number
  - WhatsApp number
  - Email
  - GST number
- Managed opening balance and current balance logic
- Integrated hierarchical location selection:
  - District → Subdistrict → Village/City
- Developed reusable form and list components with:
  - Column show/hide
  - Global search
- Shared components between customer and supplier modules

---

## Planned Enhancements
- Purchase and sales modules with automatic stock updates
- Batch-wise inventory tracking
- Advanced listing tables with:
  - Column-wise filtering
  - Export (Excel / PDF)
- Expenses & income tracking


---
