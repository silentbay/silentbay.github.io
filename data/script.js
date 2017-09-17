function YFLInstance(e, t) {
 return this.defaults = {},
 this.el              = e,
 this.YFUrl           = "",
 this.uid             = this
  .el
  .getAttribute("yfl-uid"),
 this.s               = Object.assign({}, this.defaults, t),
 this.items           = [],
 this.init(),
 this
}
function YFLOptions(e) {
 var t = function (e) {
   return e = e.trim(),
   e
    ? (
     option_ar = e.split(":"),
     2 == option_ar.length
      ? (
       name  = option_ar[0].trim(),
       value = option_ar[1].trim(),
       -1 !== ["yfl_album", "yfl_time"].indexOf(name) && (value = parseInt(value)),
       [name, value]
      )
      : (l("YFL option : ", e, " is not allowable"), "")
    )
    : (l("YFL option is empty"), "")
  },
  n    = function (e, t) {
   return e[t[0]] = t[1].toLowerCase(),
   e
  };
 return e
  .split(";")
  .map(t)
  .filter(Boolean)
  .reduce(n, {})
}
var J50Npi = {
 currentScript: null,
 getJSON      : function (e, t, n, i) {
  var s = e + (
    e.indexOf("?") + 1
     ? "&"
     : "?"
   ),
   l    = document.getElementsByTagName("head")[0],
   o    = document.createElement("script"),
   a    = [],
   r    = "";
  this["success_" + i] = n,
  t.callback           = "J50Npi.success_" + i;
  for (r in t) 
   a.push(r + "=" + encodeURIComponent(t[r]));
  s      += a.join("&"),
  o.type = "text/javascript",
  o.src  = s,
  this.currentScript && l.removeChild(this.currentScript),
  l.appendChild(o)
 },
 success      : null
};
e                                              = console.error,
window.yflData                                 = {
 uid: 0
},
YFLInstance.prototype.loguid                   = function (e) {
 console.log("THIS " + e + " >>>", this.uid)
},
YFLInstance.prototype.init                     = function () {
 function e(e) {
  t.jsonfill(e)
 }
 var t = this;
 this.YFUrl        = "https://api-fotki.yandex.ru/api/users/" + this.s.username + "/alb" +
   "um/" + this.s.album + "/photos/?format=json&callback=J50Npi.success",
 this.el.className += " yfl_slideshow-size_" + this.s.size,
 t.structureConstructor(),
 J50Npi.getJSON(this.YFUrl, {}, e, t.uid)
},
YFLInstance.prototype.structureConstructor     = function () {
 var e = document.createElement("a");
 e.className = "prev",
 e.innerText = "‹";
 var t = document.createElement("a");
 t.className = "next",
 t.innerText = "›";
 var n = document.createElement("div");
 n.className = "slides";
 var i = document.createElement("div");
 i.className = "blueimp-carousel blueimp-gallery blueimp-gallery-carousel blueimp-gallery-cont" +
   "rols";
 var s = document.createElement("div");
 s.className = "yfl_slideshow-images";
 var l = document.createElement("div");
 l.className = "yfl_slideshow-meta";
 var o = document.createElement("div");
 o.className = "yfl_slideshow-caption";
 var a = document.createElement("div");
 a.className = "yfl_slideshow-num",
 l.appendChild(o),
 l.appendChild(a),
 i.appendChild(n),
 i.appendChild(e),
 i.appendChild(t),
 i.appendChild(l),
 self
  .el
  .appendChild(i),
 self
  .el
  .appendChild(s)
},
YFLInstance.prototype.imageElementsConstructor = function () {
 var e = this;
 if (
  DOMimages = e.el.getElementsByClassName("yfl_slideshow-images"),
  !DOMimages.length
 ) 
  return void console.error(".yfl_slideshow-images container not found");
 var t;
 e
  .items
  .forEach(function (e) {
   t       = document.createElement("A"),
   t.href  = e.href,
   t.title = e.title,
   DOMimages[0].appendChild(t)
  })
},
YFLInstance.prototype.setNumAll                = function (e) {
 var t = this;
 if (DOM = t.el.getElementsByClassName("yfl_slideshow-num"), !DOM.length) 
  return void console.error(".yfl_slideshow-num container not found");
 DOM[0].innerText = "1/" + e
},
YFLInstance.prototype.setAlbum                 = function (e) {
 var t = this;
 if (DOM = t.el.getElementsByClassName("yfl_slideshow-caption"), !DOM.length) 
  return void console.error(".yfl_slideshow-caption container not found");
 DOM[0].innerText = e
},
YFLInstance.prototype.jsonfill                 = function (e) {
 for (
  var t = this,
  n     = t.s.size.toUpperCase(),
  i     = 0;
  i < e.entries.length;
  i++
 ) {
  var s = e
   .entries[i]
   .img[n];
  if (s == undefined) 
   var s = e
    .entries[i]
    .img
    .orig;
  s.title = e
   .entries[i]
   .title,
  t
   .items
   .push(s)
 }
 t.setAlbum(e.title),
 t.setNumAll(e.entries.length),
 t.imageElementsConstructor(),
 t.PluginBlueimpInit()
},
YFLInstance.prototype.ajaxload                 = function () {
 function e() {
  4 == this.readyState && 200 == this.status
   ? n.jsonfill(t.responseText)
   : (
    console.error("YFL request failed : ", this.responseURL),
    console.error("return: ", this.status + ":" + this.statusText)
   )
 }
 var t,
  n = this;
 t = new XMLHttpRequest,
 t.open("GET", this.YFUrl, !1),
 t.onreadystatechange = e,
 t.send(null)
},
YFLInstance.prototype.PluginBlueimpInit        = function () {
 function e() {
  var e = this
   .container[0]
   .getElementsByClassName(this.options.counterElementClass);
  e.length && (e[0].innerText = this.index + 1 + "/" + this.num)
 }
 var t = this.el,
  n    = t.getElementsByClassName("yfl_slideshow-images"),
  i    = t.getElementsByClassName("blueimp-carousel");
 if (!n.length) 
  return void console.error(
   "Element not found: .yfl_slideshow > .yfl_slideshow-images"
  );
 if (!i.length) 
  return void console.error(
   "Element not found: .yfl_slideshow > .blueimp-carousel"
  );
 n = n[0],
 i = i[0];
 var s = {
  carousel                  : !0,
  container                 : i,
  counterElementClass       : "yfl_slideshow-num",
  onslide                   : e,
  thumbnailIndicators       : !1,
  titleElement              : ".yfl_slideshow-caption",
  toggleControlsOnSlideClick: !1
 };
 blueimp.Gallery(n.getElementsByTagName("a"), s)
},
window.YandexFotkiLoader                       = function (t) {
 for (var n = 0; n < t.length; n++) 
  if (el = t[n], index = "el" + n, el) 
   try {
    if (el.hasAttribute("yfl-options")) 
     try {
      window.yflData.uid++,
      options = new YFLOptions(el.getAttribute("yfl-options")),
      el.setAttribute("yfl-uid", index),
      window.yflData[index] = new YFLInstance(el, options)
     } catch (t) {
      e("yafotkiloader could not initiate instance")
     }
    else 
     l("init with default options")
   } catch (t) {
    e("yafotkiloader has not initiated properly")
   }
  };

