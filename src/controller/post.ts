import { Request, Response, NextFunction } from "express";
import config from "../config";
import { Post } from "../model";
import { PostDocument } from "post";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, contents, address } = req.body;

  const images = (req.files as Express.Multer.File[]).map(
    (file: Express.Multer.File) => {
      return `${config.domain}/${file.path}`;
    }
  );

  const post = await Post.create({
    title,
    contents,
    address,
    images,
  });

  res.status(201).json({ postId: post.id });
}

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const posts = await Post.find();

  res.status(200).json({
    posts: parsePost(posts),
  });
}

function parsePost(posts: PostDocument[]) {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    image: post.images[0],
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
}
