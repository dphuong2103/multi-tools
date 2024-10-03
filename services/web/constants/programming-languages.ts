import { ProgrammingLanguage } from "@/types/data-types";

export const programmingLanguages = [
  "javascript",
  "typescript",
  "csharp",
  "java",
  "php",
  "python",
] as const;
export const PROGRAMMING_LANGUAGE_VERSIONS: Record<
  ProgrammingLanguage,
  string
> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const mapProgrammingLanguageToExtension: Record<
  ProgrammingLanguage,
  string
> = {
  javascript: "js",
  typescript: "txt",
  python: "py",
  java: "java",
  csharp: "cs",
  php: "php",
};

export const programmingLanguageBootstrapCode: Record<
  ProgrammingLanguage,
  string
> = {
  csharp: `using System;
namespace HelloWorld
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");    
    }
  }
}
`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`,
  typescript: "console.log('Hello, world!');",
  javascript: "console.log('Hello, world!');",
  php: ``,
  python: `print('Hello, world!')`,
};
