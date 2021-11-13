import { NextApiHandler } from 'next';

const ping: NextApiHandler = (req, res) => {
  res.end()
}

export default ping;