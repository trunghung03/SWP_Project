import sys
import json
from weasyprint import HTML

def generate_warranty(data):
    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Warranty Certificate</title>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            .certificate {{ border: 2px solid #000; padding: 20px; width: 600px; margin: auto; }}
            .header {{ text-align: center; }}
            .content {{ margin-top: 20px; }}
            .footer {{ text-align: center; margin-top: 50px; }}
            .footer img {{ width: 100px; }}
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="header">
                <h1>Certificate of Warranty</h1>
            </div>
            <div class="content">
                <p><strong>Customer name:</strong> {data.get('customerName', 'N/A')}</p>
                <p><strong>Date of purchase:</strong> {data.get('dateOfPurchase', 'N/A')}</p>
                <p><strong>Service:</strong> Diamond Insurance</p>
                <p><strong>ID Number:</strong> {data.get('idNumber', 'N/A')}</p>
                <p><strong>Warranty Period:</strong> From {data.get('warrantyPeriodStart', 'N/A')} to {data.get('warrantyPeriodEnd', 'N/A')}</p>
            </div>
            <div class="footer">
                <p>DIAN</p>
                <p>SIGNATURE</p>
                <p>Dlan Diamond Jewelry</p>
                <p>Phone number: +1(555) 586-7594</p>
                <p>The warranty is valid only in the presence of this certificate, as well as: original purchase document (receipt, invoice), correctly and completely filled out warranty card</p>
            </div>
        </div>
    </body>
    </html>
    """
    html = HTML(string=html_template)
    pdf_path = "warranty.pdf"
    html.write_pdf(pdf_path)
    return pdf_path

if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    pdf_path = generate_warranty(data)
    print(pdf_path)
