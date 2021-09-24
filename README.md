<img src="./frontend/public/assets/icon/icon.png" width="200" align="right" />

# Tutorific

Tutorific is a one-stop bi-directional platform for tutors and tutees to find each other without the hassle of a middle man. Gone are the days where tutors have to go through a tuition agency to find tutees just to find out that there is a mismatch of expectations with the allocated tutee.

Tutorific provides tutors and tutees with all the transparency and power they need to find the one that can best fulfill their academic needs, instead of relying on a hidden matching algorithm. Visit https://tutorific.herokuapp.com to try it out today!

## Team Members
1. **Cao Wenjie (A0205344N)**

    **Role:** Backend Developer  
    **Responsibilities:** Authentication, Models, User CRUD, Profile CRUD

2. **Chrystal Quek Wan Qi (A0206350U)**

    **Role:** Backend Developer  
    **Responsibilities:** Tutor Listings CRUD, Tutee Listings CRUD, Chat CRUD

3. **Goh Siau Chiak (A0150036W)**

    **Role:** Frontend Developer  
    **Responsibilities:** Tutor Listings pages, Tutee Listings pages

4. **Seow Alex (A0199262U)**

    **Role:** Frontend Developer  
    **Responsibilities:** Authentication pages, Chat pages, Profile pages

## Development

This repository is a monorepo containing both the frontend and the backend in their respective folders.

### Requirements

* Node.js (tested on v14.17.6)
* PostgreSQL (tested on v13.4)

The following step is common for both the `frontend` and `backend` folder.

1. Install all dependencies and setup the pre-commit hooks:

```bash
npm install
``` 

### Backend

1. Generate a set of VAPID keys for Push API testing:

```bash
npx web-push generate-vapid-keys
```

2. Populate the `.env` file (following the `.env.example` file) with the generated VAPID keys. If the default user (`postgres`) and password (`postgres`) does exist, edit the variables in the `.env` file as well.

3. Create/seed the database:

```bash
npm run db:create
```

or

```bash
npm run db:seed
```

4. Start the development server:

```bash
npm run dev
```

### Frontend

1. Edit the VAPID public key defined in `frontend/src/App.tsx` for push API testing.

2. (Optional) Edit the proxy specified in `package.json` if a port other than 5000 is used.

3. Start the development server:

```bash
ionic serve
```

### Production

You may also choose to run the app in production mode. Notably, the service worker (and therefore offline functionality and push notifications) only work while in production mode.

1. Build the frontend and backend:

```bash
cd frontend
npm run build
cd ../backend
npm run build
```

2. Inside the `backend` folder, start the production server:

```bash
npm start
```
