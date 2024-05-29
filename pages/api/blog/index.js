import { blog_index } from '../../../controllers/blogController';

export default async (req, res) => {
  if (req.method === 'GET') {
    await blog_index(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

