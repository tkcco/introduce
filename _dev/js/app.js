'use strict';

var App = App || {};

(function(){
    // index.htmlでのjs
    function Leagle(){
        this.$leagleForm = $('.l-form');
        this.$leagleTxt = $('.l-text__area');
        this.init();
    };
    Leagle.prototype.init = function(){
        this.changePage();
    };
    Leagle.prototype.changePage = function(){
        var _this = this;
        _this.$leagleForm.submit(function(){
            _this.val = _this.$leagleTxt.val();
            // alert(_this.val);
            // console.log(_this.val);
            switch(_this.val){
                case 'yoshinari takashi':
                case 'Yoshinari Takashi':
                case 'YOSHINARI TAKASHI':
                case 'yoshinaritakashi':
                case 'YoshinariTakashi':
                case 'YOSHINARITAKASHI':
                case 'takashi yoshinari':
                case 'Takashi Yoshinari':
                case 'TAKASHI YOSHINARI':
                case 'takashiyoshinari':
                case 'TakashiYoshinari':
                case 'TAKASHIYOSHINARI':
                case '吉成敬':
                case 'よしなりたかし':
                case 'ヨシナリタカシ':
                case '吉成 敬':
                case 'よしなり たかし':
                case 'ヨシナリ タカシ':
                case '吉成　敬':
                case 'よしなり　たかし':
                case 'ヨシナリ　タカシ':
                    location.href = '../myprofile/top.html';
                    break;
                case '':
                    break;
                default:
                    window.location.href = 'https://www.google.co.jp/#q=' + _this.val;
                    break;
            }
            return false;
        });
    };

// top.htmlでのjs
    function Top(){
        this.$p1 = $('.p1');
        this.$p2 = $('.p2');
        this.$p3 = $('.p3');
        this.$pro = $('.prologue');
        this.$link = $('.topLink');

        this.init();
    };

    Top.prototype.init = function(){
        var _this = this;
        this.prologue();
    };

    Top.prototype.prologue = function(){
        var _this = this;
        this.$pro.contents().each(function() {
            if (this.nodeType == 3) {
                $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
            }
        });

        setTimeout(function(){
            _this.$p1.css({'opacity':1});
            for (var i = 0; i <= _this.$p1.children().size() - 1; i++) {
                _this.$p1.children('span:eq('+i+')').delay(100*i).fadeIn(300);
            };
        }, 2000);

        setTimeout(function(){
            _this.$p2.css({'opacity':1});
            for (var i = 0; i <= _this.$p2.children().size() - 1; i++) {
                _this.$p2.children('span:eq('+i+')').delay(100*i).fadeIn(300);
            };
        }, 4500);

        var hidePro = function(){
            _this.$pro.fadeOut(1000);
        };

        var showLink = function(fn){
            _this.$p3.css({
                display: 'block'
            }).animate({
                opacity:1
            },1500);
            fn();
        };

        var animeLink = function(){
            setInterval(function(){
                _this.$p3.animate({
                    marginTop: '-3px'
                }, 700, 'swing').animate({
                    marginTop: '3px'
                }, 700, 'swing');
            }, 800);
        };

        setTimeout(function(){
            hidePro();
            showLink(animeLink);
        }, 8000);
    };

// list.htmlでのjs
    function list(){
        this.init();
    };

    list.prototype.init = function(){
        this.$hdrWrapper = $('.hdrWrapper');
        this.$contWrapper = $('.d-cont__innerWrap');
        this.$list = $('.d-cont__list li');
        this.$listImg = $('.d-cont__list li').find('img');
        this.$listHover = $('d-contList__hover');
        this.$width = $(window).width();
        this.$height = $(window).height();
        this.$listHeight = (this.$height / 3);
        this.$listWidth = (this.$width / 3);

        this.setSize();
        this.hoverAction();
    };

    list.prototype.setSize = function(){
        var _this = this;
        this.$hdrWrapper.css('height', _this.$height + 'px');
        this.$list.css('height', _this.$listHeight + 'px');
        $(window).on('resize', function(){
            _this.$height = $(window).height();
            _this.$listHeight = (this.$height / 3);
            _this.$hdrWrapper.css('height', _this.$height + 'px');
            _this.$list.css('height', _this.$listHeight + 'px');
        });
        $(window).on('load', function(){
            _this.$hdrWrapper.fadeIn(700);
            for(var i = 0; i < _this.$list.length; i++){
                _this.$list.delay(100).fadeIn();
                _this.$list.eq(i).animate({
                    'opacity': 1,
                    'top': 0
                },1000);
            }
        });
    };

    list.prototype.hoverAction = function(){
        var _this = this;
        this.$list.on('mouseenter', function(){
            var index = _this.$list.index(this);
            _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(0)");
            if(index == 7){
                _this.$list.eq(7).find('img').attr('src', _this.$list.eq(7).find('img').attr('src').replace('_off', '_on'));
            }
            _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
            _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
        }).on('mouseleave', function(){
            var index = _this.$list.index(this);
            _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(100%)");
            if(index == 7){
                _this.$list.eq(7).find('img').attr('src', _this.$list.eq(7).find('img').attr('src').replace('_on', '_off'));
            }
            _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
            _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
        });
    };

// detail下層ページでのjs
    function Detail(){
        this.init();
    };

    Detail.prototype.init = function(){
        this.$width = $(window).width();
        this.$height = $(window).height();
        this.$ul = $('.d-contMore__slideList');
        this.$list = $('.d-contMore__slideList').find('li');
        this.$listHeight = this.$list.height();
        this.$listlength = this.$list.length;
        this.$listWholeH = (this.$list.length * this.$listHeight);
        this.$slideBtn = $('.d-contMore__slideBtn');
        this.$up = this.$slideBtn.find('.up');
        this.$down = this.$slideBtn.find('.down');
        this.$downHeight = this.$down.height();
        this.$listHover = $('d-contList__hover');

        console.log();
        this.setPos();
        this.hoverSlide();
        this.picSlide();
        this.matchSlide();
        this.ajaxEach();
    };

    Detail.prototype.setPos = function(){
        var _this = this;
        this.$down.css({
            top: (this.$height - this.$downHeight) + 'px'
        });

        $(window).on('resize', function(){
            this.$height = $(window).height();
            this.$listHeight = _this.$list.height();
            this.$slideBtn = $('.d-contMore__slideBtn');
            this.$down = this.$slideBtn.find('.down');
            this.$downHeight = this.$down.height();
            this.$down.css({
                top: (this.$height - this.$downHeight) + 'px'
            });
        });
    };

    Detail.prototype.hoverSlide = function(){
        var _this = this;
        this.$list.on('mouseover', function(){
            var index = _this.$list.index(this);
            _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(0)");
            _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
            _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
        }).on('mouseout', function(){
            var index = _this.$list.index(this);
            _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(100%)");
            _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
            _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
        });
    };

    Detail.prototype.picSlide = function(){
        var _this = this;

        this.$up.on('click', function(){
            var fromTop = _this.$list.offset().top - $(window).scrollTop();
            // console.log(this.$ulTop);
            // console.log(_this.$listHeight);
            // console.log(_this.$listWholeH);
            // console.log(Math.abs(this.$ulTop));
            // console.log(Math.abs(this.$ulTop) > _this.$listHeight);
            if(fromTop < 0){
                if(Math.abs(fromTop) > _this.$listHeight){
                    _this.$ul.stop().animate({
                        top: '+=' + _this.$listHeight + 'px'
                    });
                } else {
                    _this.$ul.stop().animate({
                        top: '+=' + Math.abs(fromTop) + 'px'
                    });
                }
            }
        });

        this.$down.on('click', function(){
            var fromTop = _this.$ul.offset().top - $(window).scrollTop();
            var withoutUnder = (Math.abs(fromTop)) + _this.$height;
            var leftList = _this.$listWholeH - withoutUnder;
            // console.log(fromTop);
            // console.log($(window).scrollTop());
            // console.log(_this.$height);
            // console.log(_this.$listWholeH);
            // console.log(Math.abs(this.$ulTop));
            // console.log((Math.abs(this.$ulTop)) + _this.$height);
            if(withoutUnder < _this.$listWholeH ){
                if(leftList > _this.$listHeight){
                    _this.$ul.stop().animate({
                        top: '-=' + _this.$listHeight + 'px'
                    });
                } else {
                    _this.$ul.stop().animate({
                        top: '-=' + leftList + 'px'
                    });
                }
            }
        });
    };

    Detail.prototype.matchSlide = function(){
        var _this = this;
        var url = window.location.href;
        var focus;
        for(var i = 0; i < _this.$listlength; i++){
            var link = this.$list.eq(i).find('a').attr('href');
            // console.log(url);
            // console.log(link);
            // console.log(url.match(link));
            if(url.match(link)){
                focus = i;
                this.$list.eq(i).find('img').css({
                    'cssText': '-webkit-filter: grayscale(0);'
                });
            }
        }
        this.$list.eq(focus).on('mouseout', function(){
            _this.$list.eq(focus).find('img').css("-webkit-filter", "grayscale(0)");
        });
    };

    Detail.prototype.ajaxEach = function(){
        var _this = this;
        var hash = window.location.hash;
        var hashArrey = ["#background", "#oversea", "#skill", "#sports", "#game", "#tv-movie", "#book" ,"#mygirl", "#future"];
        var url = window.location.href.split("/");
        var crntFile = url[url.length - 1];
        this.$moreList = $('.d-contMore__list');
        for(var i = 0; i < hashArrey.length; i++){
            if(hash == hashArrey[i]){
                var nowHash = i;
                $.ajax({
                    url: '../json/data.json',
                    dataType: 'json',
                    data: {name: 'contents'},
                }).done(function(data){
                    // console.log(nowHash);
                    var dataArray = data.contents;
                    $('title').text(dataArray[nowHash].title);
                    _this.$moreList.prepend(dataArray[nowHash].body);
                }).fail(function(data){
                    console.log(nowHash);
                });
            }
        }

        window.onhashchange = function(){
            var hash = window.location.hash;
            var nowHash;
            for(var i = 0; i < hashArrey.length; i++){
                if(hash == hashArrey[i]){
                    nowHash = i;
                    $.ajax({
                        url: '../json/data.json',
                        dataType: 'json',
                        data: {name: 'contents'},
                    }).done(function(data){
                        var dataArray = data.contents;
                        $("title").text(dataArray[nowHash].title);
                        _this.$moreList.empty().animate({ scrollTop: 0 }).prepend(dataArray[nowHash].body);
                        _this.$list.find('img').css({
                            'cssText': '-webkit-filter: grayscale(100%);'
                        });
                        _this.$list.eq(nowHash).find('img').css({
                            'cssText': '-webkit-filter: grayscale(0);'
                        });
                        // console.log(nowHash);
                    }).fail(function(data){
                        console.log(nowHash);
                    });
                }
            }
            _this.$list.on('mouseout', function(){
                _this.$list.find('img').css("-webkit-filter", "grayscale(100%)");
                _this.$list.eq(nowHash).find('img').css("-webkit-filter", "grayscale(0)");
            });
            _this.$list.eq(nowHash).on('mouseout', function(){
                _this.$list.eq(nowHash).find('img').css("-webkit-filter", "grayscale(0)");
            });
        }
    };

    function Gallery(){
        this.init();
    };

    Gallery.prototype.init = function(){
        // console.log('hoge');
        this.$width = $(window).width();
        this.$height = $(window).height();
        this.$gWrap = $('.g-cont__wrapper');
        this.$gImgs = this.$gWrap.find('img');
        this.$gOverLay = $('.g-overlay');
        this.$gLayImg = $('.g-overlay__img');
        this.$modalBtn = $('.g-overlay__btn');
        this.$modalClose = $('.g-modal-close');
        this.$modalImg = $('.modal-img');

        this.sortPic();
        this.modalPic();
    };

    Gallery.prototype.sortPic = function(){
        var _this = this;
        var imgBox = [];
        for(var i = 0; i < 48; i++){
            var num = i + 1;
            _this.$gImgs.eq(i).each(function(){
                imgBox.push(num);
            });
        }
        // console.log(imgBox);
        var sort = imgBox.sort(function() {
            return Math.random() - Math.random();
        });
        // console.log(sort);
        // console.log(_this.$gImgs);
        // console.log(imgBox);
        var j = 0;
        this.$gImgs.each(function() {
            // console.log(imgBox[j]);
            console.log(j);
            _this.$gImgs.eq(j).attr({
                src: '../../img/gallery/photo'+imgBox[j]+'.jpg'
            })
            j++;
        });

        $(window).on('load', function(){
            _this.$gImgs.animate({
                opacity: 1
            }, 1000);
        });
    };

    Gallery.prototype.modalPic = function(){
        var _this = this;
        var focusPicIndex;
        var focusPic;
        var crntScrollTop;
        _this.$gImgs.on('click', function(){
            crntScrollTop = $(window).scrollTop();
            focusPicIndex = _this.$gImgs.index(this);
            focusPic = _this.$gImgs.eq(focusPicIndex).attr('src');
            console.log(focusPic);
            _this.$gWrap.css({
                position:'fixed',
                top: -1 * crntScrollTop
            });
            _this.$gOverLay.css({
                width: '100%',
                height: _this.$height
            }).fadeIn(1000);
            _this.$gLayImg.append('<img class="modal-img" src="'+focusPic+'">');
        });
        $(window).on('resize', function(){
            var nowHeight = $(window).height();
            // console.log(nowHeight);
            // console.log(_this.$height);
            _this.$gOverLay.css({
                width: '100%',
                height: nowHeight
            });
        });
        _this.$modalClose.on('click', function(){
            _this.$gWrap.css({
                position:'initial'
            });
            $('html, body').prop({scrollTop:crntScrollTop});

            function removeModal(){
                _this.$gLayImg.empty();
            }
            _this.$gOverLay.fadeOut(700, removeModal);
        });

        _this.$modalBtn.find('img').on('click', function(){
            var index = _this.$modalBtn.find('img').index(this);
            var class = _this.$modalBtn.find('img').eq(index).attr('class');
            // console.log(index);
            // console.log(class);
            if(class === 'g-next' && !(focusPicIndex === 47)){
                focusPicIndex += 1;
                focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
                _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
            } else if (class === 'g-prev' && !(focusPicIndex === 0)) {
                focusPicIndex -= 1;
                focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
                _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
            } else if(class === 'g-next' && focusPicIndex === 47){
                focusPicIndex = 0;
                focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
                _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
            } else if(class === 'g-prev' && focusPicIndex === 0){
                focusPicIndex = 47;
                focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
                _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
            }
        });
    };


    App.Leagle = Leagle;
    App.Top = Top;
    App.list = list;
    App.Detail = Detail;
    App.Gallery = Gallery;
}());

$(function(){
    var url = window.location.href;
    var file = url.split('/');
    if(file[4] === 'detail.html'){
        location.href = '#background';
    }

    if(!file[4]){
        console.log('This is leagle');
        new App.Leagle;
    }else if(url.match('top.html')){
        console.log('This is top');
        new App.Top;
    }else if(url.match('gallery.html')){
        console.log('This is gallery');
        new App.Gallery;
        new App.list;
        new App.Detail;
    }else{
        console.log('This is contents');
        new App.list;
        new App.Detail;
    }
});