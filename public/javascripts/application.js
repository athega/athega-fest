(function() {
  var _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.tick = function() {
    return new Date().getTime();
  };

  window.PrettyDate = (function() {
    function PrettyDate() {
      this.parse = __bind(this.parse, this);
    }

    PrettyDate.prototype.parse = function(date) {
      var f, format, seconds, _i, _len, _ref;
      date = date.split('-').join('/');
      seconds = parseInt((new Date - new Date(date)) / 1000);
      if (seconds < 0) {
        seconds = 0;
      }
      _ref = this.formats;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        if (seconds < f[0]) {
          format = f;
          break;
        }
      }
      if (format[2]) {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' sedan';
      } else {
        return format[1];
      }
    };

    PrettyDate.prototype.formats = [[60, 'sekunder', 1], [120, '1 minut sedan'], [3600, 'minuter', 60], [7200, '1 timme sedan'], [86400, 'timmar', 3600], [172800, 'Igår'], [604800, 'dagar', 86400], [1209600, '1 vecka sedan'], [2419200, 'weeks', 604800], [4838400, 'förra månaden'], [29030400, 'månader', 2419200], [58060800, 'förra året'], [2903040000, 'år', 29030400]];

    return PrettyDate;

  })();

  window.ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      _ref = ListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListView.prototype.el = '#app';

    ListView.prototype.initialize = function() {
      _.bindAll(this, 'render');
      return this.collection.bind('reset', this.render);
    };

    ListView.prototype.render = function() {
      var pd,
        _this = this;
      $(this.el).html(this.template()(this.data()));
      pd = new PrettyDate();
      $(this.el).find('.timestamp').each(function(index, element) {
        var e;
        e = $(element);
        return e.html(pd.parse(e.attr('data-timestamp')));
      });
      return this;
    };

    ListView.prototype.data = function() {
      return {
        'items': this.collection.map(function(m) {
          return m.toJSON();
        })
      };
    };

    return ListView;

  })(Backbone.View);

  window.AdsView = (function(_super) {
    __extends(AdsView, _super);

    function AdsView() {
      _ref1 = AdsView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    AdsView.prototype.class_name = 'ads';

    AdsView.prototype.template = function() {
      return ich.ads_tpl;
    };

    AdsView.prototype.data = function() {
      return {
        'random_url': _.shuffle(this.collection.models)[1].get('url')
      };
    };

    return AdsView;

  })(ListView);

  window.CheckInsView = (function(_super) {
    __extends(CheckInsView, _super);

    function CheckInsView() {
      _ref2 = CheckInsView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    CheckInsView.prototype.class_name = 'check_ins';

    CheckInsView.prototype.template = function() {
      return ich.check_ins_tpl;
    };

    return CheckInsView;

  })(ListView);

  window.ImagesView = (function(_super) {
    __extends(ImagesView, _super);

    function ImagesView() {
      _ref3 = ImagesView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    ImagesView.prototype.class_name = 'images';

    ImagesView.prototype.template = function() {
      return ich.images_tpl;
    };

    ImagesView.prototype.data = function() {
      return {
        'items': (this.collection.map(function(m) {
          return m.toJSON();
        })).slice(0, 12)
      };
    };

    return ImagesView;

  })(ListView);

  window.TweetsView = (function(_super) {
    __extends(TweetsView, _super);

    function TweetsView() {
      _ref4 = TweetsView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    TweetsView.prototype.class_name = 'tweets';

    TweetsView.prototype.template = function() {
      return ich.tweets_tpl;
    };

    return TweetsView;

  })(ListView);

  window.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref5 = Router.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    Router.prototype.routes = {
      '': 'loop',
      'ads': 'ads',
      'check-ins': 'check_ins',
      'images': 'images',
      'tweets': 'tweets',
      'loop': 'loop'
    };

    Router.prototype.ads = function() {
      return ads.fetch();
    };

    Router.prototype.check_ins = function() {
      return check_ins.fetch();
    };

    Router.prototype.images = function() {
      return images.fetch();
    };

    Router.prototype.tweets = function() {
      return tweets.fetch();
    };

    Router.prototype.loop = function() {
      return new PresentationLoop(11000);
    };

    return Router;

  })(Backbone.Router);

  window.Ad = (function(_super) {
    __extends(Ad, _super);

    function Ad() {
      _ref6 = Ad.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    return Ad;

  })(Backbone.Model);

  window.CheckIn = (function(_super) {
    __extends(CheckIn, _super);

    function CheckIn() {
      _ref7 = CheckIn.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    return CheckIn;

  })(Backbone.Model);

  window.Image = (function(_super) {
    __extends(Image, _super);

    function Image() {
      _ref8 = Image.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    return Image;

  })(Backbone.Model);

  window.Tweet = (function(_super) {
    __extends(Tweet, _super);

    function Tweet() {
      _ref9 = Tweet.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    Tweet.prototype.initialize = function(attrs) {
      if (attrs.text) {
        return this.set({
          html: this.htmlDecode(attrs.text)
        }, {
          silent: true
        });
      }
    };

    Tweet.prototype.htmlDecode = function(value) {
      return $('<div/>').html(value).text();
    };

    return Tweet;

  })(Backbone.Model);

  window.Ads = (function(_super) {
    __extends(Ads, _super);

    function Ads() {
      _ref10 = Ads.__super__.constructor.apply(this, arguments);
      return _ref10;
    }

    Ads.prototype.model = Ad;

    Ads.prototype.url = 'http://assets.athega.se/jullunch/ads.json';

    return Ads;

  })(Backbone.Collection);

  window.CheckIns = (function(_super) {
    __extends(CheckIns, _super);

    function CheckIns() {
      _ref11 = CheckIns.__super__.constructor.apply(this, arguments);
      return _ref11;
    }

    CheckIns.prototype.model = CheckIn;

    CheckIns.prototype.url = '/data/latest_check_ins.json';

    return CheckIns;

  })(Backbone.Collection);

  window.Images = (function(_super) {
    __extends(Images, _super);

    function Images() {
      _ref12 = Images.__super__.constructor.apply(this, arguments);
      return _ref12;
    }

    Images.prototype.model = Image;

    Images.prototype.url = 'http://assets.athega.se/jullunch/latest_images.json?' + tick();

    return Images;

  })(Backbone.Collection);

  window.Tweets = (function(_super) {
    __extends(Tweets, _super);

    function Tweets() {
      _ref13 = Tweets.__super__.constructor.apply(this, arguments);
      return _ref13;
    }

    Tweets.prototype.model = Tweet;

    Tweets.prototype.url = 'http://assets.athega.se/jullunch/tweets.json';

    return Tweets;

  })(Backbone.Collection);

  window.PresentationLoop = (function() {
    function PresentationLoop(ms) {
      this.delay = ms;
      this.iteration = 0;
      window.loop = this;
      window.loop.run();
    }

    PresentationLoop.prototype.tweets = function() {
      tweets.fetch();
      setTimeout('tweets.fetch()', this.delay / 2);
      return setTimeout('window.loop.check_ins()', this.delay);
    };

    PresentationLoop.prototype.check_ins = function() {
      check_ins.fetch();
      return setTimeout('window.loop.images()', this.delay);
    };

    PresentationLoop.prototype.images = function() {
      images.fetch();
      setTimeout('images.fetch()', this.delay / 2);
      return setTimeout('window.loop.ads()', this.delay);
    };

    PresentationLoop.prototype.ads = function() {
      ads.fetch();
      return setTimeout('window.loop.iterate()', this.delay * 2);
    };

    PresentationLoop.prototype.iterate = function() {
      this.iteration += 1;
      console.log('iteration: ' + this.iteration);
      return setTimeout('window.loop.tweets()', 0);
    };

    PresentationLoop.prototype.run = function() {
      var _this = this;
      return setTimeout((function() {
        return _this.tweets();
      }), 0);
    };

    return PresentationLoop;

  })();

  window.app = {};

  app.views = {};

  $(function() {
    if (navigator.platform.indexOf("iPad") !== -1) {
      $(document).bind('touchmove', function(e) {
        return e.preventDefault();
      });
    }
    window.ads = new Ads();
    window.check_ins = new CheckIns();
    window.images = new Images();
    window.tweets = new Tweets();
    app.router = new Router();
    app.views.ads = new AdsView({
      collection: ads
    });
    app.views.check_ins = new CheckInsView({
      collection: check_ins
    });
    app.views.images = new ImagesView({
      collection: images
    });
    app.views.tweets = new TweetsView({
      collection: tweets
    });
    return Backbone.history.start({
      pushState: true
    });
  });

}).call(this);
