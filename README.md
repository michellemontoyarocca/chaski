# Chaski — MVP de traducción español–quechua y reconocimiento de LSP

> *Chaski*: los mensajeros que recorrían los caminos del Tawantinsuyu llevando mensajes por relevos.
> Esta plataforma cumple el mismo papel entre el personal de salud y el paciente.

Plataforma web de apoyo comunicacional para **atención de salud rural**. Permite traducción
bidireccional español ↔ quechua (texto y voz) y reconocimiento de Lengua de Señas Peruana (LSP)
mediante cámara, desde el navegador y sin instalación.

Proyecto del curso **Proyecto Final de Carrera III**.

## Problema

La barrera comunicativa suele detectarse recién cuando el paciente ya está siendo atendido, lo que
genera demoras, frustración y dependencia de familiares que actúan como intérpretes improvisados.

## Segmentos de usuario

| Segmento | Necesidad |
| --- | --- |
| Personal de salud de puestos y centros rurales | Herramienta rápida y sencilla de apoyo comunicacional |
| Pacientes quechuahablantes | Comprender diagnóstico e indicaciones con limitado dominio del español |
| Personas sordas usuarias de LSP | Ser atendidas sin depender de un intérprete presente |

## Flujo del MVP

```
Seleccionar modalidad → Ingresar texto / voz o realizar seña → Procesar → Mostrar resultado
```

## Funcionalidades

- Traducción de texto y voz español ↔ quechua sobre una base de **1,635 pares léxicos** reales
  (variante Cusco pentavocálico).
- Reconocimiento de **86 señas LSP** mediante cámara.
- Procesamiento basado en **landmarks corporales**: no se almacenan imágenes ni videos.
- Dictado por voz con Web Speech API del navegador.
- Indicador de **cobertura léxica** y listado de palabras sin equivalencia, como insumo para ampliar
  el vocabulario clínico.
- Confirmación de comprensión del paciente y opción de **repetir o reformular**.
- Interfaz ligera y responsive, pensada para computadoras o tablets de consultorio.

## Estado del reconocimiento de señas

El módulo de LSP de esta versión **simula** la inferencia del modelo para validar el flujo de uso.
La exactitud de referencia de **86.03 %** proviene del sistema entrenado aparte y se toma como punto
de partida a validar, no como resultado final.

## Resultado esperado del MVP

Validar si la plataforma puede integrarse al flujo real de una consulta rural, si reduce barreras de
comunicación, si el personal puede usarla sin interrumpir demasiado la atención y qué limitaciones
existen en vocabulario clínico y reconocimiento de señas.

## Métricas de validación

1. Precisión de traducción / reconocimiento por sesión
2. Meta de referencia: 86.03 % como punto de partida a validar
3. Tiempo promedio para obtener un resultado
4. % de pacientes que confirman comprensión correcta
5. % de personal que considera útil la herramienta
6. Cantidad de errores, reformulaciones o repeticiones
7. Intención de reutilización en futuras consultas
8. Reducción de dependencia de familiares como intérpretes

## Fases

| Fase | Descripción |
| --- | --- |
| F1 | Comprender y definir el problema |
| F2 | Construir el MVP del traductor y reconocimiento LSP |
| F3 | Medir y testear con usuarios |
| F4 | Aprender e iterar para mejorar precisión, vocabulario y experiencia de uso |

## Tecnologías

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons

## Estructura

```
app/
  layout.tsx
  page.tsx                    orquesta el flujo del MVP
components/
  header.tsx
  hero.tsx
  mode-selector.tsx           texto / voz / seña LSP
  translator-panel.tsx        entrada de texto y dictado por voz
  camera-lsp.tsx              captura por cámara y catálogo de señas
  result-card.tsx             resultado, métricas y confirmación
  loading-state.tsx
  footer.tsx
lib/
  translate-service.ts        lógica de traducción y reconocimiento (separada de la interfaz)
data/
  lexicon.json                1,635 pares léxicos español–quechua
  signs.ts                    catálogo de 86 señas LSP
```

La lógica de traducción y reconocimiento vive en `lib/translate-service.ts`, separada de los
componentes de interfaz.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Despliegue

Desplegado en Vercel.

---

Lógica del MVP: construir para medir y aprender.
