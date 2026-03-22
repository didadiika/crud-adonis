import type { HttpContext } from '@adonisjs/core/http'
import escpos from 'escpos'
import Network from 'escpos-network'
import Usb from 'escpos-usb'


export default class PrintsController {

    async index({ response }: HttpContext){
        try{
            //const device = new Network('192.168.5.254')
            const device = new Usb(0x0483, 0x5743) // Sesuaikan dengan vendorId dan productId printer Anda
            const printer = new escpos.Printer(device)

            device.open(() => {
                // HEADER
                printer
                    .align('ct')
                    .style('b')
                    .size(1, 1)
                    .text('CAFE MADAPOS')
                    .size(0, 0)
                    .text('Jl. Contoh No.123')
                    .text('Telp: 08123456789')
                    .text('------------------------------')
                // INFO TRANSAKSI
                printer
                    .align('lt')
                    .text('No   : TRX-001')
                    .text('Kasir: Dika')
                    .text('Tgl  : 21-03-2026 10:00')
                    .text('------------------------------')
                // TABLE HEADER
                printer.tableCustom([
                    { text: 'Item', align: 'LEFT', width: 0.5 },
                    { text: 'Qty', align: 'CENTER', width: 0.2 },
                    { text: 'Total', align: 'RIGHT', width: 0.2 },
                ])

                // TABLE DATA
                const items = [
                    { name: 'Nasi Goreng Spesial', qty: 1, price: 15000 },
                    { name: 'Es Teh Manis', qty: 2, price: 5000 },
                    { name: 'Mie Ayam Bakso', qty: 1, price: 12000 },
                ]

                let total = 0

                items.forEach((item) => {
                    const subtotal = item.qty * item.price
                    total += subtotal

                    printer.tableCustom([
                    { text: item.name, align: 'LEFT', width: 0.5 },
                    { text: item.qty.toString(), align: 'CENTER', width: 0.2 },
                    { text: subtotal.toString(), align: 'RIGHT', width: 0.2 },
                    ])
                })

                printer.text('------------------------------')

                // TOTAL
                printer
                    .align('rt')
                    .text(`Total : ${total}`)
                    .text('Bayar : 50000')
                    .text(`Kembali : ${50000 - total}`)
                    .text('------------------------------')

                    // QR CODE (contoh link invoice)
      printer
        .align('ct')
        .text('Scan QR untuk invoice')
        .qrimage('https://madapos.id/invoice/TRX-001', function () {
          
          // BARCODE (contoh kode transaksi)
          printer
            .barcode('TRX001', 'CODE128')
            .text('TRX001')

            // FOOTER
            .text('------------------------------')
            .text('Terima kasih 🙏')
            .text('Silakan datang kembali')

            // SPASI + CUT
            .feed(1)
            .cut()
            .close()


            })
            })
            return response.json({ message: 'Print berhasil' })
        } catch(error){
            return response.status(500).json({
                    message: 'Print gagal',
                    error: error.message,
                })
        }
    }
}