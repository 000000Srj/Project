const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const groups = {}; // Store groups information

// Serve static files (HTML, JS, CSS)
app.use(express.static('public'));

// Handle creating a new group
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Create a new group
  socket.on('createGroup', ({ groupName, adminName }) => {
    if (!groups[groupName]) {
      // Create a new group with the admin's name and ID
      groups[groupName] = {
        admin: { id: socket.id, name: adminName },
        members: [{ id: socket.id, name: adminName }]
      };
      socket.join(groupName); // Add user to the group
      socket.emit('groupCreated', { groupName, admin: adminName });
      io.to(groupName).emit('updateGroup', { groupName, admin: adminName, members: groups[groupName].members });
    } else {
      socket.emit('error', 'Group already exists.');
    }
  });

  // Join an existing group
  socket.on('joinGroup', ({ groupName, userName }) => {
    const group = groups[groupName];
    if (group) {
      group.members.push({ id: socket.id, name: userName });
      socket.join(groupName); // Add user to the group
      socket.emit('joinedGroup', { groupName, admin: group.admin.name });
      io.to(groupName).emit('updateGroup', { groupName, admin: group.admin.name, members: group.members });
    } else {
      socket.emit('error', 'Group does not exist.');
    }
  });

  // Disconnect user
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Remove user from groups
    for (const groupName in groups) {
      const group = groups[groupName];
      group.members = group.members.filter(member => member.id !== socket.id);
      if (group.members.length === 0) {
        delete groups[groupName]; // Delete group if no members left
      } else {
        io.to(groupName).emit('updateGroup', { groupName, admin: group.admin.name, members: group.members });
      }
    }
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
