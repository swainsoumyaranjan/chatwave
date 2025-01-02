import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dating_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());
app.use(express.json());

// Matching Algorithm
const findSimilarProfiles = async (userId, limit = 3) => {
  const connection = await pool.getConnection();
  try {
    // Get user's interests
    const [userInterests] = await connection.query(
      'SELECT interest_id FROM user_interests WHERE user_id = ?',
      [userId]
    );
    
    // Find users with similar interests
    const [similarUsers] = await connection.query(`
      SELECT DISTINCT u.id, u.name, u.bio, COUNT(ui.interest_id) as shared_interests
      FROM users u
      JOIN user_interests ui ON u.id = ui.user_id
      WHERE ui.interest_id IN (
        SELECT interest_id FROM user_interests WHERE user_id = ?
      )
      AND u.id != ?
      GROUP BY u.id
      ORDER BY shared_interests DESC
      LIMIT ?
    `, [userId, userId, limit]);
    
    return similarUsers;
  } finally {
    connection.release();
  }
};

// Routes
app.post('/api/match', async (req, res) => {
  const { userId, targetId, liked } = req.body;
  
  try {
    if (liked) {
      const [match] = await pool.query(
        'INSERT INTO matches (user_id, target_id, status) VALUES (?, ?, ?)',
        [userId, targetId, 'pending']
      );
      
      // Check if mutual match
      const [mutual] = await pool.query(
        'SELECT * FROM matches WHERE user_id = ? AND target_id = ? AND status = ?',
        [targetId, userId, 'pending']
      );
      
      if (mutual.length > 0) {
        // Update both matches to matched
        await pool.query(
          'UPDATE matches SET status = ? WHERE (user_id = ? AND target_id = ?) OR (user_id = ? AND target_id = ?)',
          ['matched', userId, targetId, targetId, userId]
        );
        
        return res.json({ status: 'matched' });
      }
    }
    
    res.json({ status: 'pending' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-chat', (roomId) => {
    socket.join(roomId);
  });
  
  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});