import Region from '../src/Region.jsx';

describe('Region Module ', function () {

  it('should return the separators in a string based pattern', function() {
    var givenPattern = '@/aux/*/xxx/*';
    var separators = Region.getSeparators(givenPattern);
    expect(separators).toEqual(['aux','xxx']);
  });

  it('should return the separators in a string based pattern', function() {
    var givenPattern = '@/aux/*';
    var separators = Region.getSeparators(givenPattern);
    expect(separators).toEqual(['aux']);
  });

  it('should return the separators in a array based pattern', function() {
    var givenPattern = '@/aux/*'.split('/').filter((frag) => frag !== '');
    var separators = Region.getSeparators(givenPattern);
    expect(separators).toEqual(['aux']);
  });

  it('should return the separators in a array based pattern', function() {
    var givenPattern = '@/aux/*/xxx/*'.split('/').filter((frag) => frag !== '');
    var separators = Region.getSeparators(givenPattern);
    expect(separators).toEqual(['aux','xxx']);
  });

  it('should serialize a given route', function() {
    var givenRoute = '/teste/xxx/aux/teste2/yyy';
    var givenSeparators = ['aux'];
    var serializedRoute = Region.serializeRoute(givenRoute,givenSeparators);
    expect(serializedRoute).toEqual(['/teste/xxx/','aux','/teste2/yyy']);
  });

  describe('Obtaining ', function() {

    it('should return a route fragment based on a pattern ', function() {
      var givenRoute = '/teste/xxx/teste2/';
      var givenPattern = '@/xxx/*';
      var myPortion = Region.getMyPortion(givenRoute,givenPattern);
      expect(myPortion).toEqual('teste/')
    });

    it('should return a route fragment based on a pattern ', function() {
      var givenRoute = '/teste/xxx/teste2/';
      var givenPattern = '*/xxx/@';
      var myPortion = Region.getMyPortion(givenRoute,givenPattern);
      expect(myPortion).toEqual('/teste2')
    });

  });

  describe('Removeing trailing separators from a given URL', function() {

    it('should remove last fragment', function() {
      var givenRoute = ['teste','xxx'];
      var givenSeparators = ['xxx'];
      var cleanUrl = Region.removeTrailingSeparators(givenRoute,givenSeparators);
      expect(cleanUrl).toEqual(['teste']);
    });

    it('should remove first fragment', function() {
      var givenRoute = ['xxx','teste'];
      var givenSeparators = ['xxx'];
      var cleanUrl = Region.removeTrailingSeparators(givenRoute,givenSeparators);
      expect(cleanUrl).toEqual(['teste']);
    });

    it('should remove first and last fragments', function() {
      var givenRoute = ['xxx','teste','abc'];
      var givenSeparators = ['xxx','abc'];
      var cleanUrl = Region.removeTrailingSeparators(givenRoute,givenSeparators);
      expect(cleanUrl).toEqual(['teste']);
    });

  });

  describe('Returning a link to a destiny based on current URL', function() {

    it('given a full URL, it should change the @ portion at the second fragment', function() {
      var givenRoute = '/teste/xxx/teste2/';
      var givenPattern = "*/xxx/@";
      var givenDestiny = 'oh/my/god';
      var resultUrl = Region.getLinkTo(givenRoute,givenPattern,givenDestiny);
      expect(resultUrl).toEqual('teste/xxx/oh/my/god');
    });

    it('given a full URL, it should change the @ portion at the first fragment', function() {
      var givenRoute = '/teste/xxx/teste2/';
      var givenPattern = "@/xxx/*";
      var givenDestiny = 'oh/my/god';
      var resultUrl = Region.getLinkTo(givenRoute,givenPattern,givenDestiny);
      expect(resultUrl).toEqual('oh/my/god/xxx/teste2');
    });

    it('given a partial URL, it should change the entire URL', function() {
      var givenRoute = '/teste/';
      var givenPattern = '@/xxx/*';
      var givenDestiny = 'oh/my/god';
      var resultUrl = Region.getLinkTo(givenRoute,givenPattern,givenDestiny);
      expect(resultUrl).toEqual('oh/my/god');
    });

    it('given a partial URL, it should increment the second fragment after the separator', function() {
      var givenRoute = '/teste/';
      var givenPattern = '*/xxx/@';
      var givenDestiny = 'oh/my/god';
      var resultUrl = Region.getLinkTo(givenRoute,givenPattern,givenDestiny);
      expect(resultUrl).toEqual('teste/xxx/oh/my/god');
    });

  });

});
