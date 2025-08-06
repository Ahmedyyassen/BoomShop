const base64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
      reject(null);
    };
    
  });
};

export default base64;
