import Person from "./Person.js";

class Employee extends Person {
  constructor(id, name, type, diaChi, email, soNgay, luongTheoNgay) {
    super(id, name, type, diaChi, email);
    this.soNgay = soNgay;
    this.luongTheoNgay = luongTheoNgay;
  }

  tinhLuong = () => {
    const salary = this.soNgay * this.luongTheoNgay;
    return salary;
  };
}

export default Employee;
