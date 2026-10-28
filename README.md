# Eduardo Amaral — Mentorias e Boxe | Vivência de Boxe

Landing Page oficial da metodologia **Vivência de Boxe: A Constância em Equilíbrio**, conduzida por **Eduardo Amaral** (Instrutor Técnico da Federação Gaúcha de Boxe — FGB, com 35 anos de constância em equilíbrio).

## Destaques do Projeto

- **Identidade Visual Fiel aos Materiais Oficiais:**
  - Logotipo oficial extraído em vetor puro (`public/logo-light.svg`, `public/logo-dark.svg` e `public/favicon.svg`) mantendo as cores exatas (`#AA231C`, `#B5251E`, `#26241F`, `#35322B`, `#45413A`, `#544F45`, `#F1F0EC`).
  - Retrato oficial em alta resolução (`public/eduardo-amaral.jpg`) e QR Code oficial (`public/qrcode.png`).
- **Conteúdo Integral dos 47 Slides:**
  - **Capa & Conceito:** *Vivência de Boxe — A Constância em Equilíbrio (Se sente... Se conecta... Se treina...)*.
  - **O Aquecimento:** *Um Round de Equilíbrio* e *Tranquilidade / Agilidade* com modo interativo guiado em 6 passos.
  - **Por Que Estou Aqui? / O Mentor:** Credenciais FGB, 35 anos de trajetória e formatos de atuação corporativa.
  - **O Primeiro Ritmo:** Integração segura com o vídeo oficial no YouTube (`youtube-nocookie.com`).
  - **Os 6 Pilares & Bússola Executiva:** Diagnóstico rápido por desafio corporativo (*O Interno*, *Estratégia e Performance*, *Resiliência e Superação*, *Liderança e Relacionamento*, *Percepção e Presença*, *A Maestria*).
  - **Os 36 Rounds Interativos:** Modo Ringue (apresentação fiel com *Fusão de Realidades*, *Vivência de Treinos ST/CT* e *Vivência do Instrutor*) e Modo Catálogo com busca, filtro por ciclo e sorteio de Round.
- **Boas Práticas de Segurança (OWASP / Vercel):**
  - Cabeçalhos HTTP de segurança configurados em `vercel.json`: `Content-Security-Policy` (CSP), `Strict-Transport-Security` (HSTS), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` e `Cross-Origin-Opener-Policy`.
  - Sanitização estrita de entradas no formulário de agendamento, links externos protegidos com `rel="noopener noreferrer"` e embed de vídeo com `youtube-nocookie.com`.

## Stack & Comandos

- **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**

```bash
npm ci
npm run build
npm run preview
```
