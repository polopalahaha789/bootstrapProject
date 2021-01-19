// hiển thị table product từ cart
function showCart(){
  if(sessionStorage.getItem('shoppingCart')==undefined){
      $('.showcart').html(`
          <tr><td colspan="3" class="tex-center">Giỏ hàng rỗng</td></tr>`
      );
  }else{
      const local = JSON.parse(sessionStorage.getItem('shoppingCart'));
      if(local.lenght==0){
          $('.showcart').html(`
              <tr><td colspan="3" class="tex-center">Giỏ hàng rỗng</td></tr>`
          );
      }else{
          loadFormCarts(local);
      }
  }
}

// tạo table 
function loadFormCarts(carts){
  var html = '';
  console.log(carts);
  carts.forEach((element) =>{
      html+=`
          <tr>
              <td><img width="50px" src="${element.image}"</td>
              <td>${element.name}</td>
              <td>${element.count}</td>
              <td>${element.price * element.count}<span>.000</span></td>
          </tr>
      `;
  });
  $('.showcart').html(html);
}
function deleteCart(){
  sessionStorage.removeItem('shoppingCart');
}
//hiển thị số lương giỏ hàng khi cick mua hàng
function countCart(){
  console.log('count cart');
  if(sessionStorage.getItem('shoppingCart')){
      var count =  JSON.parse(sessionStorage.getItem('shoppingCart'));
      $('.cart-count').html(count.length);
  }else{
      $('.cart-count').html('0');
  }
  
}


var getIt = JSON.parse(sessionStorage.getItem('shoppingCart'));
getIt.forEach(element => {
  $('.showcart').html(`<tr><td></td><td></td><td></td></tr>`)
});
$(function(){
  showCart();//
  countCart();
  $('.delete-cart').click(function(){
      deleteCart();
      showCart();
      countCart();
      console.log(cart)
  });
});