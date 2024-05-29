import { blog_create_post } from '../../../controllers/blogController';

export default async (req, res) => {
  if (req.method === 'POST') {
    await blog_create_post(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
