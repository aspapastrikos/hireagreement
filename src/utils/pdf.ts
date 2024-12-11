import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { downloadFile } from './fileUtils';
import { openEmailClient } from './emailUtils';

export async function generateAgreementPDF(agreementElement: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(agreementElement, {
    scale: 2,
    useCORS: true,
    logging: false
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  return pdf.output('blob');
}

export async function emailAgreement(email: string, pdfBlob: Blob): Promise<void> {
  try {
    await downloadFile(pdfBlob, 'hire-agreement.pdf');
    openEmailClient(email);
  } catch (error) {
    console.error('Error handling email:', error);
    throw new Error('Failed to process agreement for email');
  }
}