var expect = require('expect');

var {generateMessage} = require('./message');



describe('generateMessage', () => {
  it('should send a message' , () => {

    var from = 'Mungi';
    var text = 'aaj teri gaand meregi';

    var res = generateMessage(from,text);
    expect(res.createdAt).toBeA('number');
    console.log(res)
    expect(res).toInclude({from:from,text:text});

  });
});
