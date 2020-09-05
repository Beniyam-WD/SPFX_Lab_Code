export class CustomlibraryLibrary {

  public getCurrentTime():string{
    return "Current Time : " + new Date().toTimeString();
  }

  public getMyThemeColor():string{
    return "#038387";
  }
}
