import express from "express";
import bodyParser from "body-parser";
import https from "https"; // Import the 'https' module

//Same code using https without

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    try {
        const options = {
            hostname: "bored-api.appbrewery.com",
            port: 443,
            path: "/random",
            method: "GET",
        };

        const response = await makeHttpsRequest(options);
        const result = JSON.parse(response);
        console.log(result);
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.post("/", async(req, res) => {
    try {
        console.log(req.body);
        const type = req.body.type;
        const participants = req.body.participants;
        const options = {
            hostname: "bored-api.appbrewery.com",
            port: 443,
            path: `/filter?type=${type}&participants=${participants}`,
            method: "GET",
        };

        const response = await makeHttpsRequest(options);
        const result = JSON.parse(response);

        if (result.length === 0) {
            res.render("index.ejs", {
                error: "No activities that match your criteria.",
            });
        } else {
            res.render("index.ejs", {
                data: result[Math.floor(Math.random() * result.length)],
            });
        }
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "No activities that match your criteria.",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// Function to make an HTTPS request
function makeHttpsRequest(options) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });
        });

        req.on("error", (error) => {
            reject(error);
        });

        req.end();
    });
}