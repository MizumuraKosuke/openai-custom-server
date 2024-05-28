import { VercelRequest, VercelResponse } from '@vercel/node'

const authenticateToken = (req: VercelRequest, res: VercelResponse, next: () => void) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]
  const validToken = process.env.BEARER_TOKEN

  if (token !== validToken) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  next()
}

export default authenticateToken
