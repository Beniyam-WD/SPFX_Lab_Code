declare interface ISpFxListCustomMenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'SpFxListCustomMenuCommandSetStrings' {
  const strings: ISpFxListCustomMenuCommandSetStrings;
  export = strings;
}
