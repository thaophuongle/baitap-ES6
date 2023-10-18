function kiemTraRong(value, idErr, message) {
  if (value.trim() === "") {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  }
}

function kiemTraRongSo(value, idErr, message) {
  if (value === "") {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  }
}

function kiemTraEmail(value, idErr, message) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var isEmail = re.test(value);
  if (isEmail) {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  }
}

function kiemTraChuoi(value, idErr, message) {
  const re =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

  var isString = re.test(value);
  if (isString) {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  }
}

function kiemTraLoaiNguoiDung(value, idErr, message) {
  if (value === "") {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  }
}

function kiemTraSo(value, idErr, message) {
  const re = /^[0-9]+$/;

  var isString = re.test(value);
  console.log("isString: ", isString);
  if (isString) {
    document.querySelector(idErr).innerHTML = "";
    document.querySelector(idErr).style.display = "none";
    return true;
  } else {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  }
}
