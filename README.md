# RB Call Sessions

## Getting Started

### Requirements

- [`node`](https://nodejs.org/en/) (we recommend installing it via [fnm](https://github.com/Schniz/fnm)). The required Node version is documented in [`package.json`](./package.json#L9).
- [`yarn`](https://yarnpkg.com)

### Configuring Environment Variables

Stary by copying the `.env.sample` file to `.env`

```bash
cp .env.sample .env
```

Then, populate all of the values appropriately. You can see how each value is validated in `src/helpers/env.mjs`.

### Installing Dependencies

```
yarn install
```

### Local Development

For local development, you have two different options. The simplest and easiest for getting started is probably to build your components abstractly in Storybook. That way, you can break them up into scenes and test them individually, with arbitrary props and initial states.

```
yarn storybook
```

To start a local development server at [http://localhost:3000](http://localhost:3000), run the following:

```bash
yarn dev
```

### Payload CMS

This application uses the Payload CMS, its admin interface can be accessed at [http://localhost:3000/admin](http://localhost:3000/admin)
If you are running the project connected to a local database, you will first need to create a new user to enable the admin UI.
However, if you are running the project connected to the live database, one of the global admins will have to set up a user for you. Reach out to any of the other developers on the project to do this.

All Payload REST API endpoints are grouped under `/api/payload/*`, while `/api/*` routes to custom API endpoints for the web application.

For data fetching from Payload CMS, server components and routes use the [Payload Local API](https://payloadcms.com/docs/local-api/overview).

## Helpful Links

- Payload documentation: https://payloadcms.com/docs/getting-started/what-is-payload
