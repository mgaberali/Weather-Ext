describe('weatherToClass filter', function() {

  var $filter;

  beforeEach(function () {
    beforeEach(module('weatherExtApp'));

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('returns "wi-day-sunny sun" when weather is Clear', function() {
    var weatherToClass = $filter('weatherToClass');
    expect(weatherToClass("Clear")).toEqual("wi-day-sunny sun");
  });

});
