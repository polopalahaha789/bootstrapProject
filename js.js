var arr = [
  {
    name: "shushi",
    money: "100.000đ",
    image: "./image/sushi.jpg",
    reviews: "Ưa Thích"
  },
  {
    name: "buger",
    money: "140.000đ",
    image: "./image/a5e37e7e-b2bb-4fc8-b5c8-f20a4461415b-03591-4_Big_King_XL_PR_Images_CR2.jpg",
    reviews: "Ưa Thích"
  },
  {
    name: "banh mi",
    money: "140.000đ",
    image: "./image/banh-mi-hoi-an-2.jpg",
    reviews: "Ưa Thích"
  },
  {
    name: "takoyaki",
    money: "200.000đ",
    image: "./image/mon-takoyaki.jpg",
    reviews: "Ưa Thích"
  },
  {
    name: "pho",
    money: "40.000đ",
    image: "./image/OIP (1).jpg",
    reviews: "Ưa Thích"
  },
]
function searchfood() {
  var searchHTML = '';
  var flag = $('#searchs').val();
  if (flag == "") {
    $('.valsearch').html(``)
  } else {
    arr.map(function (item) {
      if (item.name.toLowerCase().indexOf(flag) != -1) {
        // console.log("true");
        searchHTML += `
          <span><div class="row m-0" style="background-color: white; ">
          <div class="col-4 p-0" img-search"><img src="${item.image}"></div>
          <div class="col-8 font-search"> <h4 style="margin: 0; padding: 0" class="name-food">${item.name}</h4>
          <p style="margin: 0; padding: 0" class="money-food">${item.money}</p>
          <p style="margin-left: 100px; margin-top: -25px; padding: 0" class="reviews-food">${item.reviews}</p>
          </div>
          </div> 
          </span><br/>`;
      }
    });
    $('.valsearch').html(searchHTML);
  }
}



var shoppingCart = (function () {

  // Private methods and propeties
  cart = [];

  // Xây dựng giỏ hàng
  function Item(name, price, count ,image) {
    this.name = name;
    this.price = price; //giá tiền sản phẩm
    this.count = count; //số lượng sản phẩm
    this.image = image;
  }

  // Lưu giỏ hàng
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // tải giỏ hàng 
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  // Public methods and propeties

  var obj = {};

  // thêm sản phẩm vào giỏ hàng
  obj.addItemToCart = function (name, price, count, image) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, image);
    cart.push(item);
    saveCart();
    console.log(cart)
  }
  // trừ sản phẩm khỏi giỏ hàng
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // xóa sản phẩm khỏi giỏ hàng
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // đếm tổng sản phẩm trong giỏ
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // tổng số tiền mỗi sản phẩm
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(3));
  }

  // danh sách giỏ hàng
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(3);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
    
  }
  console.log(cart);

  return obj;
})();


// Triggers / Events


// buff sản phẩm vào giỏ hàng
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var image = $(this).parent().prev().attr('src');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name,  price,   1, image);
  displayCart();
});
//  hiện thị sản phẩm trong giỏ hàng
function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>"
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = "
      + "<td>" + cartArray[i].total + "</td>"
      + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// nút xóa sản phẩm

$('.show-cart').on("click", ".delete-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})

// -1
$('.show-cart').on("click", ".minus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

displayCart();

// localStorage 
$('#pay').click(function () {
  window.location = "payment.html";
  sessionStorage.setItem('cart',JSON.stringify(cart))
  
})
$('#sanpham').click(function () {
  window.location = "san pham.html";
  sessionStorage.setItem('cart',JSON.stringify(cart))
  
})