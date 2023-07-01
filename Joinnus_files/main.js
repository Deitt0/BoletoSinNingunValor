var current_app_country = window.app_country || 'PE';

//  localStorage.removeItem('categories');
    function resizeCategories() {
        var maxsize = $('#menu').width() - 160;
        var current_app_country = window.app_country || 'PE';

        var li_categories = [];
        var more_categories = [];
        var categories = JSON.parse(localStorage['categories']);
        $(categories).each(function (index) {
          if (index < 4){
            li_categories.push('<li><a href="/category/' + categories[index].slug + '" onclick="ga("send", "event", "'+ categories[index].category +'","click","'+categories[index].slug + '")" class="header-categories ju-ripple">' + categories[index].category + '</a></li>')
          }
          if (index > 4) {
            more_categories.push('<li><a href="/category/' + categories[index].slug + '" style="color: #000">' + categories[index].category + '</a></li>');
          }
        });

        $('#menu_top').empty();
        $('#menu_top').append(li_categories.join(''));
        $('#menu_top').append('<li><div class="dropdown dropup" id="more_categories"><a class="dropdown-toggle m-xs-auto" href="#" data-toggle="dropdown">Más categorías<span class="caret"></span></a><ul id="moreitems" class="dropdown-menu"></ul></div></li>');
        $('#moreitems').append(more_categories.join(''));

        // if (maxsize > 600) {
        //     var size = 0;
        //     var cat = [];
        //     $("#menu_top li").each(function (n) {
        //         size = size + $(this).outerWidth();
        //         if (size > maxsize) {
        //             $(this).css('display', 'none');
        //             cat.push({category: $(this).text(), slug: $('a', this).attr('href')});
        //         }
        //     });
        //
        //     if (cat.length > 0) {
        //         $('#menu_top').append('<li><div class="dropdown" id="more_categories" style="top: 16px; margin-left: 30px;"><a class="dropdown-toggle" href="#" data-toggle="dropdown">Más categorías<span class="caret"></span></a><ul id="moreitems" class="dropdown-menu"></ul></div></li>');
        //         for (var i = 0; i < cat.length; i++) {
        //             $('#moreitems').append('<li><a href="' + cat[i].slug + '" style="color: #000">' + cat[i].category + '</a></li>');
        //         }
        //     }
        // }
    }

    /**
     *
     */
    $('body').fadeIn();
    $('footer').fadeIn();
    $('#custom-search').click(function () {
    });
    $("a.my-tool-tip").tooltip();
    /**
     *
     * @type {Array}
     */
    var li_categories = [];
    var li_countries = [];
    /**
     *
     */
    delete localStorage['categories'];
    if (!localStorage['categories']) {
        $.ajax({
            url: 'https://api.joinnus.com/v1/' + current_app_country + '/categories',
            type: "get",
            success: function (data) {
                var categories = [];
                var cate = data.data;
                for (var i = 0; i < cate.length; i++) {
                    categories.push({category: cate[i].name, slug: cate[i].slug});
                }
                traductor(categories);
                localStorage['categories'] = JSON.stringify(categories);
                $(categories).each(function (index) {
                    li_categories.push('<li><a href="/categoryc/' + categories[index].slug + '/' + current_app_country + '" onclick="ga("send", "event", "'+ categories[index].category +'","click","'+categories[index].slug + '")" class="header-categories ju-ripple">' + categories[index].category + '</a></li>')
                });
                $('#menu_top').append(li_categories.join(''));

                resizeCategories();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error');
            }
        });
    } else {
        resizeCategories();
    }

     function traductor(array) {
        for (var i = 0; i < array.length; i++) {
            switch (array[i].category) {
                case 'Sports':
                    array[i].category = 'Deportes';
                    break;
                case 'Entertainment':
                    array[i].category = 'Entretenimiento';
                    break;
                case 'Trip & adventure':
                    array[i].category = 'Viaje y aventura';
                    break;
                case 'Food & drinks':
                    array[i].category = 'Comidas y bebidas';
                    break;
                case 'Art & culture':
                    array[i].category = 'Arte y cultura';
                    break;
                case 'Pets & animals':
                    array[i].category = 'Animales y mascotas';
                    break;
                case 'Hobbies & crafts':
                    array[i].category = 'Hoobies';
                    break;
                case 'Technology':
                    array[i].category = 'Tecnología';
                    break;
                case 'Kids':
                    array[i].category = 'Niños';
                    break;
                case 'Community service':
                    array[i].category = 'Ayuda Social';
                    break;
                case 'Conferences and lectures':
                    array[i].category = 'Conferencias y lecturas';
                    break;
                case 'Diary':
                    array[i].category = 'Diario';
                    break;
            }
        }
    };

    window.onresize = function (event) {

        resizeCategories();
    };

    $.ajax({
        url: '/account/notifications',
        type: "get",
        success: function (data) {
            var notificationshtml = [];
            var notifications = JSON.parse(data).data.list;
            Object.keys(notifications).forEach(function (el) {
                notificationshtml.push('<li><p>' + notifications[el].htmlMessage + '</p></li>');
            });
            $('.dropdown-notifications').append(notificationshtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    });

    $(".boton-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    setTimeout(function () {
        $('.wtsp').fadeOut(5000);
    }, 15000)
//	Detail Layout


    $('#more_categories').click(function (e) {
        e.stopPropagation();
        $(this).addClass('open');
    });
