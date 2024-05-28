import fs from "fs";
import { MongoClient } from "mongodb";

const get_info = async () => {
  const uri = "";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db("pssiappka").collection("results");

    const result = await collection.find({}).toArray();

    fs.writeFileSync("static/results.json", JSON.stringify(result));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("Done");
  }
};

const count_info = () => {
  const data = JSON.parse(fs.readFileSync("static/results.json"));
  let map = {};

  data.forEach((element) => {
    const { group } = element;

    if (!(group in map)) {
      console.log(group);
      map[group] = 1;
    } else {
      map[group] = map[group] + 1;
    }
  });

  fs.writeFileSync("static/counted_results.json", JSON.stringify(map));
  console.log("Done");
};

// get_info();
// count_info();
