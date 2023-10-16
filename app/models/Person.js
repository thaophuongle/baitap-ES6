class Person {
  constructor(id, name, type, diaChi, email) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.diaChi = diaChi;
    this.email = email;
  }

  mapLoaiDoiTuong = () => {
    if (this.type === "loai1") {
      return "Học viên";
    }
    if (this.type === "loai2") {
      return "Giảng viên";
    }
    if (this.type === "loai3") {
      return "Khách hàng";
    }
  };
}

export default Person;
