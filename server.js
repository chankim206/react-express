const express = require("express");

const app = express();
app.set("port", process.env.PORT || 5000);
app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Young", lastName: "Kim" },
    { id: 1, firstName: "John", lastName: "Smith" }
  ];
  res.json(customers);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () =>
  console.log(`Server started on port ${app.get("port")}`)
);
