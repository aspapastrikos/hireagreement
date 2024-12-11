export async function sendEmail(to: string): Promise<void> {
  const subject = encodeURIComponent('Hire Agreement');
  const body = encodeURIComponent(
    'Please find the attached hire agreement that was just downloaded to your device.\n\n' +
    'Please attach the downloaded PDF file to this email before sending.'
  );
  
  const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
}