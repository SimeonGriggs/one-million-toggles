# One million toggles

A [Remix](https://remix.run/) website showing off the [Sanity Live Content API](https://www.sanity.io/docs/live-content-api) with a million toggles.

Clone this repository and run the command below to start a new free Sanity project with your own account. If you don't have an account you will be prompted to create one.

```bash
npx sanity@latest init --env
```

You can seed the project with the data from this project by running the following command:

```bash
npx sanity@latest exec ./scripts/createData.ts --with-user-token
```