(function(window, document, undefined) {
  var majusculeFirst = function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };
  var getParam = function(param) {
    var queryString = window.location.search.substring(1),
        queries = queryString.split('&');
    for (var i in queries) {
      var pair = queries[i].split('=');
      if (pair[0] === param) {
        return decodeURI(pair[1]);
      }
    }
    return null;
  };
  var filterPostsByPropertyValue = function(posts, property, value) {
    var filteredPosts = [];
    posts.pop();
    for (var i in posts) {
      var post = posts[i],
          prop = post[property];
      post.tags.pop();
      if (prop.constructor === String) {
        if (prop.toLowerCase() === value.toLowerCase()) {
          filteredPosts.push(post);
        }
      } else if (prop.constructor === Array) {
        for (var j in prop) {
          if (prop[j].toLowerCase() === value.toLowerCase()) {
            filteredPosts.push(post);
          }
        }
      }
    }
    return filteredPosts;
  };
  var layoutResultsPage = function(property, value, posts) {
    var $container = $('main');
    if ($container.length === 0) return;
    $container.find('h1').text('Записи с меткой "'
      + value
      + '"'
    );
    $results = $container.find('div.list-group');
    for (var i in posts) {
      var tagsList = ' ',
          post     = posts[i];
      $results.append(
        '<a href="' + post.href + '" class="list-group-item">' + post.title + '<span class="label label-default pull-right">' + post.date.formatted + '</span>'
      );
    }
  };
  var noResultsPage = function(property, value) {
     $('main').find('h1').text('Ничего не найдено').after(
      '<p>Статей с меткой  "' + value + '" не нашлось.</p>'
    );
  };
  var replaceERBTags = function(elements) {
    elements.each(function() {
      var $this = $(this),
          txt   = $this.html();
      txt = txt.replace(new RegExp('&lt;%=(.+?)%&gt;', 'g'), '{{$1}}');
      txt = txt.replace(new RegExp('&lt;%(.+?)%&gt;', 'g'), '{%$1%}');
      $this.html(txt);
    });
  };
  window.alxPrc = {
    getParam: getParam,
    filterPostsByPropertyValue: filterPostsByPropertyValue,
    noResultsPage: noResultsPage,
    layoutResultsPage: layoutResultsPage,
    replaceERBTags: replaceERBTags
  };
})(window, window.document);

