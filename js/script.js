$(document).on('ready', function(){

    function hideAllDropContainers(){
        $('.dropContainer').each(function( index, el ) {
            if($(el).is(":visible"))
                $(el).hide();
        });
    }

    function createAndAttachHandler(id){
        //create
        var drop = $('#' + id);
		var htmlString = '<div class="dropContainer">';

		for(var i = 1; i < 51; i++){
			htmlString += '<div class="drop_option"> '+i+'</div>';
		}

		htmlString += '</div>';
		drop.append(htmlString);
        

        //attach handler
        $('#' + id).on('click', function(event){
            hideAllDropContainers();
            
            var drop = $('#' + id);
            var container = $('#' + id).children(".dropContainer");
            var target = $(event.target);

            if(target.hasClass('value_holder') || target.attr('id') === id 
                                            || target.hasClass('buy_more')) {

                if(!container.is(":visible")){
                    container.show();
                    event.stopPropagation(); 
                }
            }
            else if(target.hasClass('drop_option'))
                drop.find('span.value_holder').text(target.text());
        });
    }

    createAndAttachHandler('custom_dropdown1');
    createAndAttachHandler('custom_dropdown2');
    createAndAttachHandler('custom_dropdown3');
    createAndAttachHandler('custom_dropdown4');

    $(document).on('click', hideAllDropContainers);

    //Basket

    for (var i=1; i<5; i++)
        if (localStorage.getItem('product' + i + '_count') === null)
            localStorage.setItem('product' + i + '_count', 0);


    function calculatePrice(){
        var total_price = 0;
        for (var i=1; i<5; i++){
            var count = parseInt(localStorage.getItem('product' + i + '_count'));
            if (count > 0)
                $("#product" + i + "_basket").show();
            else
                $("#product" + i + "_basket").hide();

            var $product_in_basket = $("#product" + i + "_basket");
            $product_in_basket.find('input').val(count);

            var price = count * 8.5;
            $product_in_basket.find('.price').text("€ " + price);
            total_price = total_price + price;
        }

        $('#price_total').text("€ " + total_price);
    }

    $('.buy_button').on('click', function(){
        var $parent = $(this).parents('.product');
        var count = parseInt($parent.find('.value_holder').text());
        var id = $parent.attr('id');
        var oldCount = parseInt(localStorage.getItem(id + '_count'));
        count += oldCount;
        localStorage.setItem(id + '_count', count);

        calculatePrice();
        $("#exampleModal").modal('show');
    });

    function changeProductInBasket(self, diff){
        var $input = self.parent().find('input');
        var count = parseInt($input.val()) + diff;
        count = count < 1 ? 0 : count;

        $input.val(count);
        $input.change();

        var prdoductId = self.parents('.product_in_basket').attr('id').split('_')[0];
        localStorage.setItem(prdoductId + '_count', count);

        calculatePrice();

        return false;
    }

    $('.minus').click(function () {
        return changeProductInBasket($(this), -1);
    });

    $('.plus').click(function () {
        return changeProductInBasket($(this), 1);
    });

});
