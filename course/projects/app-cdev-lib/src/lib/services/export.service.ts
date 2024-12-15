import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';

import { Info } from './info.type';

type SubOptionsToExportPDF = 0 | 1 | 2;

pdfMake.vfs = (pdfFonts as any).pdfMake.vfs;

@Injectable({ providedIn: 'root' })
export class ExportService {
  private fromDataToExport(
    data: any[],
    metadata: { field: string; title: string }[]
  ) {
    return data.map((item) => {
      const row: any = {};
      for (const prop in item) {
        const md = metadata.find((m) => m.field === prop);
        if (md) {
          row[md.title] = item[prop];
        }
      }

      return row;
    });
  }

  private async fromFileToDataUrl(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onloadend = () => resolve(fr.result as string);
      fr.readAsDataURL(blob);
    });
  }

  private generateHeaders(title: string, imageLogo?: string) {
    return {
      margin: [0, 0, 0, 20],
      table: {
        widths: [120, 'auto', 100, 'auto'],
        body: [
          [
            {
              image: imageLogo,
              width: 100,
              border: [false, false, true, false],
              borderColor: ['#000', '#000', '#000', '#000'],
              borderWidth: 1,
            },
            /*             {
              image: image,
              width: 100,
              border: [false, false, true, false],
              borderColor: ['#000', '#000', '#000', '#000'],
              borderWidth: 1,
            }, */
            {
              text: [
                this.generateRow('CursosDev', 'headerLeft'),
                this.generateRow('Av. Paulista, 1000', 'subHeaderLeft'),
                this.generateRow('Las Azucenas, Lima Perú', 'subHeaderLeft'),
                this.generateRow(
                  'Teléfono: (51-1) 997-456-789',
                  'subHeaderLeft'
                ),
                this.generateRow('info@cursos-dev.com', 'subHeaderLeft'),
                this.generateRow('www.cursos-dev.com', 'subHeaderLeft'),
              ],
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: 'Reporte: ' + title,
              border: [false, false, false, false],
              style: 'titleReport',
            },
          ],
        ],
      },
    };
  }

  private generateRow(text: string, style: string) {
    const row: { text: string; style?: string } = { text: `${text}\n` };
    if (style) {
      row.style = style;
    }

    return row;
  }

  private generatePDF(
    infoFormatted: any,
    filename: string,
    subOption: SubOptionsToExportPDF
  ) {
    const documentGenerated = pdfMake.createPdf(infoFormatted);
    switch (subOption) {
      case 0:
        documentGenerated.open();
        break;
      case 1:
        documentGenerated.download(`${filename}.pdf`);
        break;
      case 2:
        documentGenerated.print();
        break;
    }
  }

  private generateStyles() {
    return {
      headerLeft: {
        fontFamily: 'Verdana',
        fontSize: 13,
        height: 16,
        color: '#3c3b40',
      },
      subHeaderLeft: {
        fontFamily: 'Verdana',
        fontSize: 10,
        height: 16,
        color: '#3c3b40',
      },
      titleReport: {
        fontFamily: 'Verdana',
        fontSize: 15,
        height: 16,
        color: '#3c3b40',
      },
      header: {
        fontFamily: 'Verdana',
        fontSize: 13,
        height: 14,
        color: '#3c3b40',
        bold: true,
      },
    };
  }

  exportToExcel(info: Info) {
    const dataToExport = this.fromDataToExport(info.records, info.metadata);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, info.subject);
    XLSX.writeFile(wb, `${info.filename}.xlsx`);
  }

  async exportToPDF(info: Info, subOption: SubOptionsToExportPDF) {
    const dataToExport = this.fromDataToExport(info.records, info.metadata);
    let imageLogo;
    if (info.pathLogo) {
      imageLogo = await this.fromFileToDataUrl(info.pathLogo);
    }

    const infoFormatted = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      content: [this.generateHeaders(info.subject, imageLogo)],
      styles: this.generateStyles(),
    };

    this.generatePDF(infoFormatted, info.filename, subOption);
  }
}
