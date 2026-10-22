import express from "express";
import { prisma } from "../config/config.prisma.js";
import asyncHandler from "express-async-handler";

export const getAllPosts = asyncHandler(async (req: express.Request, res: express.Response) => {
    const posts = (await prisma.post.findMany({
        include: {
            writtenby: true,
            favoritedby: true,
        },
        // where: {
        //     published: true,
        // },
        // orderBy: {
        //     createdAt: "desc",
        // },
        // skip:2,
        // take: 5,
    }))

    res.json(posts);
});

export const getPostById = asyncHandler(async (req: express.Request, res: express.Response) => {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            writtenby: true,
            favoritedby: true,
        },
    });

    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    res.json(post);
});

export const createPost = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { title, content, published, autherId, authid } = req.body;

    const newPost = await prisma.post.create({
      data: {title,content,published,autherId,authid},
      include: {
        writtenby: true,
        favoritedby: true,
      },
    });

    res.status(201).json(newPost);
  }
);

export const updatePost = asyncHandler(async (req: express.Request, res: express.Response) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { title, content },
        include: {
            writtenby: true,
            favoritedby: true,
        },
    });

    res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req: express.Request, res: express.Response) => {
    const postId = req.params.id;

    await prisma.post.delete({
        where: { id: postId },
    });

    res.status(204).send("Post deleted successfully");
}); 