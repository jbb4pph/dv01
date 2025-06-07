### Installation
Install `nvm`:
https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

```
nvm install v22.6.0
npm install
npx playwright install
```

### Usage
Starts the dev server at http://localhost:3033
```
npm run build
npm run start
```

### Tests
IMPORTANT: The dev server must be running to use the Playwright E2E tests.

Run all tests:
```
npm run test
```

Run only Playwright tests:
```
npx playwright test
```

Run only Jest tests:
```
npx jest
```

