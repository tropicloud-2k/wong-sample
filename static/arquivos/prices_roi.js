$(document).ready(function() {
  
  $("#productPrice .skuBestPrice, #productPrice .skuListPrice, #productPrice .economia").each(function(i,e){$(e).text("S/. "+$(e).text().replace("S/. ", "").replace(/\./g, ","))});
  
});
