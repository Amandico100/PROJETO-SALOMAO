# Pasta de Iscas dos Clientes

Esta pasta contém as iscas geradas para cada cliente.

## Estrutura

Cada cliente tem sua própria subpasta:

```
iscas/
└── [slug-cliente]/
    ├── config.ts      # Configuração da isca (QuizConfig)
    ├── logica.ts      # Lógica de cálculo (se necessário)
    └── metadata.json  # Dados do cliente
```

## Convenção de Nomes

- Use slug em kebab-case
- Inclua nome + nicho
- Exemplos:
  - `dr-silva-tributario/`
  - `clinica-sorriso-dentista/`
  - `personal-renato-fitness/`
