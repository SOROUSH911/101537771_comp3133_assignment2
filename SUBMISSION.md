# COMP3133 Assignment 2 - Submission Guide

**Student:** Soroush Salari
**Student ID:** 101537771

---

## 1. GitHub Repository Setup

The repository should be named `101537771_comp3133_assignment2`.

```bash
# Initialize git and push to GitHub
cd 101537771_comp3133_assignment2
git init
git add .
git commit -m "Initial commit - Angular Employee Management Frontend"
gh repo create 101537771_comp3133_assignment2 --public --source=. --push
```

**Important:** Add `pritamworld` as a collaborator if the repo is private:
- Go to repo Settings > Collaborators > Add `pritamworld`

---

## 2. Deploy Backend (Assignment 1)

### Option A: Deploy to Render (Recommended)

1. Go to [render.com](https://render.com) and create a free account
2. Click "New Web Service" > Connect your GitHub repo for Assignment 1
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your JWT secret
   - `CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` = your Cloudinary API key
   - `CLOUDINARY_API_SECRET` = your Cloudinary API secret
   - `PORT` = 4000
5. Deploy and note the URL (e.g., `https://comp3133-backend-xxx.onrender.com`)

### Option B: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. In the backend directory: `vercel --prod`
3. Set environment variables in Vercel dashboard

---

## 3. Deploy Frontend

### Update Production API URL

Edit `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  graphqlUrl: 'https://YOUR_DEPLOYED_BACKEND_URL/graphql'  // <-- Update this
};
```

### Deploy to Vercel

```bash
cd 101537771_comp3133_assignment2
npm run build
npm i -g vercel
vercel --prod
```

The `vercel.json` file is already configured for SPA routing.

---

## 4. Screenshots Required (Put in one single file)

Take these screenshots and compile them into a single document:

### MongoDB Data (1 screenshot)
- Screenshot of MongoDB Atlas showing the `users` and `employees` collections

### GraphQL API Tests with Postman (5-8 screenshots)
1. Signup mutation
2. Login query
3. Get all employees query
4. Search employee by ID query
5. Search by department/designation query
6. Add employee mutation
7. Update employee mutation
8. Delete employee mutation

### Frontend CRUD Operations (5-8 screenshots)
1. Login page
2. Signup page
3. Employee list (after login)
4. Add Employee form
5. Employee detail view
6. Update Employee form
7. Delete confirmation dialog
8. Logout (redirected to login)

### Search Screen (2-3 screenshots)
1. Search by department with results
2. Search by designation with results
3. Empty search results

---

## 5. D2L Submission Checklist

Before submitting:

- [ ] Remove `node_modules` from both frontend and backend
- [ ] Ensure both GitHub repos are accessible (public or collaborator added)
- [ ] Both apps deployed and working on cloud platform
- [ ] All screenshots compiled in one document
- [ ] ZIP the frontend project folder (without node_modules)

### What to submit on D2L:

1. **GitHub Repository Links:**
   - Frontend: `https://github.com/YOUR_USERNAME/101537771_comp3133_assignment2`
   - Backend: `https://github.com/YOUR_USERNAME/COMP3133_101537771_Assignment1`

2. **Deployed Application Links:**
   - Frontend: `https://your-frontend-url.vercel.app`
   - Backend: `https://your-backend-url.onrender.com/graphql`

3. **Screenshots Document** (single file with all screenshots)

4. **ZIP File** of the project (without node_modules)

---

## 6. Quick Verification

Before submitting, verify everything works:

```bash
# Run tests
npm test

# Build production bundle
npm run build

# Verify the build output exists
ls dist/101537771_comp3133_assignment2/browser/
```

---

## Evaluation Criteria Mapping

| # | Component | Points | Status |
|---|-----------|--------|--------|
| 1 | Deploy backend | 5 | Deploy to Render/Vercel |
| 2 | Deploy frontend | 5 | Deploy to Vercel |
| 3 | GitHub + commits + screenshots | 5 | Repo created, descriptive commits |
| 4 | Signup, Login, Logout with GraphQL | 15 | Implemented with form validation |
| 5 | Employee list with design | 10 | Material table with search |
| 6 | Add Employee with photo | 10 | Form + file upload to Cloudinary |
| 7 | View + Update Employee | 10 | Detail view + edit form |
| 8 | Search by dept/position | 10 | Dropdown search bar |
| 9 | Delete Employee | 10 | Confirmation dialog |
| 10 | UI/UX Material Design | 10 | Full Angular Material theme |
| 11 | Services, Pipes, Routing | 10 | AuthService, EmployeeService, SalaryPipe, Guards, Lazy Routes |
| **Total** | | **100** | |
