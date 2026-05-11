# Admin Panel Guide

## Overview
The admin panel provides a complete content management system for Bismillah Spray Center website. Manage products, FAQs, and contact submissions through an intuitive interface.

## Features

### 🔐 Authentication
- Simple login system with demo credentials
- Session management with localStorage
- Protected routes with automatic redirect

### 📊 Dashboard
- Overview statistics (products, contacts, FAQs)
- Quick action buttons
- Recent activity feed
- Pending contact notifications

### 📦 Product Management
- **List View**: Search, filter by category/brand, view all products
- **Create/Edit**: Full product form with:
  - Basic info (name, category, brand, price)
  - Multiple image upload via Cloudinary
  - Features and usage instructions
  - Stock status and featured flag
  - Available sizes
- **Delete**: Remove products with confirmation

### ❓ FAQ Management
- **List View**: Search and filter by category
- **Create/Edit**: Question, answer, category, display order
- **Delete**: Remove FAQs with confirmation

### 📧 Contact Management
- **List View**: Filter by status (pending, in-progress, resolved)
- **Detail View**: Full contact information with:
  - Name, email, phone, message
  - Status update buttons
  - Delete option
  - Timestamps
- **Status Updates**: Change status with one click

## Access

### Login Credentials
```
URL: http://localhost:5173/admin/login
Username: admin
Password: admin123
```

### Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/products` - Product list
- `/admin/products/new` - Create product
- `/admin/products/:id/edit` - Edit product
- `/admin/faqs` - FAQ list
- `/admin/faqs/new` - Create FAQ
- `/admin/faqs/:id/edit` - Edit FAQ
- `/admin/contacts` - Contact submissions

## Usage Guide

### Managing Products

#### Create a New Product
1. Navigate to **Products** → **Add Product**
2. Fill in required fields:
   - Product Name
   - Category (select from dropdown)
   - Brand (select from dropdown)
   - Price (in PKR)
   - Description
3. Optional fields:
   - Available Sizes (comma-separated: 100ml, 250ml, 500ml)
   - Features (one per line)
   - Usage Instructions
4. Upload product images:
   - Click the upload area
   - Select one or multiple images
   - Images are uploaded to Cloudinary
   - Remove images by hovering and clicking trash icon
5. Set status:
   - ✓ In Stock
   - ✓ Featured Product
6. Click **Create Product**

#### Edit a Product
1. Go to **Products** list
2. Click **Edit** icon on any product
3. Modify fields as needed
4. Click **Update Product**

#### Delete a Product
1. Go to **Products** list
2. Click **Delete** icon (trash)
3. Confirm deletion

### Managing FAQs

#### Create a New FAQ
1. Navigate to **FAQs** → **Add FAQ**
2. Fill in:
   - Question
   - Answer (detailed response)
   - Category (General, Products, Delivery, etc.)
   - Display Order (lower numbers appear first)
3. Click **Create FAQ**

#### Edit/Delete FAQ
- Similar process to products

### Managing Contact Submissions

#### View Contacts
1. Navigate to **Contacts**
2. Filter by status if needed
3. Click on any contact to view details

#### Update Status
1. Select a contact from the list
2. In the detail view, click status button:
   - **Pending** - New submission
   - **In Progress** - Being handled
   - **Resolved** - Completed
3. Status updates immediately

#### Delete Contact
1. Select a contact
2. Click trash icon in detail view
3. Confirm deletion

## API Integration

All admin operations use the existing backend API:

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### FAQs
- `GET /api/faqs` - List FAQs
- `POST /api/faqs` - Create FAQ
- `PUT /api/faqs/:id` - Update FAQ
- `DELETE /api/faqs/:id` - Delete FAQ

### Contacts
- `GET /api/contact` - List submissions
- `PUT /api/contact/:id` - Update status
- `DELETE /api/contact/:id` - Delete submission

### Image Upload
- `POST /api/upload` - Upload to Cloudinary
- Returns image URL for storage

## Security Notes

### Current Implementation
- Simple hardcoded authentication (demo purposes)
- Token stored in localStorage
- Protected routes check for token

### Production Recommendations
1. **Replace with real authentication**:
   ```javascript
   // In Login.jsx, replace hardcoded check with API call
   const response = await apiClient.post('/auth/login', formData)
   localStorage.setItem('adminToken', response.data.token)
   ```

2. **Add JWT authentication**:
   - Backend: Generate JWT tokens
   - Frontend: Send token in Authorization header
   - Axios interceptor already configured

3. **Add role-based access**:
   - Admin, Editor, Viewer roles
   - Permission checks per action

4. **Implement token refresh**:
   - Refresh expired tokens automatically
   - Handle 401 responses

5. **Add HTTPS in production**:
   - Secure token transmission
   - Prevent man-in-the-middle attacks

## Responsive Design

The admin panel is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with overlay

## Keyboard Navigation

- Tab through form fields
- Enter to submit forms
- Escape to close modals (if implemented)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Can't Login
- Check credentials: admin / admin123
- Clear localStorage and try again
- Check browser console for errors

### Images Not Uploading
- Verify Cloudinary credentials in backend `.env`
- Check file size (max 10MB)
- Ensure file is image format (PNG, JPG, WEBP)

### API Errors
- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console and network tab

### Products Not Showing
- Verify backend has data (run seed script)
- Check API endpoint in browser: `http://localhost:5000/api/products`
- Check browser console for errors

## Future Enhancements

Potential additions:
- [ ] Real authentication with JWT
- [ ] User management (multiple admins)
- [ ] Analytics dashboard
- [ ] Bulk operations (delete multiple)
- [ ] Export data (CSV, PDF)
- [ ] Image optimization
- [ ] Rich text editor for descriptions
- [ ] Product categories management
- [ ] Brand management
- [ ] Order management
- [ ] Email notifications
- [ ] Activity logs
- [ ] Dark mode

## Support

For issues or questions:
- Check browser console for errors
- Verify API is running
- Check network tab for failed requests
- Review this guide

---

**Built with React, Tailwind CSS, and Framer Motion**
