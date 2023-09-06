<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Explanation</title>
</head>
<body>
    <h1>Code Explanation</h1>
    <h2>Importing Necessary Modules:</h2>
    <pre><code>
        import express from "express";
        import bodyParser from "body-parser";
        import https from "https"; // Import the 'https' module
    </code></pre>
    <p>Here, you import the required Node.js modules for creating a web server (Express.js), parsing request data (body-parser), and making HTTPS requests (https).</p>
    <h2>Express.js Setup:</h2>
    <pre><code>
        const app = express();
        const port = 3000;
    </code></pre>
    <p>This section sets up your Express.js application and specifies that it will listen on port 3000.</p>
    <h2>Middleware Setup:</h2>
    <pre><code>
        app.use(express.static("public"));
        app.use(bodyParser.urlencoded({ extended: true }));
    </code></pre>
    <p><code>express.static("public")</code> serves static files located in the "public" directory. This is typically used for serving CSS, JavaScript, and other client-side assets.</p>
    <p><code>body-parser.urlencoded({ extended: true })</code> is middleware that parses incoming URL-encoded form data and adds it to the <code>req.body</code> object.</p>
    <h2>Handling GET Requests:</h2>
    <pre><code>
        app.get("/", async (req, res) => {
            try {
                // ...
            } catch (error) {
                // ...
            }
        });
    </code></pre>
    <p>This route handles GET requests to the root path ("/").</p>
    <p>It sends an asynchronous request to the Bored API to get a random activity.</p>
    <p>If the request succeeds, it parses the JSON response and logs the result.</p>
    <p>Finally, it renders an "index.ejs" template with the data from the API response.</p>
    <h2>Handling POST Requests:</h2>
    <pre><code>
        app.post("/", async (req, res) => {
            try {
                // ...
            } catch (error) {
                // ...
            }
        });
    </code></pre>
    <p>This route handles POST requests to the root path ("/").</p>
    <p>It extracts data from the request's body (specifically, the <code>type</code> and <code>participants</code> fields).</p>
    <p>It constructs a new request to the Bored API to filter activities based on user input.</p>
    <p>If there are matching activities, it renders one of them randomly; otherwise, it renders an error message.</p>
    <h2>Starting the Express.js Server:</h2>
    <pre><code>
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    </code></pre>
    <p>This code starts the Express.js server and makes it listen on the specified port (3000). It also logs a message to the console to indicate that the server is running.</p>
    <h2><code>makeHttpsRequest</code> Function:</h2>
    <pre><code>
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
    </code></pre>
    <p>This function is used to make HTTPS requests to the Bored API.</p>
    <p>It returns a Promise that resolves with the response data or rejects with an error.</p>
    <p>It sets up an HTTPS request with the provided options, handles response data chunk by chunk, and resolves when the response ends.</p>
</body>
</html>
