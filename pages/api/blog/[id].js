import { blog_details, blog_delete, updateBlog } from '../../../controllers/blogController';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      await blog_details(req, res);
      break;
    case 'DELETE':
      await blog_delete(req, res);
      break;
    case 'PUT':
      await updateBlog(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
