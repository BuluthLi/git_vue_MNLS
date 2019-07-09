export const sendMessage = function (status) {
  let data = JSON.stringify({ "func": "ModifyStatus", "status": status });
  console.log(data);
  window.cefQuery({
    request: data,
    onSuccess: function (response) { },
    onFailure: function (error_code, error_message) { }
  });
}
export const blurImage = function (_this) {
  // console.log(_this.$refs);
  // let list=_this.$refs['blur-image'];
  // console.log(Array.isArray(list));
  // list.forEach((item,index)=>{
  //   let src=item.getAttribute('data-src');
  //   console.log(src);
  // })
}
export const autoImg = function (name) {
  let parent = document.getElementsByClassName(name)[0];
  let target = parent.getElementsByTagName('img')[0];
  let parentStyle = window.getComputedStyle(parent, null);
  // let targetStyle=window.getComputedStyle(target,null);
  console.log(parent, parentStyle.width, parentStyle.height);
  let parent_ratio = parentStyle.width / parentStyle.height;
  var img = new Image();
  let img_url = target.getAttribute('src');
  console.log(img_url);
  img.src = img_url;
  img.onload = function () {
    var img_ratio = img.width / img.height;
    let trueTarget = parent.getElementsByTagName('img')[0];
    console.log(target, trueTarget);
    // 判断图片相对与父元素宽小了还是高小了
    if (img_ratio < parent_ratio) {
      console.log("图片宽小了");
      trueTarget.style.width = "100%";
    } else {
      console.log("图片高小了");
      trueTarget.style.height = "100%";
    }
  };


  // console.log(target);
  // //img元素
  // var img_element = $(img_select);
  // //img路径
  // var img_url = img_url;
  // //img父级元素的宽高比
  // var parent_ratio = img_element.parent().width() / img_element.parent().height();

  // var img = new Image();
  // img.src = img_url;

  // img.onload = function () {
  //     var img_ratio = img.width / img.height;
  //     // 判断图片相对与父元素宽小了还是高小了
  //     if (img_ratio < parent_ratio) {
  //         console.log("图片宽小了");
  //         img_element.css("width", "100%");
  //     } else {
  //         console.log("图片高小了");
  //         img_element.css("height", "100%");
  //     }
  //     img_element.attr("src", img_url);

  // };
}