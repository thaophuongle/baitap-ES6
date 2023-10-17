import Person from "../models/Person.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";

const getElement = (selector) => {
  return document.querySelector(selector);
};

const BASE_URL = "https://652d2601f9afa8ef4b26de3d.mockapi.io/users";

const getUserList = () => {
  const promise = axios({
    method: "GET",
    url: BASE_URL,
  });

  promise
    .then((result) => {
      //console.log(result.data);
      renderTable(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //console.log("finally");
    });
};

getUserList();

const renderTable = (userList) => {
  let htmlContent = "";
  userList.forEach((user) => {
    htmlContent += `
      <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.type}</td>
          <td>${user.diaChi}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onclick="editUser(${user.id})" id="btnEdit">Edit</button>
            <button class="btn btn-danger" onclick="deleteFood(${user.id})">Delete</button>
            <button class="btn btn-info">Detail</button>
          </td>
      </tr>
      `;
  });
  getElement("#tbodyUser").innerHTML = htmlContent;
};

getElement("#loai").onchange = () => {
  const type = getElement("#loai").value;
  if (type === "loai1") {
    getElement("#txtDiemToan").hidden = false;
    getElement("#txtDiemHoa").hidden = false;
    getElement("#txtDiemLy").hidden = false;
    getElement("#txtSoNgay").hidden = true;
    getElement("#txtLuongTheoNgay").hidden = true;
    getElement("#txtTenCTy").hidden = true;
    getElement("#txtGiaTriHD").hidden = true;
    getElement("#txtDanhGia").hidden = true;
  } else if (type === "loai2") {
    getElement("#txtSoNgay").hidden = false;
    getElement("#txtLuongTheoNgay").hidden = false;
    getElement("#txtDiemToan").hidden = true;
    getElement("#txtDiemHoa").hidden = true;
    getElement("#txtDiemLy").hidden = true;
    getElement("#txtTenCTy").hidden = true;
    getElement("#txtGiaTriHD").hidden = true;
    getElement("#txtDanhGia").hidden = true;
  } else if (type === "loai3") {
    getElement("#txtTenCTy").hidden = false;
    getElement("#txtGiaTriHD").hidden = false;
    getElement("#txtDanhGia").hidden = false;
    getElement("#txtDiemToan").hidden = true;
    getElement("#txtDiemHoa").hidden = true;
    getElement("#txtDiemLy").hidden = true;
    getElement("#txtSoNgay").hidden = true;
    getElement("#txtLuongTheoNgay").hidden = true;
  } else {
    getElement("#txtSoNgay").hidden = true;
    getElement("#txtLuongTheoNgay").hidden = true;
    getElement("#txtDiemToan").hidden = true;
    getElement("#txtDiemHoa").hidden = true;
    getElement("#txtDiemLy").hidden = true;
    getElement("#txtTenCTy").hidden = true;
    getElement("#txtGiaTriHD").hidden = true;
    getElement("#txtDanhGia").hidden = true;
  }
};

const layThongTinNguoiDung = () => {
  const elements = document.querySelectorAll(
    "#userForm input, #userForm select, #userForm textarea"
  );

  let user = {}; //tạo 1 object user
  elements.forEach((ele, index) => {
    //duyệt từng phần tử trong mảng elements
    //console.log(ele.value, ele.name);

    //sử dụng destructuring để bóc tách
    const { value, name } = ele;
    user[name] = value;
  });
  const {
    id,
    name,
    type,
    diaChi,
    email,
    diemToan,
    diemLy,
    diemHoa,
    soNgay,
    tenCTy,
    luongTheoNgay,
    triGiaHD,
    danhGia,
  } = user;

  const objectType = document.getElementById("loai");

  if (objectType.value === "loai1")
    return new Student(
      id,
      name,
      type,
      diaChi,
      email,
      diemToan,
      diemLy,
      diemHoa
    );
  else if (objectType.value === "loai2")
    return new Employee(id, name, type, diaChi, email, soNgay, luongTheoNgay);
  else if (objectType.value === "loai3")
    return new Customer(
      id,
      name,
      type,
      diaChi,
      email,
      tenCTy,
      triGiaHD,
      danhGia
    );
};

getElement("#btnThem").onclick = () => {
  const user = layThongTinNguoiDung();
  getElement("#btnCapNhat").hidden = true;

  const promise = axios({
    method: "POST",
    url: BASE_URL,
    data: {
      //spread operator
      ...user,
      type: user.mapLoaiDoiTuong(),
    },
  });

  promise
    .then((res) => {
      console.log(res.data);
      getUserList();
      getElement("#btnClose").click();
    })
    .catch((err) => {
      console.log(err);
    });
};
