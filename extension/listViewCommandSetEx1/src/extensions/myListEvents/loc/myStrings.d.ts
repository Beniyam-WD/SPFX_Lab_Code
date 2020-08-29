declare interface IMyListEventsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MyListEventsCommandSetStrings' {
  const strings: IMyListEventsCommandSetStrings;
  export = strings;
}
