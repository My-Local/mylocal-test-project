## Test Intro

Just a small feed of posts, ordered by date descending, with a modal to add new posts.

Can perform CRUD on posts, as well as an upvote and downvote feature.

In total I've counted around 10 things to improve, some are bugs, some are hints of functionality that could potentially be added. Have a read through the code and a click through and then have a crack at it and see where you get to. Feel free to update anything you feel you could make better (front end or just refactoring).

## Getting started

### To run the project locally:

0. Make sure you have yarn installed globally

```bash
 npm install --global yarn
```

1. git clone this repo
2. Create a local .env file:

```bash
  cp .env.example .env
```

3. Branch from main to work on

4. Install dependencies:

```bash
  yarn install
```

5. Update your local db schema:

```bash
  yarn db:push
```

6. Run the project:

```bash
  yarn dev
```

### Notes

You have to run `yarn db:push` every time you make changes to the schema in `prisma/schema.prisma`, in order to update your local db.

And you may have to stop your server and start it again (ctrl+c, then `yarn dev`) if you make changes to your schema and run db:push, and are getting errors related to the changes you just made.

If you are trying to commit but eslint isn't letting you, commit with:

```bash
  git commit -m "commit message" --no-verify
```

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

### What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

### Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

### How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
