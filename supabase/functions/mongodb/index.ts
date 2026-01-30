import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// MongoDB Data API endpoint
const MONGODB_DATA_API = "https://data.mongodb-api.com/app/data-api/endpoint/data/v1";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const MONGODB_URI = Deno.env.get("MONGODB_URI");
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not configured");
    }

    // Parse MongoDB URI to extract database and API key info
    // Expected format: mongodb+srv://... or a Data API key
    const { action, collection, data, filter, email } = await req.json();

    console.log(`MongoDB action: ${action} on collection: ${collection}`);

    // For MongoDB Atlas Data API, you need the API key and endpoint
    // The MONGODB_URI should contain the Data API key
    const apiKey = MONGODB_URI;
    const database = "cognisense";

    const makeMongoRequest = async (mongoAction: string, body: Record<string, unknown>) => {
      const response = await fetch(`${MONGODB_DATA_API}/action/${mongoAction}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database,
          collection,
          ...body,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("MongoDB API error:", error);
        throw new Error(`MongoDB API error: ${error}`);
      }

      return response.json();
    };

    let result;

    switch (action) {
      case "findOne":
        result = await makeMongoRequest("findOne", { filter: filter || { email } });
        break;

      case "find":
        result = await makeMongoRequest("find", { filter: filter || {} });
        break;

      case "insertOne":
        result = await makeMongoRequest("insertOne", { document: data });
        break;

      case "updateOne":
        result = await makeMongoRequest("updateOne", {
          filter: filter || { email },
          update: { $set: data },
          upsert: true,
        });
        break;

      case "deleteOne":
        result = await makeMongoRequest("deleteOne", { filter: filter || { email } });
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log("MongoDB operation successful");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MongoDB function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
