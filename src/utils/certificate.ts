export function isCertificate(str: string): boolean {
  // eslint-disable-next-line max-len
  const RGX = /^(?:(?!-{3,}(?:BEGIN|END) CERTIFICATE)[\s\S])*(-{3,}BEGIN CERTIFICATE(?:(?!-{3,}END CERTIFICATE)[\s\S])*?-{3,}END CERTIFICATE-{3,})(?![\s\S]*?-{3,}BEGIN CERTIFICATE[\s\S]+?-{3,}END CERTIFICATE[\s\S]*?$)/;
  return RGX.test(str);
}

export function isCSR(str: string): boolean {
  // eslint-disable-next-line max-len
  const RGX = /^(?:(?!-{3,}(?:BEGIN|END) (?:NEW )CERTIFICATE REQUEST)[\s\S])*(-{3,}BEGIN NEW CERTIFICATE REQUEST(?:(?!-{3,}BEGIN NEW CERTIFICATE REQUEST)[\s\S])*?-{3,}END NEW CERTIFICATE REQUEST-{3,})\s*$/;
  return RGX.test(str);
}
