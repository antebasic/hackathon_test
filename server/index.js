const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //req.body

//get all
app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM test");
    res.json(result.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//insert into table
app.post("/add", async (req, res) => {
  try {
    const { FirstName, LastName } = req.body;
    console.log(FirstName, LastName);
    const newInput = await pool.query(
      `INSERT INTO test (FirstName, LastName) VALUES ('${FirstName}', '${LastName}') RETURNING *`
    );

    res.json(newInput.rows[0]);
    res.json({});
  } catch (err) {
    console.error(err.message);
  }
});

// get by id
app.get("/test/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM test WHERE testid = $1", [
      id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update item
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName } = req.body;
    const updated = await pool.query(
      "UPDATE test SET FirstName = $1, LastName = $2 WHERE testid = $3",
      [FirstName, LastName, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete item
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query("DELETE FROM test WHERE testid = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
