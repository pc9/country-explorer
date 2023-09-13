# Country Explorer - Next.js Project

A Simple NextJs project to implement search functionality using a public API [REST Countries](https://restcountries.com/). Web App with 2 screens

- Listing and Search screen
- Country Information screen

![Project Preview](public/preview.gif 'Project Preview')
[Demo](https://country-explorer-rho.vercel.app/)

### Highlights

- Next.js -13 Project
- Follows newer App rouing introduced in Next.js 13
- Styled using Tailwind CSS
- `@tanstack/react-query` as data fetching libraray
- SSR
- Server API caching
- Fetching data while rendering using `<Suspense>`
- Linting using `Eslint`
- `Prettier` for code formatting
- `throttle` and `useDeferredValue` both are used in combination with `useQuery` from `react-query` to optimise fetch and render search results.

### Getting Started

- Simply run these commands

```sh
# Clone the repository
git clone https://github.com/pc9/country-explorer.git

# Navigate to the project directory
cd country-explorer

# Install dependencies
npm install

# run developent server
npm run dev
```

- Create a copy of `.evn` as `.evn.local` and add `NEXT_PUBLIC_GOOGLE_API_KEY` value to render maps (Optional).

- Open http://localhost:3000 with your browser to see the result.

### Useful Commands

```sh
# to run development server
npm run dev

# to create build
npm run build

# to start using the build
npm start

# to lint manually
npm run lint

# to run prettier manually
npm run format
```

### Potential Enhancements

- Adding service worker to add offline support.
- Design improvement in terms of both UI and UX.
- Loading optimization by adding critical CSS.
- Adding Internationalization (i18n) in project.
- Adding `manifest.json` for making web app Installable on devices.
- Building PWA.
