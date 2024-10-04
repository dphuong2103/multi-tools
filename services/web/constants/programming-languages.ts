import { ProgrammingLanguage } from "@/types/data-types";

export const programmingLanguages = [
  "javascript",
  "typescript",
  "csharp",
  "java",
  "php",
  "python",
  "c",
  "cpp",
  "kotlin",
  "ruby",
  "dart",
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
  c: "10.2.0",
  cpp: "10.2.0",
  kotlin: "1.8.20",
  ruby: "3.0.1",
  dart: "2.19.6",
};

export const mapProgrammingLanguageToExtension: Record<
  ProgrammingLanguage,
  string
> = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  java: "java",
  csharp: "cs",
  php: "php",
  c: "c",
  cpp: "cpp",
  kotlin: "kt",
  ruby: "rb",
  dart: "dart",
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
  php: `<?php echo "Hello, world!"; ?>`,
  python: `print('Hello, world!')`,
  c: `#include <stdio.h>
int main() {
   printf("Hello, World!");
   return 0;
}`,
  cpp: `#include <iostream>
int main() {
   std::cout << "Hello, World!" << std::endl;
   return 0;
}`,
  kotlin: `fun main() {
    println("Hello, world!")
}`,
  ruby: `puts "Hello, world!"`,
  dart: `void main() {
  print('Hello, world!');
}`,
};
