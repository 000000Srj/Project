# SyncSlide
SyncSlide – Emphasizes synchronized viewing of slides in real time.

# To-Do List for Synchronized PDF Co-Viewer

## Step 1: Basic Server and Client Setup
- [x] Set up a Node.js project
- [x] Install dependencies: `express` and `socket.io`
- [x] Create a basic Express server to serve static files
- [x] Set up Socket.IO for real-time communication
- [x] Design basic HTML layout for PDF viewer

## Step 2: PDF Viewer with PDF.js
- [x] Include PDF.js library in the project
- [x] Implement JavaScript to load and render PDF pages
- [x] Add "Next" and "Previous" buttons for navigation
- [x] Display current page number and total pages
- [x] Show other pages on side
- [x] Highlight the current page shown
- [x] Reset button for new pdf

## Step 3: Real-Time Synchronization
- [x] Use Socket.IO to create connections for each client
- [x] Group making of all the user 
- [x] highlight the admin
- [x] Emit `pageChanged` events from the admin (presenter)
- [x] Ensure viewer clients listen for `pageChanged` events
- [x] Sync new viewers to the admin’s current page on join

## Step 4: Role Management (Admin vs. Viewer)
- [x] Designate the first connection as admin or use `/admin` URL
- [x] Allow only the admin to control page navigation
- [x] Disable controls on the viewer side

## Step 5: Add Optional Features for Better Experience
- [ ] Show loading spinner while PDF pages load
- [ ] Display user count and presence indicators
- [ ] Implement simple chat or Q&A feature with Socket.IO
- [ ] Allow admin to share the PDF link with viewers

## Step 6: Optimize and Test
- [ ] Optimize PDF loading with lazy loading or preloading
- [ ] Test with multiple users to ensure smooth synchronization
- [ ] Handle disconnections and auto-reconnect for viewers
- [ ] Deploy on a cloud platform (e.g., Heroku, Vercel, DigitalOcean)
