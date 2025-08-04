
const base64 = (file: Express.Multer.File):string => {
  const image64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  return image64;
}

export default base64