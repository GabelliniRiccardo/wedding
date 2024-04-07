const fs = require('fs')
const Excel = require('exceljs')
const QRCode = require('qrcode')

async function generateQRCode(text, filename) {
  try {
    const qrCodePath = `./qrcodes/${filename}.png`
    await QRCode.toFile(qrCodePath, text.hyperlink)
    console.log(`QR Code generated for ${filename}`)
  } catch (error) {
    console.error(`Error generating QR Code for ${filename}:`, error)
    console.error('QR Code text:', text.hyperlink)
  }
}

async function generateQRCodeFromExcel(filename) {
  const workbook = new Excel.Workbook()
  try {
    await workbook.xlsx.readFile(filename)
    const worksheet = workbook.getWorksheet(1)

    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber)
      const fileName = row.getCell(1).value
      const qrLink = row.getCell(2).value
      if (fileName && qrLink) {
        await generateQRCode(qrLink, fileName)
      }
    }
  } catch (error) {
    console.error('Error reading Excel file:', error)
  }
}

const excelFilename = 'Qr codes.xlsx'

const qrCodesDir = './qrcodes'
if (fs.existsSync(qrCodesDir)) {
  fs.rmdirSync(qrCodesDir, { recursive: true })
}

fs.mkdirSync(qrCodesDir)

generateQRCodeFromExcel(excelFilename)
