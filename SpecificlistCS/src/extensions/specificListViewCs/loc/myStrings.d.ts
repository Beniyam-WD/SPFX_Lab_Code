declare interface ISpecificListViewCsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'SpecificListViewCsCommandSetStrings' {
  const strings: ISpecificListViewCsCommandSetStrings;
  export = strings;
}
