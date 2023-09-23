var products = {
  white: {
    plain: {
      unit_price: 5.12,
      photo: "img/v-white.jpg",
    },
    printed: {
      unit_price: 8.95,
      photo: "img/v-white-personalized.jpg",
    },
  },

  colored: {
    plain: {
      unit_price: 6.04,
      photo: "img/v-color.jpg",
    },
    printed: {
      unit_price: 9.47,
      photo: "img/v-color-personalized.png",
    },
  },
};

// Search params

var search_params = {
  quantity: "",
  color: "",
  quality: "",
  style: "",
};

var prize = 0;

function calculatePrize() {
  var unit_cost = parseFloat(
    products[search_params.color][search_params.style]["unit_price"]
  );
  var total_cost = unit_cost * parseInt(search_params["quantity"]);
  if (search_params["quality"] == "High (190g / m2)") {
    total_cost += (total_cost * 12) / 100;
  }

  if (search_params["quantity"] <= 100) {
    return total_cost;
  } else if (search_params["quantity"] <= 500) {
    return total_cost - (total_cost * 5) / 100;
  } else if (search_params["quantity"] <= 1000) {
    return total_cost - (total_cost * 12) / 100;
  } else {
    return total_cost - (total_cost * 20) / 100;
  }
}

// Additional pricing rules:

// 1. The prices above are for Basic quality (q150).
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities:
// 1: above 1000 units - 20% discount
// 2: above 500 units - 12% discount
// 3: above 100 units - 5% discount

// Solution:

$(function () {
  search_params.color = "white";
  search_params.style = "printed";
  search_params.quantity = "10";
  search_params.quality = "Basic (150g / m2)";
  prize = calculatePrize().toFixed(2);
  $("#result-style").html([search_params.style]);
  $("#result-color").html(search_params.color);
  $("#result-quantity").html(search_params.quantity);
  $("#result-quality").html(search_params.quality);
  $("#photo-product").attr(
    "src",
    products[search_params.color][search_params.style]["photo"]
  );
  $("#total-price").html(prize);
  $("#white").on({
    click: function () {
      search_params.color = "white";
      search_params.quantity = parseInt($("#quantity").val());
      search_params.style = $("#style").val();
      $("#photo-product").attr(
        "src",
        products[search_params.color][search_params.style]["photo"]
      );
      prize = calculatePrize().toFixed(2);
      $("#result-style").html([search_params.style]);
      $("#result-color").html(search_params.color);
      $("#result-quantity").html(search_params.quantity);
      $("#result-quality").html(search_params.quality);
      $("#total-price").html(prize);
      $("#white").addClass("selected");
      $("#colored").removeClass("selected");
    },
  });
  $("#colored").on({
    click: function () {
      search_params.color = "colored";
      search_params.style = $("#style").val();
      search_params.quantity = parseInt($("#quantity").val());
      $("#photo-product").attr(
        "src",
        products["colored"][search_params.style]["photo"]
      );
      prize = calculatePrize().toFixed(2);
      $("#result-style").html([search_params.style]);
      $("#result-color").html(search_params.color);
      $("#result-quantity").html(search_params.quantity);
      $("#result-quality").html(search_params.quality);
      $("#total-price").html(prize);
      $("#white").removeClass("selected");
      $("#colored").addClass("selected");
    },
  });

  $("#style").on({
    change: function () {
      search_params.style = $("#style").val();
      search_params.quantity = parseInt($("#quantity").val());
      $("#photo-product").attr(
        "src",
        products[search_params.color][search_params.style]["photo"]
      );
      prize = calculatePrize().toFixed(2);
      $("#result-style").html([search_params.style]);
      $("#result-color").html(search_params.color);
      $("#result-quantity").html(search_params.quantity);
      $("#result-quality").html(search_params.quality);
      $("#total-price").html(prize);
    },
  });

  $("#q150").on({
    click: function () {
      search_params.quality = "Basic (150g / m2)";
      prize = calculatePrize().toFixed(2);
      $("#result-quality").html(search_params.quality);
      $("#total-price").html(prize);
      $("#q190").removeClass("selected");
      $("#q150").addClass("selected");
    },
  });
  $("#q190").on({
    click: function () {
      search_params.quality = "High (190g / m2)";
      prize = calculatePrize().toFixed(2);
      $("#result-quality").html(search_params.quality);
      $("#total-price").html(prize);
      $("#q150").removeClass("selected");
      $("#q190").addClass("selected");
    },
  });
  $("#quantity").on({
    keyup: function () {
      search_params.quantity = $("#quantity").val();
      $("#result-quantity").html(search_params.quantity);

      prize = calculatePrize().toFixed(2);
      $("#total-price").html(prize);
    },
  });
});
