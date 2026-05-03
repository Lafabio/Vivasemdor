# Vivasemdor

Protótipo web simples para geração de **Plano Educacional Individualizado (PEI)**.

## Como executar

Como é uma aplicação estática, basta abrir o `index.html` no navegador.

Opcionalmente, rode um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Funcionalidades

- Cadastro de dados gerais do estudante.
- Campos para preenchimento pedagógico e observações.
- Salvamento local no navegador (`localStorage`).
- Exportação em `.txt` via botão **Baixar PEI Diário**.
