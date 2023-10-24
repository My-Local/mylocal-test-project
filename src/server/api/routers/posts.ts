import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().optional(),
        content: z.string(),
        status: z.enum(["draft", "published", "deleted"]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title ?? null,
          content: input.content,
          status: input.status,
        },
      });
    }),
  getPost: publicProcedure
    .input(z.object({ id: z.number().nullable() }))
    .query(({ ctx, input }) => {
      if (!input.id) return null;
      return ctx.db.post.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  editPost: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string(),
        updatedAt: z.date(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title ?? null,
          content: input.content,
        },
      });
    }),
  upvotePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      });
    }),
  downvotePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          downvotes: {
            increment: 1,
          },
        },
      });
    }),
  resetPost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          downvotes: {
            set: 0,
          },
          upvotes: {
            set: 0,
          },
        },
      });
    }),
});
