## How to Run

For your first time, run

```
npm run build
```

in order to create the initial build artifacts. Afterwards you're able to use

```
npm run watch
```

to keep recompiling the code as changes are made.

To actually invoke the file, run

```
node dist/main.js
```

from the root of the `AdventOfCode` directory. This will actually invoke the main file as configured in `package.json`. Note that Parcel is required to build the project.
