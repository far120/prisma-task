import express from "express";
import { prisma } from "../config/config.prisma.js";
// import { User } from "../generated/prisma/client.js";
import asyncHandler from "express-async-handler";

export const getAllUsers = asyncHandler(async (req: express.Request, res: express.Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export const getUserById = asyncHandler(async (req: express.Request, res: express.Response) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(user);
});

export const createUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, age } = req.body;

    const newUser: User = await prisma.user.create({
        data: { firstName, lastName, email, age },
    });

    res.status(201).json(newUser);
});

export const updateUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const userId = req.params.id;
    const { firstName, lastName, email, age } = req.body;

        const updatedUser: User = await prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName, email, age },
    });

    res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const userId = req.params.id;

    await prisma.user.delete({
        where: { id: userId },
    });

    res.status(204).send("User deleted successfully");
});


 

