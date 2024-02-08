const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //console.log(req);
    //process.exit(); // exits the server
    res.setHeader('Content-Type', 'text/html');

    if(req.url === '/') {
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write(` <body>
                        <form action="/message" method="POST">
                            <input type="message" name="message">
                            <button type="submit">Send</button>
                        </form>
                    </body>`);
        res.write('</html>');
    
        return res.end();
    } else if(req.url === '/message' && req.method === 'POST') {
        const body = [];

        req.on('data', (requestBody) => {
            // console.log(requestBody); 
            body.push(requestBody);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);

            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
    }

    res.write('<html>');
    res.write('<head><title>Hello World</title></head>');
    res.write('<body><p>Hi! Its been a long time, huh?<p></body>');
    res.write('</html>');

    res.end();
});

server.listen(3000);