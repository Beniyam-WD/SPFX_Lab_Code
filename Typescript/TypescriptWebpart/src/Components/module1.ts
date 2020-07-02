export let age : number = 20;
export let strval : string = "Data from module";

export class employee {

  private empCode: number;
  private empName: string;

  constructor(name: string, code: number) {
    this.empName = name;
    this.empCode = code;
  }
  public displayEmployee() {
    console.log ("Employee Code: " + this.empCode + ", Employee Name: " + this.empName );
    return("Employee Code: " + this.empCode + ", Employee Name: " + this.empName );
  }
}
