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
            <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            <button data-toggle="modal" data-target="#exampleModal" onclick="showDetail(${user.id})" class="btn btn-info">Detail</button>
          </td>
      </tr>
      `;
  });
  getElement("#tbodyUser").innerHTML = htmlContent;
};

const showInput = () => {
  const type = getElement("#loai").value;
  if (type === "Học viên") {
    getElement("#txtDiemToan").hidden = false;
    getElement("#txtDiemHoa").hidden = false;
    getElement("#txtDiemLy").hidden = false;
    getElement("#txtSoNgay").hidden = true;
    getElement("#txtLuongTheoNgay").hidden = true;
    getElement("#txtTenCTy").hidden = true;
    getElement("#txtGiaTriHD").hidden = true;
    getElement("#txtDanhGia").hidden = true;
  } else if (type === "Giảng viên") {
    getElement("#txtSoNgay").hidden = false;
    getElement("#txtLuongTheoNgay").hidden = false;
    getElement("#txtDiemToan").hidden = true;
    getElement("#txtDiemHoa").hidden = true;
    getElement("#txtDiemLy").hidden = true;
    getElement("#txtTenCTy").hidden = true;
    getElement("#txtGiaTriHD").hidden = true;
    getElement("#txtDanhGia").hidden = true;
  } else if (type === "Khách hàng") {
    getElement("#txtTenCTy").hidden = false;
    getElement("#txtGiaTriHD").hidden = false;
    getElement("#txtDanhGia").hidden = false;
    getElement("#txtDiemToan").hidden = true;
    getElement("#txtDiemHoa").hidden = true;
    getElement("#txtDiemLy").hidden = true;
    getElement("#txtSoNgay").hidden = true;
    getElement("#txtLuongTheoNgay").hidden = true;
  } else if (type === "") {
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

getElement("#loai").onchange = () => {
  showInput();
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

  if (objectType.value === "Học viên")
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
  else if (objectType.value === "Giảng viên")
    return new Employee(id, name, type, diaChi, email, soNgay, luongTheoNgay);
  else if (objectType.value === "Khách hàng")
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
  getElement("#btnCapNhat").hidden = true;
  getElement("#btnAdd").hidden = false;
  getElement("#txtId").hidden = true;
  showInput();
};

getElement("#btnClose").onclick = () => {
  resetForm();
  getElement("#txtLuongThang").hidden = true;
  getElement("#txtDiemTB").hidden = true;
};

const resetForm = () => {
  const elements = document.querySelectorAll(
    "#userForm input, #userForm select, #userForm textarea"
  );
  elements.forEach((ele, index) => {
    ele.value = "";
  });
};

getElement("#btnAdd").onclick = () => {
  const user = layThongTinNguoiDung();

  const promise = axios({
    method: "POST",
    url: BASE_URL,
    data: {
      //spread operator
      ...user,
    },
  });

  promise
    .then((res) => {
      console.log(res.data);
      getUserList();
      getElement("#btnClose").click();
      resetForm();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.editUser = (id) => {
  getElement("#btnAdd").hidden = true;
  getElement("#btnCapNhat").hidden = false;
  getElement("#txtId").hidden = false;

  const promise = axios({
    method: "GET",
    url: `${BASE_URL}/${id}`,
  });

  promise
    .then((res) => {
      const parse = (user) => {
        return {
          ...user,
        };
      };

      console.log(res.data);
      const user = parse(res.data);
      if (user.type === "Học viên") {
        const student = new Student(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.diemToan,
          user.diemLy,
          user.diemHoa
        );
        getElement("#id").value = student.id;
        getElement("#name").value = student.name;
        getElement("#loai").value = student.type;
        getElement("#diaChi").value = student.diaChi;
        getElement("#email").value = student.email;
        getElement("#diemToan").value = student.diemToan;
        getElement("#diemLy").value = student.diemLy;
        getElement("#diemHoa").value = student.diemHoa;
      } else if (user.type === "Giảng viên") {
        const employee = new Employee(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.soNgay,
          user.luongTheoNgay
        );
        getElement("#id").value = employee.id;
        getElement("#name").value = employee.name;
        getElement("#loai").value = employee.type;
        getElement("#diaChi").value = employee.diaChi;
        getElement("#email").value = employee.email;
        getElement("#soNgay").value = employee.soNgay;
        getElement("#luongTheoNgay").value = employee.luongTheoNgay;
      } else if (user.type === "Khách hàng") {
        const customer = new Customer(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.tenCTy,
          user.triGiaHD,
          user.danhGia
        );
        getElement("#id").value = customer.id;
        getElement("#name").value = customer.name;
        getElement("#loai").value = customer.type;
        getElement("#diaChi").value = customer.diaChi;
        getElement("#email").value = customer.email;
        getElement("#tenCTy").value = customer.tenCTy;
        getElement("#triGiaHD").value = customer.triGiaHD;
        getElement("#danhGia").value = customer.danhGia;
      }

      showInput();
    })
    .catch((err) => {
      console.log(err);
    });
};

getElement("#btnCapNhat").onclick = () => {
  const user = layThongTinNguoiDung();

  const id = getElement("#id").value;

  //call API cập nhật món ăn
  const promise = axios({
    method: "PUT",
    url: `${BASE_URL}/${id}`,
    data: {
      //spread operator
      ...user,
    },
  });

  promise
    .then(() => {
      getUserList();
      getElement("#btnClose").click();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.deleteUser = (id) => {
  const promise = axios({
    method: "DELETE",
    url: `${BASE_URL}/${id}`,
  });

  promise
    .then(() => {
      getUserList();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.showDetail = (id) => {
  getElement("#btnAdd").hidden = true;
  getElement("#btnCapNhat").hidden = true;
  getElement("#txtId").hidden = false;

  const promise = axios({
    method: "GET",
    url: `${BASE_URL}/${id}`,
  });

  promise
    .then((res) => {
      console.log(res.data);
      const user = res.data;
      if (user.type === "Học viên") {
        const student = new Student(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.diemToan,
          user.diemLy,
          user.diemHoa
        );

        getElement("#id").value = student.id;
        getElement("#name").value = student.name;
        getElement("#loai").value = student.type;
        getElement("#diaChi").value = student.diaChi;
        getElement("#email").value = student.email;
        getElement("#diemToan").value = student.diemToan;
        getElement("#diemLy").value = student.diemLy;
        getElement("#diemHoa").value = student.diemHoa;
        getElement("#txtDiemTB").hidden = false;
        getElement("#txtLuongThang").hidden = true;
        getElement("#diemTB").value = student.tinhDiemTB();
        showInput();
      } else if (user.type === "Giảng viên") {
        const employee = new Employee(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.soNgay,
          user.luongTheoNgay
        );
        getElement("#id").value = employee.id;
        getElement("#name").value = employee.name;
        getElement("#loai").value = employee.type;
        getElement("#diaChi").value = employee.diaChi;
        getElement("#email").value = employee.email;
        getElement("#soNgay").value = employee.soNgay;
        getElement("#luongTheoNgay").value = employee.luongTheoNgay;
        getElement("#txtLuongThang").hidden = false;
        getElement("#txtDiemTB").hidden = true;
        getElement("#luongThang").value = employee.tinhLuong();
        showInput();
      } else if (user.type === "Khách hàng") {
        const customer = new Customer(
          user.id,
          user.name,
          user.type,
          user.diaChi,
          user.email,
          user.tenCTy,
          user.triGiaHD,
          user.danhGia
        );
        getElement("#id").value = customer.id;
        getElement("#name").value = customer.name;
        getElement("#loai").value = customer.type;
        getElement("#diaChi").value = customer.diaChi;
        getElement("#email").value = customer.email;
        getElement("#tenCTy").value = customer.tenCTy;
        getElement("#triGiaHD").value = customer.triGiaHD;
        getElement("#danhGia").value = customer.danhGia;
        getElement("#txtLuongThang").hidden = true;
        getElement("#txtDiemTB").hidden = true;
        showInput();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Lọc người dùng theo loại
getElement("#selLoai").onchange = () => {
  const promise = axios({
    method: "GET",
    url: BASE_URL,
  });

  promise
    .then((res) => {
      const type = getElement("#selLoai").value;
      if (
        type === "Học viên" ||
        type === "Giảng viên" ||
        type === "Khách hàng"
      ) {
        const users = res.data.filter((user) => user.type === type);
        renderTable(users);
      } else {
        renderTable(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};
