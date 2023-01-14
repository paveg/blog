# blog

![MIT License](https://img.shields.io/github/license/paveg/blog?color=blue)
![Vercel](https://vercelbadge.vercel.app/api/paveg/blog?color)
![eslint workflow](https://github.com/paveg/blog/actions/workflows/eslint.yml/badge.svg)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

This repository is my blog site made from [Next.js](https://nextjs.org/) and [microCMS](https://microcms.io/). And application is hosting from [Vercel](https://vercel.com/docs).

So, I mean I operate serverless basically.

At first, please access the [**フナイログ**](https://www.funailog.com/).

## Technical staffs ([JamStack](https://jamstack.org/))

- [Next.js](https://nextjs.org/) (React framework)
- [Vercel](https://vercel.com/docs) (PaaS)
- [microCMS](https://microcms.io/) (Headless CMS)
- [Mantine](https://mantine.dev/) (React components library)
- [Tailwind CSS](https://tailwindcss.com/) (CSS framework)

## Development

### Preparation

```bash
git clone https://github.com/paveg/blog
cd blog

npm install -g yarn
yarn install
```

### Environment

```bash
cp .env.sample .env
# please, fill in `.env`
```

### Run server

```bash
yarn run dev
# or
npx vercel dev
```

## Lighthouse CI

![Lighthouse Report Image](docs/images/LighthouseReport.jpg)

## License

Copyright © 2022 Ryota Ikezawa (@paveg)

The source code is licensed [MIT](https://github.com/paveg/blog/blob/main/LICENSE).
