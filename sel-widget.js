$.fn.sel = function(options) {
    var defaults = {};
    var opts = $.extend(defaults, options);
    var _sel = this;
    var _opts = _sel.find('option');


    // Object for mapping select items
    var Sel = {

        initialize: function(){
            this.hideOriginalSelect();
            this.renderInitialState();
        },

        hideOriginalSelect: function(){
            _sel.hide();
        },

        renderInitialState: function(){
            if (this.selected){
              var template =
                 '<div class="sel-container">'+
                    '<div class="sel-selected">'+ this.selected[1]+
                    '<span>▼</span></div>'+
                '</div>';
              $(template).insertAfter(_sel);
              return true;
            }
        },

        items: (function(){
            var _items = {};
             _opts.each(function(){
                _items[$(this).prop('value')] = this.text;
             });
            return _items;
        })(),

        selected: (function(){
            var _selected = _sel.find(':selected');

            if (_selected.length>0) {
                var key = _selected.prop('value');
                return [key, _selected.text()];
            }
            else {
                return false;
            }
        })()

    };
    Sel.initialize();
    console.log(Sel.selected);
};