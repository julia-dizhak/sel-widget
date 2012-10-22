$.fn.sel = function(options) {
    var defaults = {};
    var opts = $.extend(defaults, options);
    var _sel = this;

    // Object for mapping select items
    _sel.each(function(i, value) {
        function Sel(){
            this.item = $(value);
            this._opts = this.item.find('option');
        }

        Sel.prototype.initialize = function() {
            this.hideOriginalSelect();
            this.renderInitialState();
            this.toggleInnerList();
            
        };

        Sel.prototype.hideOriginalSelect = function() {
            this.item.hide();
        };

        Sel.prototype.toggleInnerList = function(){
            $('.sel-selected').live('click', function(){
                $(this).siblings('.sel-results').toggle();
                $(this).toggleClass('active');
            });
        };

        Sel.prototype.renderList = function(){
            var listTemplate = '';
            $.each(this.items(), function(index, value){
                listTemplate += '<li data-value=\"'+ value[0] +'\">'+ value[1] +'</li>';
            });
            var template =
                '<div class="sel-results">' +
                      '<input type="text" class="sel-search" placeholder="choose city">' +
                      '<ul class="sel-list">'+ listTemplate + '</ul>' +
                    '<div>';
            return template;
        };

        Sel.prototype.renderInitialState = function() {
            if (this.selected()){
              var template =
                 '<div class="sel-container">'+
                    '<div class="sel-selected">'+ this.selected()[1]+
                    '<span>▼</span></div>'+
                    this.renderList() +
                '</div>';
              $(template).insertAfter(this.item);
              return true;
            }
        };

        Sel.prototype.items = function(){
            var _items = [];

            this._opts.each(function(){
                _items.push([$(this).prop('value'), this.text]);
            });
            return _items;
    
        };

        Sel.prototype.selected = function(){
            var _selected = this.item.find(':selected');
            if (_selected.length>0) {
                var key = _selected.prop('value');
                return [key, _selected.text()];
            }
            else {
                return false;
            }
        };


        var sel_widget = new Sel();
        sel_widget.initialize();

    });
        
};
    