//@ts-ignore
const { createServer } = require("the-fake-backend");

const server = createServer();

server.routes([
  {
    path: "/example",
    methods: [
      {
        type: "post", // or MethodType.GET with Typescript
        data: "ok",
        // data: (req) => 'your-response-data-here-based-in-request'
      },
    ],
  },
]);

server.listen(8080);
