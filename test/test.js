// checks taken from https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/

const assert = require('assert');
const isMailValid = require('../src/mail');

describe('Check Email', () => {
  it('Valid email', () => assert.equal(isMailValid('email@domain.com'), true));
  it('Email contains dot in the address field', () => assert.equal(isMailValid('firstname.lastname@domain.com'), true));
  it('Email contains dot with subdomain', () => assert.equal(isMailValid('email@subdomain.domain.com'), true));
  it('Plus sign is considered valid character', () => assert.equal(isMailValid('firstname+lastname@domain.com'), true));
  it('Domain is valid IP address', () => assert.equal(isMailValid('email@123.123.123.123'), true));
  it('Square bracket around IP address is considered valid', () => assert.equal(isMailValid('email@[123.123.123.123]'), true));
  it('Digits in address are valid', () => assert.equal(isMailValid('1234567890@domain.com'), true));
  it('Dash in domain name is valid', () => assert.equal(isMailValid('email@domain-one.com'), true));
  it('Underscore in the address field is valid', () => assert.equal(isMailValid('_______@domain.com'), true));
  it('.name is valid Top Level Domain name', () => assert.equal(isMailValid('email@domain.name'), true));
  it('Dot in Top Level Domain name also considered valid (use co.jp as example here)', () => assert.equal(isMailValid('email@domain.co.jp'), true));
  it('Dash in address field is valid', () => assert.equal(isMailValid('firstname-lastname@domain.com'), true));

  it('Missing @ sign and domain', () => assert.equal(isMailValid('plainaddress'), false));
  it('Garbage', () => assert.equal(isMailValid('#@%^%#$@#$@#.com'), false));
  it('Missing username', () => assert.equal(isMailValid('@domain.com'), false));
  it('Encoded html within email is invalid', () => assert.equal(isMailValid('Joe Smith <email@domain.com>'), false));
  it('Missing @', () => assert.equal(isMailValid('email.domain.com'), false));
  it('Two @ sign', () => assert.equal(isMailValid('email@domain@domain.com'), false));
  it('Leading dot in address is not allowed', () => assert.equal(isMailValid('.email@domain.com'), false));
  it('Trailing dot in address is not allowed', () => assert.equal(isMailValid('email.@domain.com'), false));
  it('Multiple dots', () => assert.equal(isMailValid('email..email@domain.com'), false));
  it('Unicode char as address', () => assert.equal(isMailValid('あいうえお@domain.com'), false));
  it('Text followed email is not allowed', () => assert.equal(isMailValid('email@domain.com (Joe Smith)'), false));
  it('Missing top level domain (.com/.net/.org/etc)', () => assert.equal(isMailValid('email@domain'), false));
  it('Leading dash in front of domain is invalid', () => assert.equal(isMailValid('email@-domain.com'), false));
  it('.web is not a valid top level domain', () => assert.equal(isMailValid('email@domain.web'), false));
  it('Invalid IP format', () => assert.equal(isMailValid('email@111.222.333.44444'), false));
  it('Multiple dot in the domain portion is invalid', () => assert.equal(isMailValid('email@domain..com'), false));
});
