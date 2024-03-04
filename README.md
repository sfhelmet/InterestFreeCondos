# Interest Free Condos
![Nexus CI](https://github.com/sfhelmet/InterestFreeCondos/actions/workflows/node.js.yml/badge.svg)  
![Coverage](https://img.shields.io/badge/Coverage-93.33%25-brightgreen.svg)
![Quality](https://img.shields.io/badge/Quality-A-brightgreen.svg)

We sell Condos at dirt cheap interest.

## Contributors

|               Name           |     ID    | Username         | Role |
| ---------------------------- | --------- | ---------------- | ---- |
| Simon Foo                    | 40208987  | sfhelmet         | - |
| Kevin Yang                   | 40214231  | kevinyang4       | - |
| Roger Daniel Matute Carcamo  | 40208000  | DanielC2001      | - |
| Razvan Alexandru Cioban      | 40204595  | Razvan-Alexandru | - |
| Paul Touma                   | 40210678  | Rubello21        | - |
| William-Alexandre Messier    | 40208650  | wam82            | - |
| Louka Fortin-Sirianni        | 40210881  | arcvelit         | - |
| Kevin Duong                  | 40209877  | KD54321          | - |
| Eric Tan                     | 40208502  | EricTan19        | - |
| Binal Patel                  | 40212973  | binal011         | - |

## Usage

### To create a new screen

1. Create a new component in `src/screens`.

2. In your `src/config/routes.ts`.

```js
{
    path: "/your-route",
    component: YourScreenComponentName,
    name: "Screen Name For Reference",
    protected: false, // if user needs to be authenticated to access this screen
}
```

### How to Run
You will need to create a .env file outside the src folder to run the app.

Please email Simon for env variables.

Note: These commands are for making a production build/version of the app.
```bash
npm i -g serve
npm run build
serve -s build
```

Note 2: Use this for normal development.
```bash
npm start
```