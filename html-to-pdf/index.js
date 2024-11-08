const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHTMLToPDF(htmlFilePath, outputFilePath) {
  try {
    // Leer el contenido del archivo HTML
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    // Iniciar el navegador
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Establecer el contenido HTML en la página
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generar PDF
    await page.pdf({
      path: outputFilePath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    // Cerrar el navegador
    await browser.close();

    console.log(`PDF generado exitosamente: ${outputFilePath}`);
  } catch (error) {
    console.error('Error al convertir HTML a PDF:', error);
  }
}

// Rutas de los archivos

if (!process.argv[2]) {
  console.error('No se ha proporcionado la ruta del archivo HTML');
  process.exit(1);
}

const htmlFilePath = path.join(__dirname, `html/${process.argv[2]}.html`);
const outputFilePath = path.join(__dirname, `pdf/${process.argv[2]}.pdf`);

// Llamar a la función para convertir HTML a PDF
convertHTMLToPDF(htmlFilePath, outputFilePath);
