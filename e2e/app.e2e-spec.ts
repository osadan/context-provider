import { ElasticPage } from './app.po';

describe('elastic App', () => {
  let page: ElasticPage;

  beforeEach(() => {
    page = new ElasticPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
