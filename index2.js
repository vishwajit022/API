import https from "https";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();

app.get("/", (req, res) => {
    const options = {
        hostname: "https://bored-api.appbrewery.com",
        path: "/api/activity",
        method: "GET",
    };

    const request = https.request(options, (response) => {
        let data = "";
        console.log(`Response status code: ${response.statusCode}`);

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            try {
                const result = JSON.parse(data);
                res.render("./index.ejs", { activity: result.activity });
            } catch (error) {
                console.error("Failed to parse response", error.message);
                res.status(500).send("Failed to send Activity. Please try again");
            }
        });
    });

    request.on("error", (error) => {
        console.error("Failed to make request:", error.message);
        res.status(500).send("Failed to fetch activity. Please try again");
    });

    request.end();
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});