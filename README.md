# Chaski — traductor experimental español–quechua y demo LSP

> *Chaski*: los mensajeros que recorrían los caminos del Tawantinsuyu llevando mensajes por relevos.
> Esta plataforma cumple el mismo papel entre el personal de salud y el paciente.

Plataforma web de apoyo comunicacional para **atención de salud rural**. Permite traducción
bidireccional español ↔ quechua sobre un léxico acotado y una demo de flujo para Lengua de Señas
Peruana (LSP), desde el navegador y sin instalación.

**Estado:** prototipo. No sustituye a un intérprete profesional ni debe usarse para tomar
decisiones clínicas. La demo LSP no analiza la cámara ni estima confianza real.


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

- Traducción de texto español ↔ quechua sobre una base de **1,635 pares léxicos**
  (variante Cusco pentavocálico).
- Catálogo de **86 señas LSP** con resultados simulados para explorar la interfaz.
- Vista previa de cámara local; no se analiza, graba ni envía la imagen.
- Dictado en español mediante Web Speech API del navegador, sujeto a compatibilidad del navegador.
- Indicador de **cobertura léxica** y listado de palabras sin equivalencia, como insumo para ampliar
  el vocabulario clínico.
- Confirmación de comprensión del paciente y opción de **repetir o reformular**.
- Interfaz ligera y responsive, pensada para computadoras o tablets de consultorio.

## Estado del reconocimiento de señas

El módulo LSP de esta versión **simula** la inferencia: selecciona una seña del catálogo o al azar,
sin analizar los fotogramas. Cualquier métrica de un modelo entrenado aparte requiere validación
independiente y no describe el desempeño de esta aplicación.

## Resultado esperado del MVP

Validar si la plataforma puede integrarse al flujo real de una consulta rural, si reduce barreras de
comunicación, si el personal puede usarla sin interrumpir demasiado la atención y qué limitaciones
existen en vocabulario clínico y reconocimiento de señas.

## Métricas de validación

1. Precisión de traducción / reconocimiento por sesión
2. Exactitud de reconocimiento, solo cuando se integre y evalúe un modelo real
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
  camera-lsp.tsx              vista previa de cámara y catálogo demo de señas
  result-card.tsx             resultado, métricas y confirmación
  loading-state.tsx
  footer.tsx
lib/
  translate-service.ts        lógica de traducción y simulación LSP (separada de la interfaz)
data/
  lexicon.json                1,635 pares léxicos español–quechua
  signs.ts                    catálogo de 86 señas LSP
```

La lógica de traducción y simulación vive en `lib/translate-service.ts`, separada de los
componentes de interfaz.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Para verificar cambios: `npm run lint` y `npm run build`.

## Despliegue

La configuración Next.js permite desplegarlo en Vercel u otra plataforma compatible.

---

Lógica del MVP: construir para medir y aprender.
