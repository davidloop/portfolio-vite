/**
 * Vite plugin to handle email sending during development
 * This replaces the PHP backend for local development
 */

export function emailPlugin() {
  return {
    name: 'email-handler',
    configureServer(server) {
      server.middlewares.use('/send-email.php', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            if (!body) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: false, error: 'No data received' }));
              return;
            }

            const formData = JSON.parse(body);
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: false, error: 'Missing required fields' }));
              return;
            }

            // Log the email to console (development mode)
            console.log('\n========== EMAIL NOTIFICATION ==========');
            console.log(`Subject: New Contact Form Submission from ${formData.name}`);
            console.log('Form Data:');
            console.log(`- Name: ${formData.name}`);
            console.log(`- Email: ${formData.email}`);
            console.log(`- Message: ${formData.message}`);
            console.log(`- Submitted at: ${new Date().toLocaleString()}`);
            console.log('==========================================\n');

            // Return success response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ 
              success: true, 
              message: 'Email logged to console (development mode)' 
            }));

          } catch (error) {
            console.error('Error processing form data:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON data' }));
          }
        });
      });
    }
  };
}
