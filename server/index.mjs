import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {MikroORM} from '@mikro-orm/core';
import { PostgreSqlDriver} from '@mikro-orm/postgresql';
import { RequestLogSchema, RequestLog } from './entities/RequestLog.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin : "https://trest-frontend.onrender.com",
  credentials: true,
}));

let orm;
async function initORM() {
  orm = await MikroORM.init({
    driver: PostgreSqlDriver,
    entities: [RequestLogSchema],
    // dbName: process.env.DB_NAME,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST || 'localhost',
    // port: parseInt(process.env.DB_PORT || '5432'),
    clientUrl: process.env.DATABASE_URL,
    forceEntityConstructor: true,
  });
  await orm.getSchemaGenerator().updateSchema();
}
await initORM();

app.post('/request', async (req, res) => {
  const { method, url, body } = req.body;
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: ['POST', 'PUT'].includes(method) ? body : undefined,
    });
    const text = await response.text();

    const em = orm.em.fork();
    const log = new RequestLog();
    log.method = method;
    log.url = url;
    log.body = body;
    log.response = text;
    await em.persistAndFlush(log);

    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/history', async (req, res) => {
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '5');
  const offset = (page - 1) * limit;

  const em = orm.em.fork();
  const [logs, count] = await em.findAndCount(RequestLog, {}, {
    offset,
    limit,
    orderBy: { createdAt: 'DESC' },
  });

  res.json({
    logs,
    totalPages: Math.ceil(count / limit),
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
