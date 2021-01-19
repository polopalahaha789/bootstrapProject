$('.plus').click(function () {
    var product = $(this).closest('.product')
    var q = product.data('quantity') + 1;
    product.data('quantity', q);
    updateProduct(product);   
});
$('.minus').click( function() {
    var product = $(this).closest('.product')
    var q = Math.max(1, product.data('quantity') - 1); 
    product.data('quantity', q);
    updateProduct(product);
});
function updateProduct(product) {
    var quantity = product.data('quantity');
    var price = product.data('price');
    $('.product-quantity', product).text('x' + quantity);
    $('.product-price', product).text('Giá Món Ăn: ' + (price * quantity).toFixed(3) +'VND');
    updateBill();
}

$(function(){
  showProducts(products, '.product-list');
  countCart();
  $('.add-cart').click(function(){
      let id = $(this).attr('data-id');
      addToCart(id); // function thêm sản phẩm vào giỏ
      countCart(); // đếm số lượng sản phẩm khi mua hàng 
  });
});

$('#pay').click(function () {
    window.location = "payment.html";
    sessionStorage.setItem('cart',JSON.stringify(cart))
})