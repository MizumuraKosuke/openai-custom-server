import { VercelRequest, VercelResponse } from '@vercel/node'
import { BEARER_TOKEN } from '../../config'

const authenticateToken = (req: VercelRequest, res: VercelResponse, next: () => void) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  if (token !== BEARER_TOKEN) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  next()
}

export default authenticateToken
