export const configuration = {
  production: false,
  contextSource : {
    type: 'elastic',
    uri: 'localhost:9200',
    bucket: 'context'
  }
};
