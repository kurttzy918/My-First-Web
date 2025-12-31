require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ];
        const allowedExtensions = ['.xlsx', '.xls', '.csv'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        
        if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Only Excel files are allowed (.xlsx, .xls, .csv)'));
        }
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory storage for demo (replace with database in production)
const orders = [];
const quotes = [];

// Routes

// 1. Upload Excel file and process quote
app.post('/api/upload-quote', upload.single('excelFile'), async (req, res) => {
    try {
        const { name, email, company, businessType, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Process Excel file
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Analyze the data (simple analysis for demo)
        const rowCount = data.length;
        const columns = Object.keys(data[0] || {});
        const hasInventoryData = columns.some(col => 
            col.toLowerCase().includes('quantity') || 
            col.toLowerCase().includes('stock') ||
            col.toLowerCase().includes('price')
        );

        // Generate quote based on analysis
        let quoteAmount = 5000; // Base price
        if (rowCount > 1000) quoteAmount += 2000;
        if (rowCount > 5000) quoteAmount += 3000;
        if (hasInventoryData) quoteAmount += 1000;

        const quoteId = uuidv4();
        const quote = {
            id: quoteId,
            name,
            email,
            company,
            businessType,
            description,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            filePath: req.file.path,
            rowCount,
            columns,
            quoteAmount,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        quotes.push(quote);

        // Send confirmation email
        await sendQuoteEmail(email, name, quoteId, quoteAmount);

        res.status(200).json({
            success: true,
            message: 'File uploaded and quote generated successfully',
            quoteId,
            quoteAmount,
            rowCount,
            columns
        });

    } catch (error) {
        console.error('Error processing quote:', error);
        res.status(500).json({ error: 'Error processing quote request' });
    }
});

// 2. Process payment
app.post('/api/process-payment', async (req, res) => {
    try {
        const { packageType, paymentMethod, customerInfo, quoteId } = req.body;

        // Get package details
        const packages = {
            basic: { name: 'Basic Package', price: 5000 },
            pro: { name: 'Pro Package', price: 10000 },
            enterprise: { name: 'Enterprise Package', price: 20000 }
        };

        const selectedPackage = packages[packageType];
        if (!selectedPackage) {
            return res.status(400).json({ error: 'Invalid package selected' });
        }

        // Generate order ID
        const orderId = 'ORD' + Date.now();
        
        // Simulate payment processing
        let paymentStatus = 'pending';
        let paymentReference = '';

        // Different payment method handling (simulated)
        switch (paymentMethod) {
            case 'paypal':
                paymentStatus = 'completed';
                paymentReference = 'PAYPAL-' + Date.now();
                break;
            case 'gcash':
                paymentStatus = 'completed';
                paymentReference = 'GCASH-' + Date.now();
                break;
            case 'bank':
                paymentStatus = 'pending';
                paymentReference = 'BANK-' + Date.now();
                break;
            default:
                paymentStatus = 'failed';
        }

        // Create order record
        const order = {
            orderId,
            quoteId,
            packageType,
            packageName: selectedPackage.name,
            price: selectedPackage.price,
            paymentMethod,
            paymentStatus,
            paymentReference,
            customerInfo,
            status: paymentStatus === 'completed' ? 'processing' : 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(order);

        if (paymentStatus === 'completed') {
            // Generate and send the system file
            const systemFile = await generateSystemFile(orderId, customerInfo);
            
            // Send confirmation email with download link
            await sendPaymentConfirmationEmail(
                customerInfo.email,
                customerInfo.name,
                orderId,
                selectedPackage.name,
                selectedPackage.price,
                systemFile
            );

            res.status(200).json({
                success: true,
                message: 'Payment processed successfully',
                orderId,
                paymentStatus,
                downloadLink: `/api/download-system/${orderId}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Payment initiated. Please complete the payment.',
                orderId,
                paymentStatus,
                instructions: getPaymentInstructions(paymentMethod, orderId)
            });
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
    }
});

// 3. Download system file
app.get('/api/download-system/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;
        const order = orders.find(o => o.orderId === orderId);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.paymentStatus !== 'completed') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        // For demo, we'll create a sample Excel file
        // In production, this would be your actual Inventory Management System file
        const workbook = XLSX.utils.book_new();
        const worksheetData = [
            ['Inventory Management System', '', '', ''],
            ['Order ID:', orderId, '', ''],
            ['Package:', order.packageName, '', ''],
            ['Customer:', order.customerInfo.name, '', ''],
            ['Email:', order.customerInfo.email, '', ''],
            ['', '', '', ''],
            ['Instructions:', '', '', ''],
            ['1. Open the attached Excel file', '', '', ''],
            ['2. Enable macros if prompted', '', '', ''],
            ['3. Follow the setup wizard', '', '', ''],
            ['4. Import your data using the Data Import tab', '', '', ''],
            ['5. Contact support if you need assistance', '', '', ''],
            ['', '', '', ''],
            ['Support:', 'madronerokurt04@gmail.com', '', ''],
            ['Phone:', '0953-544-2371', '', '']
        ];
        
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Instructions');

        // Generate file
        const fileName = `IMS_System_${orderId}.xlsx`;
        const filePath = path.join(__dirname, 'generated', fileName);
        
        // Create generated directory if it doesn't exist
        const generatedDir = path.join(__dirname, 'generated');
        if (!fs.existsSync(generatedDir)) {
            fs.mkdirSync(generatedDir, { recursive: true });
        }
        
        XLSX.writeFile(workbook, filePath);

        // Send file
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
            }
            // Optional: Clean up file after download
            // setTimeout(() => fs.unlinkSync(filePath), 5000);
        });

    } catch (error) {
        console.error('Error generating system file:', error);
        res.status(500).json({ error: 'Error generating system file' });
    }
});

// 4. Get quote status
app.get('/api/quote/:quoteId', (req, res) => {
    const { quoteId } = req.params;
    const quote = quotes.find(q => q.id === quoteId);
    
    if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.status(200).json(quote);
});

// 5. Get order status
app.get('/api/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(order);
});

// Helper Functions

async function sendQuoteEmail(to, name, quoteId, amount) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Your Inventory Management System Quote',
        html: `
            <h2>Hello ${name},</h2>
            <p>Thank you for requesting a quote for our Inventory Management System.</p>
            <p><strong>Quote ID:</strong> ${quoteId}</p>
            <p><strong>Estimated Cost:</strong> ₱${amount.toLocaleString()}</p>
            <p>To proceed with your order, please visit our website and complete the purchase.</p>
            <p>If you have any questions, feel free to contact us.</p>
            <br>
            <p>Best regards,<br>IMS Services Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Quote email sent to:', to);
    } catch (error) {
        console.error('Error sending quote email:', error);
    }
}

async function sendPaymentConfirmationEmail(to, name, orderId, packageName, amount, systemFile) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Payment Confirmed - Inventory Management System',
        html: `
            <h2>Thank you for your purchase, ${name}!</h2>
            <p>Your payment has been confirmed and your order is being processed.</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Package:</strong> ${packageName}</p>
            <p><strong>Amount Paid:</strong> ₱${amount.toLocaleString()}</p>
            <p>You can download your Inventory Management System file from:</p>
            <p><a href="http://localhost:5000/api/download-system/${orderId}">Download System File</a></p>
            <br>
            <p><strong>Installation Instructions:</strong></p>
            <ol>
                <li>Download the Excel file from the link above</li>
                <li>Open the file and enable macros if prompted</li>
                <li>Follow the setup wizard in the file</li>
                <li>Import your data using the Data Import tab</li>
                <li>Contact support if you encounter any issues</li>
            </ol>
            <br>
            <p><strong>Support Information:</strong></p>
            <p>Email: madronerokurt04@gmail.com</p>
            <p>Phone: 0953-544-2371</p>
            <br>
            <p>Best regards,<br>IMS Services Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Payment confirmation email sent to:', to);
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
    }
}

function generateSystemFile(orderId, customerInfo) {
    // This function would generate your actual Inventory Management System Excel file
    // For now, return a placeholder
    return {
        fileName: `IMS_System_${orderId}.xlsx`,
        filePath: `/api/download-system/${orderId}`
    };
}

function getPaymentInstructions(paymentMethod, orderId) {
    const instructions = {
        paypal: 'Payment completed via PayPal.',
        gcash: `Please send ₱${amount} to GCash number 0953-544-2371. Use Order ID ${orderId} as reference.`,
        bank: `Please deposit to: BPI Account #1234-5678-90. Use Order ID ${orderId} as reference.`
    };
    return instructions[paymentMethod] || 'Payment instructions not available.';
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});