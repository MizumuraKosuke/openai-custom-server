import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { OPENAI_API_KEY, OPENAI_CHAT_URL } from '../config'
import { ChatCompletion, ChatCompletionCreateParams } from 'openai/resources'
import authenticateToken from './middleware/auth'

/** Hobby: 10s (default) - configurable up to 60s, Pro: 15s (default) - configurable up to 300s, Ent: 15s (default) - configurable up to 900s */
export const config = {
  maxDuration: 60,
}

export default async (req: VercelRequest, res: VercelResponse) => {
  authenticateToken(req, res, async () => {
    const { message, model } = req.body
    const options: ChatCompletionCreateParams = {
      model: model || 'gpt-4o',
      messages: [
        { role: 'user', content: message },
      ],
    }
    try {
      const response = await axios.post<ChatCompletion>(
        `${OPENAI_CHAT_URL}`, 
        options,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        },
      )
    
      res.status(200).json(response.data.choices[0].message.content)
    } catch (error) {
      res.status(500).json({ error })
    }
  })
}
