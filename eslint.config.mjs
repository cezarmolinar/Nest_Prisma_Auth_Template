// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // regra de uso de 'any'
      '@typescript-eslint/no-floating-promises': 'warn', // regra de promessas flutuantes
      '@typescript-eslint/no-unsafe-argument': 'warn', // regra de argumentos inseguros
      '@typescript-eslint/interface-name-prefix': 'off', // regra de prefixo em interfaces
      '@typescript-eslint/explicit-function-return-type': 'off', // regra de tipo de retorno explícito em funções
      '@typescript-eslint/explicit-module-boundary-types': 'off' // regra de tipos explícitos em limites de módulo
      // 'prettier/prettier': [
      //   'error',
      //   {
      //     useEditorConfig: false,
      //     semi: false, // sem ;
      //     singleQuote: true, // aspas simples
      //     printWidth: 80, // largura da linha
      //     endOfLine: 'lf', // final de linha
      //     quoteProps: 'as-needed', // aspas em propriedades de objetos
      //     bracketSpacing: true, // espaçamento entre chaves
      //     jsxBracketSameLine: false, // JSX colchetes na mesma linha
      //     arrowParens: 'avoid', // parênteses em arrow functions
      //     proseWrap: 'preserve', // quebra de linha em texto
      //     tabWidth: 2, // largura da tabulação
      //     trailingComma: 'none' // vírgula no final
      //   }
      // ]
    }
  }
)
