import { CODE_EXECUTION_API_URL } from "@/constants/api";
import { PROGRAMMING_LANGUAGE_VERSIONS } from "@/constants/programming-languages";
import axios from "@/lib/axios";
import { ProgrammingLanguage } from "@/types/data-types";

export const executeCode = async (
  language: ProgrammingLanguage,
  sourceCode: string,
  abortController: AbortController,
) => {
  const response = await axios.post(
    CODE_EXECUTION_API_URL,
    {
      language: language,
      version: PROGRAMMING_LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    },
    {
      signal: abortController.signal,
    },
  );
  return response.data;
};
