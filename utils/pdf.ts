import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

export async function readPdf(pathToPdf: string) {
  let pdfText = '';

  try {
    const pdf = await pdfjsLib.getDocument(pathToPdf).promise;
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const pageContent = await page.getTextContent();

      let lastMatrix = '';
      let pageText = '';
      for (const item of pageContent.items) {
        // @ts-ignore
        const str = item.str;
        // @ts-ignore
        const currentMatrix = item.transform[5];
        if (lastMatrix === currentMatrix || !lastMatrix) {
          pageText += str;
        } else {
          pageText += `\n${str}`;
        }
        lastMatrix = currentMatrix;
      }

      pdfText += pageText;
    }

    pdf.destroy();
  } catch (error) {
    console.log(error);
  }

  return pdfText;
}
