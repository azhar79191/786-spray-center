# Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
# 1. Start backend
cd backend && npm run dev

# 2. Start frontend (new terminal)
cd frontend && npm run dev

# 3. Open browser
http://localhost:5173/admin/login

# 4. Login
Username: admin
Password: admin123
```

## 📍 Admin Routes

| URL | Page | Purpose |
|-----|------|---------|
| `/admin/login` | Login | Authenticate |
| `/admin/dashboard` | Dashboard | Overview |
| `/admin/products` | Products | List products |
| `/admin/products/new` | New Product | Create product |
| `/admin/products/:id/edit` | Edit Product | Update product |
| `/admin/faqs` | FAQs | List FAQs |
| `/admin/faqs/new` | New FAQ | Create FAQ |
| `/admin/faqs/:id/edit` | Edit FAQ | Update FAQ |
| `/admin/contacts` | Contacts | Manage inquiries |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate fields |
| `Enter` | Submit form |
| `Esc` | Close modal |
| `Ctrl/Cmd + S` | Save (in forms) |

## 📦 Product Management

### Create Product
1. Click **Add Product**
2. Fill required fields (name, category, brand, price, description)
3. Upload images (drag & drop or click)
4. Set status (in stock, featured)
5. Click **Create Product**

### Edit Product
1. Click **Edit** icon
2. Modify fields
3. Click **Update Product**

### Delete Product
1. Click **Delete** icon
2. Confirm deletion

## ❓ FAQ Management

### Create FAQ
1. Click **Add FAQ**
2. Enter question and answer
3. Select category
4. Set display order (lower = first)
5. Click **Create FAQ**

## ✉️ Contact Management

### Update Status
1. Click contact in list
2. View details in right panel
3. Click status button:
   - **Pending** (orange)
   - **In Progress** (blue)
   - **Resolved** (green)

## 🎨 Color Codes

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Dark Blue | `#0F172A` |
| Gold | Gold | `#D4A017` |
| Success | Green | `#10B981` |
| Warning | Orange | `#F59E0B` |
| Error | Red | `#EF4444` |
| Info | Blue | `#3B82F6` |

## 🔧 API Endpoints

### Products
```
GET    /api/products           # List
POST   /api/products           # Create
GET    /api/products/:id       # Get one
PUT    /api/products/:id       # Update
DELETE /api/products/:id       # Delete
```

### FAQs
```
GET    /api/faqs               # List
POST   /api/faqs               # Create
GET    /api/faqs/:id           # Get one
PUT    /api/faqs/:id           # Update
DELETE /api/faqs/:id           # Delete
```

### Contacts
```
GET    /api/contact            # List
GET    /api/contact/:id        # Get one
PUT    /api/contact/:id        # Update status
DELETE /api/contact/:id        # Delete
```

### Upload
```
POST   /api/upload             # Upload image
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Use admin/admin123 |
| Images not uploading | Check Cloudinary config |
| API errors | Verify backend is running |
| 404 errors | Check API base URL |
| Blank page | Check browser console |

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column |
| Tablet | 640-1024px | 2 columns |
| Desktop | > 1024px | Full layout |

## 🎯 Status Badges

### Contact Status
- 🟠 **Pending** - New submission
- 🔵 **In Progress** - Being handled
- 🟢 **Resolved** - Completed

### Product Status
- 🟢 **In Stock** - Available
- 🔴 **Out of Stock** - Not available
- ⭐ **Featured** - Highlighted product

## 📊 Dashboard Stats

| Card | Shows |
|------|-------|
| Total Products | Count of all products |
| Contact Submissions | Total inquiries |
| Total FAQs | Count of FAQs |
| Pending Contacts | Unresolved inquiries |

## 🔒 Security Notes

### Current (Demo)
- Hardcoded credentials
- localStorage token
- Client-side validation

### Production TODO
- [ ] JWT authentication
- [ ] Password hashing
- [ ] Rate limiting
- [ ] HTTPS
- [ ] CSRF protection

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `ADMIN_PANEL_GUIDE.md` | Complete guide |
| `ADMIN_PANEL_SUMMARY.md` | Quick start |
| `ADMIN_PANEL_STRUCTURE.md` | Visual diagrams |
| `SEMANTIC_HTML_IMPROVEMENTS.md` | Accessibility |
| `IMPLEMENTATION_SUMMARY.md` | Technical details |
| `QUICK_REFERENCE.md` | This file |

## 🎨 Component Files

### Admin Pages
```
src/pages/Admin/
├── Login.jsx
├── Dashboard.jsx
├── Products/
│   ├── ProductList.jsx
│   └── ProductForm.jsx
├── FAQs/
│   ├── FAQList.jsx
│   └── FAQForm.jsx
└── Contacts/
    └── ContactList.jsx
```

### Layouts
```
src/layouts/
├── MainLayout.jsx      # Public site
└── AdminLayout.jsx     # Admin panel
```

## 🧪 Testing Checklist

### Quick Test (5 minutes)
- [ ] Login
- [ ] View dashboard
- [ ] Create product
- [ ] Upload image
- [ ] Create FAQ
- [ ] View contact
- [ ] Update contact status
- [ ] Logout

### Full Test (15 minutes)
- [ ] All CRUD operations
- [ ] Search and filters
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Form validation

## 💡 Pro Tips

1. **Search**: Use search bars to quickly find items
2. **Filters**: Combine filters for precise results
3. **Bulk**: Select multiple items (coming soon)
4. **Mobile**: Manage content on the go
5. **Keyboard**: Use Tab and Enter for faster navigation

## 🆘 Support

### Check First
1. Browser console (F12)
2. Network tab (failed requests)
3. Backend logs
4. Environment variables

### Common Issues
- **401 Error**: Token expired, login again
- **404 Error**: Check API URL
- **500 Error**: Backend issue, check logs
- **CORS Error**: Check backend CORS config

## 📞 Contact

For issues:
1. Check documentation
2. Review error messages
3. Check browser console
4. Verify API is running

---

## 🎉 Quick Win

**Create your first product in 60 seconds:**

1. Login → Dashboard
2. Click "Add Product"
3. Name: "Test Product"
4. Category: "Insecticides"
5. Brand: "Bayer"
6. Price: "1000"
7. Description: "Test description"
8. Click "Create Product"
9. ✅ Done!

---

**Keep this card handy for quick reference!**
