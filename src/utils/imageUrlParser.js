const imageUrlParser = (id, option) => {
  const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  return `${baseUrl}${option ? option + '/' : ''}${id}`;
};

export default imageUrlParser;
