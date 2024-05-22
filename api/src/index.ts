import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Type'],
    maxAge: 3600
  })
)
app.use(logger())

async function ping(ip: string, port: string): Promise < number > {
  try {
    const begin = Date.now();
    await fetch(`http://${ip}:${port}`);
    const end = Date.now();
    return end - begin;
  } catch (e) {
    return 9999;
  }
}

app.get('/', async (c) => {
  const { ip , port } = c.req.query()
  console.log(ip, port)
  if(!ip || !port) {
    return c.json({
      err: 'Please provide an IP and Port'
    }, 400)
  }

  const latency = await ping(ip, port);

  return c.json({
    latency
  })
})

export default app
