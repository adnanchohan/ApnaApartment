# ApnaApartments.com (Demo Client Review)

A premium, highly interactive real estate web application focused exclusively on apartment listings in Pakistan. Designed and built to match the standards of top-tier portals like **Zameen.com**.

> [!NOTE]
> This is a **static frontend demonstration** ready for immediate deployment on **GitHub Pages**. All mock data, interactive map markers, search filters, contact widgets, and shortlists are implemented completely in vanilla client-side technologies (**HTML5, CSS3, JavaScript ES6**).

---

## 🌟 Key Features

1. **Detailed Property Information**:
   - Title, pricing (in Lakhs / Crores PKR), sale vs rent purpose.
   - Core specifications: Bedrooms, Bathrooms, Area (Sq Ft), and Floor numbers.
   - Complete amenities list, custom location strings, and description copy.
   - Integrated premium image slideshow/carousel.

2. **Advanced Search & Filters (Zameen-inspired)**:
   - Interactive Purpose Tabs (All / Buy / Rent).
   - Real-time text search (matches title, location, descriptions).
   - City dropdown select (Karachi, Lahore, Islamabad, Rawalpindi).
   - Bedrooms selector buttons (All / 1 / 2 / 3 / 4+).
   - Furnished status filter (Fully Furnished, Unfurnished, Semi-Furnished).
   - Responsive price budget range slider.

3. **Leaflet.js Map Integration**:
   - Displays real-time geocoded apartment pins.
   - Clicking a pin opens a quick popup card matching the listing, allowing a "Quick View" directly.
   - Pans and zooms automatically to align with filtered properties.

4. **Direct Contact Methods**:
   - **WhatsApp**: Triggers a direct `wa.me` message preset with the property title and link.
   - **Phone Call**: Triggers a dialer `tel:` link.
   - **Inquiry Form**: Fully styled custom contact email form with button animations and success toast states.

5. **Shortlist / Saved Drawer**:
   - Mark properties as favorites. Saved state persists across page reloads via `localStorage`.
   - Access saved properties via a sleek right-side drawer.

---

## 🚀 How to Run Locally

You have two options to view and test this demo on your local machine:

### Option A: Double-Click (Simplest)
1. Navigate to the project folder.
2. Double-click the [index.html](file:///Users/adnanchohan/ApnaApartment/index.html) file to open it directly in Google Chrome, Safari, Edge, or Firefox.

### Option B: Local Server (Recommended for Map tiling smoothness)
To run a local server using one command, open your terminal and run:

**Using Python (comes standard on macOS):**
```bash
python3 -m http.server 8000
```
Then navigate to: `http://localhost:8000` in your browser.

**Using Node.js/NPX:**
```bash
npx serve
```
Then open the localhost link displayed in your terminal.

---

## ☁️ Deploying to GitHub Pages (Static Hosting)

You can host this website on GitHub for free under 2 minutes:

1. **Initialize Git and Commit**:
   Open terminal inside the `ApnaApartment` directory and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ApnaApartments demo"
   ```

2. **Push to a new GitHub Repository**:
   - Create a new public repository on GitHub (e.g. `apna-apartments`).
   - Copy the remote URL and run in your local terminal:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/apna-apartments.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - Go to your repository page on GitHub.com.
   - Click on the **Settings** tab.
   - In the left sidebar, click **Pages** (under Code and automation).
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Your site will be online at: `https://YOUR_USERNAME.github.io/apna-apartments/` within a few moments!
