REST_PATH = 'http://localhost/server/rest';

require(['dojo/dom',
    'client/module/Header',
    'client/module/Navigation',
    'client/module/Footer',
    'dojo/domReady!'],
    function (dom, Header, Navigation, Footer) {
        var node = dom.byId('headerNode');
        node && new Header({}, node);

        node = dom.byId('navNode');
        node && new Navigation({}, node);

        node = dom.byId('footerNode');
        node && new Footer({}, node);
    });