/* search tags */
$(function() {
  var parameters = ['category', 'tags'];
  var map = {}
  for (var idx in parameters) {
    map[parameters[idx]] = alxPrc.getParam(parameters[idx]);
  }
  $.each(map, function(type, value) {
    if (value !== null) {
      $.getJSON('/search.json', function(data) {
        posts = alxPrc.filterPostsByPropertyValue(data, type, value);
        if (posts.length === 0) {
          alxPrc.noResultsPage(type, value);
        } else {
          alxPrc.layoutResultsPage(type, value, posts);
        }
      });
    }
  });
  alxPrc.replaceERBTags($('div.highlight').find('code.text'));
  alxPrc.replaceERBTags($('p code'));
});

/* fansybox */
$(document).ready(function() {
	$(".img-thumbnail").fancybox({
		padding: 5,
		openEffect  : 'none',
		closeEffect: 'none',
    afterLoad: function() {
        this.title = '<a class="btn btn-default btn-xs" href="' + this.href + '">Download</a> ' + this.title;
    },
    helpers : {
        title: {
            type: 'inside'
        }
    }
});
});

/* share42.com | 28.05.2014 | (c) Dimox */
(function ($) {
	$(function () {
		$('div.share42init').each(function (idx) {
			var el = $(this),
				u  = el.attr('data-url'),
				t  = el.attr('data-title'),
				i  = el.attr('data-image'),
				d  = el.attr('data-description'),
				f  = el.attr('data-path'),
				fn = el.attr('data-icons-file'),
				z  = el.attr("data-zero-counter"),
				m1 = el.attr('data-top1'),
				m2 = el.attr('data-top2') * 1,
				m3 = el.attr('data-margin');
			if (!u) 
				u = location.href;
			if (!fn) 
				fn = 'icons.png';
			if (!z) 
				z = 0;
			if (!f) {
				function path(name) {
					var sc = document.getElementsByTagName('script'),
						sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
					for (var p = 0, scL = sc.length; p < scL; p++) {
						var m = String(sc[p].src).match(sr);
						if (m) {
							if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/)) 
								return m[1];
							if (m[1].indexOf("/") == 0) 
								return m[1];
							b = document.getElementsByTagName('base');
							if (b[0] && b[0].href) 
								return b[0].href + m[1];
							else 
								return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
						}
					}
					return null;
				}
				f = path('share42.js');
			}
			if (!t) 
				t = document.title;
			if (!d) {
				var meta = $('meta[name="description"]').attr('content');
				if (meta !== undefined) 
					d = meta;
				else 
					d = '';
			}
			if (!m1) 
				m1 = 150;
			if (!m2) 
				m2 = 20;
			if (!m3) 
				m3 = 0;
			u = encodeURIComponent(u);
			t = encodeURIComponent(t);
			t = t.replace(/\'/g, '%27');
			i = encodeURIComponent(i);
			d = encodeURIComponent(d);
			d = d.replace(/\'/g, '%27');
			var fbQuery = 'u=' + u;
			if (i != 'null' && i != '') 
				fbQuery = 's=100&p[url]=' + u + '&p[title]=' + t + '&p[summary]=' + d + '&p[images][0]=' + i;
			var vkImage = '';
			if (i != 'null' && i != '') 
				vkImage = '&image=' + i;
			var s = new Array('"#" data-count="vk" onclick="window.open(\'http://vk.com/share.php?url=' + u + '&title=' + t + vkImage + '&description=' + d + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться В Контакте"', '"#" data-count="fb" onclick="window.open(\'http://www.facebook.com/sharer.php?m2' + 'w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"', '"#" data-count="gplus" onclick="window.open(\'https://plus.google.com/share?url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Google+"', '"#" data-count="odkl" onclick="window.open(\'http://www.odnoklassniki.ru/dk?st.c' + 'md=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Одноклассники"', '"#" data-count="twi" onclick="window.open(\'https://twitter.com/intent/tweet?tex' + 't=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Twitter"', '"#" data-count="mail" onclick="window.open(\'http://connect.mail.ru/share?url=' + u + '&title=' + t + '&description=' + d + '&imageurl=' + i + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Моем Мире@Mail.Ru"');
			var l = '';
			for (j = 0; j < s.length; j++) {
				var s42s = '';
				l += '<span class="share42-item" style="display:block;white-space:no-wrap;margin:0 0 6px;height:16px;"><a rel="nofollow" style="display:inline-block;vertical-align:top;width:16px;height:16px;margin:0;padding:0;outline:none;background:url(/data/icons.png) -' + 16 * j + 'px 0 no-repeat" href=' + s[j] + ' target="_blank"></a></span>' + s42s;
			};
			el.html('<span id="share42" style="position:relative;z-index:9999;left:-10px">' + l + '</span>' + '');
		});
	})
})(jQuery);
