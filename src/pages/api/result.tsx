import { MongoClient } from "mongodb";

export default async function handler(
  req: { method: string; body: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { success: boolean; data?: any; message?: any }): void; new (): any };
    };
  }
) {
  console.log("Request received.");

  if (req.method === "POST") {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MongoDB URI is not defined.");
    }

    const client = new MongoClient(uri);

    let body = JSON.parse(req.body);

    try {
      await client.connect();

      const collection = client.db("pssiappka").collection("results");

      const result = await collection.insertOne({ pseudonym: body.pseudonym, emoji: body.emoji, group: body.group });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
