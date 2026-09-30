import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import tokensRouter from './routes/tokens.js';
import paymentRouter from './routes/payment.js';
import aiRouter from './routes/ai.js';
import hologramRouter from './routes/hologram.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Allow rich chaotic styling and assets
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-demo-user-id'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/ai', aiRouter);
app.use('/api/hologram', hologramRouter);

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`💀 WORST UI BACKEND SERVER ONLINE ON PORT ${PORT}`);
  console.log(`🌐 Ready for chaotic anti-UX requests`);
  console.log(`🔑 Gemini integration active (server-side only)`);
  console.log(`🛡️  Safe simulated payments enabled`);
  console.log(`=================================================\n`);
});

export default app;
