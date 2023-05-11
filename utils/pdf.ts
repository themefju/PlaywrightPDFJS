import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

export async function readPdf(pathToPdf: string) {
  let pdfText = '';

  try {
    const pdf = await pdfjsLib.getDocument(pathToPdf).promise;
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const pageContent = await page.getTextContent();

      let text = '';
      for (const item of pageContent.items) {
        // @ts-ignore
        const line = item.str;
        // @ts-ignore
        const isEndOfLine = item.hasEOL;

        isEndOfLine ? (text += `\n${line}`) : (text += line);
      }

      pdfText += text;
    }

    pdf.destroy();
  } catch (error) {
    console.log(error);
  }

  return pdfText;
}
