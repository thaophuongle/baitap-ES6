import Person from "./Person.js";

class Customer extends Person {
  constructor(id, name, type, diaChi, email, tenCTy, triGiaHD, danhGia) {
    super(id, name, type, diaChi, email);
    this.tenCTy = tenCTy;
    this.triGiaHD = triGiaHD;
    this.danhGia = danhGia;
  }
}

export default Customer;
