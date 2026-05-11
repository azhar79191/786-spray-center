# Admin Panel Structure

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      LOGIN PAGE                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    🔒 Admin Login                         │  │
│  │                                                           │  │
│  │  Username: [________________]                            │  │
│  │  Password: [________________]                            │  │
│  │                                                           │  │
│  │           [        Login        ]                        │  │
│  │                                                           │  │
│  │  Demo: admin / admin123                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

                            ↓ (After Login)

┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD LAYOUT                        │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                   │
│  SIDEBAR     │              MAIN CONTENT AREA                   │
│              │                                                   │
│  🏠 Dashboard│  ┌─────────────────────────────────────────────┐ │
│  📦 Products │  │         Dashboard Statistics                │ │
│  ❓ FAQs     │  ├─────────────────────────────────────────────┤ │
│  ✉️  Contacts│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │ │
│              │  │  │  50  │  │  12  │  │  25  │  │   3  │  │ │
│              │  │  │Prods │  │Contct│  │ FAQs │  │Pendng│  │ │
│              │  │  └──────┘  └──────┘  └──────┘  └──────┘  │ │
│              │  ├─────────────────────────────────────────────┤ │
│              │  │         Quick Actions                       │ │
│              │  │  [Add Product] [Add FAQ] [View Contacts]   │ │
│              │  ├─────────────────────────────────────────────┤ │
│              │  │  Recent Products    │  Recent Contacts     │ │
│              │  │  • Product 1        │  • Contact 1         │ │
│  🚪 Logout   │  │  • Product 2        │  • Contact 2         │ │
│              │  │  • Product 3        │  • Contact 3         │ │
│              │  └─────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────┘
```

## Page Hierarchy

```
Admin Panel
│
├── Login (/admin/login)
│   └── Authentication Form
│
└── Admin Layout (/admin/*)
    ├── Sidebar Navigation
    │   ├── Dashboard
    │   ├── Products
    │   ├── FAQs
    │   ├── Contacts
    │   └── Logout
    │
    ├── Dashboard (/admin/dashboard)
    │   ├── Statistics Cards
    │   ├── Quick Actions
    │   └── Recent Activity
    │
    ├── Products (/admin/products)
    │   ├── Product List
    │   │   ├── Search Bar
    │   │   ├── Category Filter
    │   │   ├── Brand Filter
    │   │   └── Product Table
    │   │       ├── Image
    │   │       ├── Name
    │   │       ├── Category
    │   │       ├── Brand
    │   │       ├── Price
    │   │       ├── Stock Status
    │   │       └── Actions (Edit/Delete)
    │   │
    │   ├── Create Product (/admin/products/new)
    │   │   └── Product Form
    │   │       ├── Basic Info
    │   │       ├── Additional Details
    │   │       ├── Image Upload
    │   │       └── Status Toggles
    │   │
    │   └── Edit Product (/admin/products/:id/edit)
    │       └── Product Form (pre-filled)
    │
    ├── FAQs (/admin/faqs)
    │   ├── FAQ List
    │   │   ├── Search Bar
    │   │   ├── Category Filter
    │   │   └── FAQ Items
    │   │       ├── Question
    │   │       ├── Answer Preview
    │   │       ├── Category Badge
    │   │       └── Actions (Edit/Delete)
    │   │
    │   ├── Create FAQ (/admin/faqs/new)
    │   │   └── FAQ Form
    │   │       ├── Question
    │   │       ├── Answer
    │   │       ├── Category
    │   │       └── Display Order
    │   │
    │   └── Edit FAQ (/admin/faqs/:id/edit)
    │       └── FAQ Form (pre-filled)
    │
    └── Contacts (/admin/contacts)
        ├── Status Filter
        ├── Contact List (Left Panel)
        │   └── Contact Cards
        │       ├── Name
        │       ├── Email
        │       ├── Message Preview
        │       ├── Status Badge
        │       └── Timestamp
        │
        └── Contact Detail (Right Panel)
            ├── Full Name
            ├── Email (clickable)
            ├── Phone (clickable)
            ├── Full Message
            ├── Status Update Buttons
            │   ├── Pending
            │   ├── In Progress
            │   └── Resolved
            ├── Delete Button
            └── Timestamps
```

## Component Tree

```
App
└── BrowserRouter
    └── AppRoutes
        ├── MainLayout (Public)
        │   ├── Navbar
        │   ├── Outlet (Public Pages)
        │   ├── Footer
        │   ├── WhatsAppButton
        │   └── ScrollToTopButton
        │
        ├── AdminLogin (No Layout)
        │
        └── AdminLayout (Protected)
            ├── Sidebar
            │   ├── Logo
            │   ├── Navigation Menu
            │   └── User Info + Logout
            │
            ├── Top Bar
            │   ├── Mobile Menu Toggle
            │   └── View Website Link
            │
            ├── Main Content
            │   └── Outlet (Admin Pages)
            │       ├── Dashboard
            │       ├── ProductList
            │       ├── ProductForm
            │       ├── FAQList
            │       ├── FAQForm
            │       └── ContactList
            │
            └── Footer
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER ACTIONS                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      REACT COMPONENTS                            │
│  • Handle user input                                             │
│  • Validate data                                                 │
│  • Show loading states                                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      AXIOS CLIENT                                │
│  • Add auth token                                                │
│  • Format request                                                │
│  • Handle errors                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API                                 │
│  • Validate request                                              │
│  • Process data                                                  │
│  • Update database                                               │
│  • Upload images (Cloudinary)                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         RESPONSE                                 │
│  • Success/Error message                                         │
│  • Updated data                                                  │
│  • Status code                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      UPDATE UI                                   │
│  • Show toast notification                                       │
│  • Refresh data                                                  │
│  • Navigate to list                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────┐
│ Login Page  │
└──────┬──────┘
       │
       │ Enter credentials
       ↓
┌─────────────────┐
│ Validate Input  │
└──────┬──────────┘
       │
       │ Submit form
       ↓
┌──────────────────────┐      ❌ Invalid
│ Check Credentials    │──────────────→ Show error
└──────┬───────────────┘
       │
       │ ✅ Valid
       ↓
┌──────────────────────┐
│ Store Token          │
│ localStorage.setItem │
└──────┬───────────────┘
       │
       │ Navigate
       ↓
┌──────────────────────┐
│ Admin Dashboard      │
└──────────────────────┘
       │
       │ On each request
       ↓
┌──────────────────────┐
│ Axios Interceptor    │
│ Add Authorization    │
│ Header               │
└──────────────────────┘
```

## Product Management Flow

```
CREATE PRODUCT
┌─────────────────┐
│ Click "Add      │
│ Product"        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Fill Form       │
│ • Name          │
│ • Category      │
│ • Brand         │
│ • Price         │
│ • Description   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Upload Images   │
│ (Cloudinary)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Set Status      │
│ • In Stock      │
│ • Featured      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Submit Form     │
│ POST /products  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Show Success    │
│ Navigate to     │
│ Product List    │
└─────────────────┘

EDIT PRODUCT
┌─────────────────┐
│ Click Edit      │
│ Icon            │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Fetch Product   │
│ GET /products/id│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Pre-fill Form   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Modify Fields   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Submit Changes  │
│ PUT /products/id│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Show Success    │
│ Navigate Back   │
└─────────────────┘

DELETE PRODUCT
┌─────────────────┐
│ Click Delete    │
│ Icon            │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Confirm Dialog  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ DELETE          │
│ /products/id    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Show Success    │
│ Refresh List    │
└─────────────────┘
```

## Contact Management Flow

```
┌─────────────────┐
│ Customer        │
│ Submits Form    │
│ (Public Site)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Stored in       │
│ Database        │
│ Status: Pending │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Admin Views     │
│ Contact List    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Click Contact   │
│ to View Details │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Detail Panel    │
│ Shows:          │
│ • Name          │
│ • Email         │
│ • Phone         │
│ • Message       │
│ • Status        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Update Status   │
│ • Pending       │
│ • In Progress   │
│ • Resolved      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ PUT             │
│ /contact/id     │
│ {status: ...}   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Status Updated  │
│ Badge Changes   │
│ Color           │
└─────────────────┘
```

## Responsive Behavior

```
DESKTOP (> 1024px)
┌────────────────────────────────────────────────┐
│  [Sidebar]  │  [Main Content Area]             │
│             │                                   │
│  Fixed      │  Full width content              │
│  Visible    │  Tables, forms, cards            │
│             │                                   │
└────────────────────────────────────────────────┘

TABLET (640px - 1024px)
┌────────────────────────────────────────────────┐
│  [☰]  [Main Content Area]                      │
│                                                 │
│  Sidebar collapses to overlay                  │
│  Content takes full width                      │
│                                                 │
└────────────────────────────────────────────────┘

MOBILE (< 640px)
┌────────────────────────────────────────────────┐
│  [☰]  [Content]                                │
│                                                 │
│  Hamburger menu                                │
│  Single column layout                          │
│  Stacked cards                                 │
│                                                 │
└────────────────────────────────────────────────┘
```

## State Management

```
Component State (useState)
├── Form Data
│   ├── Input values
│   ├── Validation errors
│   └── Touched fields
│
├── UI State
│   ├── Loading
│   ├── Modal open/close
│   ├── Selected items
│   └── Filters
│
└── Data State
    ├── Products list
    ├── FAQs list
    ├── Contacts list
    └── Categories/Brands

Custom Hooks
├── useFetch
│   ├── data
│   ├── loading
│   ├── error
│   └── refetch
│
└── useProducts
    ├── products
    ├── featuredProducts
    ├── categories
    ├── brands
    └── fetchProducts

API Client (Axios)
├── Request Interceptor
│   ├── Add auth token
│   ├── Add timestamp
│   └── Log request
│
└── Response Interceptor
    ├── Handle success
    ├── Handle errors
    ├── Token refresh
    └── Log response
```

---

This structure provides a clear visual representation of how the admin panel is organized and how data flows through the system.
