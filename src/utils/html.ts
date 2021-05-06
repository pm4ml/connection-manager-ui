// eslint-disable-next-line
const isString = (item: any): boolean => typeof item === 'string';

type ClassNameItem = string | boolean | undefined;

const composeClassName = (items: ClassNameItem[] = []) => {
  if (!Array.isArray(items)) {
    throw new Error('Class name should be wrapped into an array');
  }
  return items.filter(isString).join(' ');
};

const composeOption = (label: string, value: string | number | boolean) => ({ label, value });

const composeOptions = (sourceMaps: { [label: string]: string | number | boolean }) => {
  return Object.entries(sourceMaps).map((sourceMap) => {
    const [label, value] = sourceMap;
    return composeOption(label, value);
  });
};

const downloadFile = (content: string, filename: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const readFileAsText = (file: File) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event?.target?.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const loadFile = async (accept = '') => {
  return new Promise((resolve, reject) => {
    const fileSelector = document.createElement('input');
    const handleFileChange = async (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const [file] = Array.from(target.files || []);
      let content = null;
      try {
        content = await readFileAsText(file);
        resolve(content);
      } catch (err) {
        reject(err);
      }
      fileSelector.removeEventListener('change', handleFileChange, false);
      document.body.removeChild(fileSelector);
    };
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', accept);
    document.body.appendChild(fileSelector);
    fileSelector.addEventListener('change', handleFileChange, false);
    fileSelector.click();
  });
};

export { composeClassName, composeOptions, downloadFile, loadFile };
