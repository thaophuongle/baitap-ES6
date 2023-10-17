import Person from "./Person.js";

class Student extends Person {
  constructor(id, name, type, diaChi, email, diemToan, diemLy, diemHoa) {
    super(id, name, type, diaChi, email);
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
  }

  tinhDiemTB = () => {
    const diemToan = Number(this.diemToan);
    const diemHoa = Number(this.diemHoa);
    const diemLy = Number(this.diemLy);
    const average = (diemToan + diemHoa + diemLy) / 3;
    return average;
  };
}

export default Student;
