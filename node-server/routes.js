const fs = require('fs');

const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if(req.url === '/') {
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write(` <body>
                        <form action="/message" method="POST">
                            <input type="text" name="message">
                            <button type="submit">Send</button>
                        </form>
                    </body>`);
        res.write('</html>');
    
        return res.end();
    } 
    if(req.url === '/message' && req.method === 'POST') {
        const body = [];
    
        req.on('data', (requestBody) => {
            body.push(requestBody);
        });
    
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();   
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    res.write('<html>');
    res.write('<head><title>Hello World</title></head>');
    res.write('<body><p>Hi! Its been a long time, huh?<p></body>');
    res.write('</html>');
    
    res.end();  
};

// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.text = "Some text";

// exports.handler = requestHandler;
// exports.handler.text = "Some text";

module.exports = { 
    handler: requestHandler,
};