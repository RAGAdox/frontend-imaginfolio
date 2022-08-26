export const sentenceCase = (text: string) => {
  
  return text.length>1? text[0].toUpperCase() + text.slice(1):text;
}